import FaqList from "@/components/FaqList";
// Metadata for the FAQ page
export const metadata = {
  title: "Frequently Asked Questions - Medicare Insurance Assistance",
  description: "Find answers to common questions about Medicare enrollment, plans, and services.",
};

// Server-rendered FAQ page with chunked requests (5 FAQs per request)
export default async function FAQ() {
  const allFaqs = await fetchAllFaqsInChunks(); // Fetch all FAQs in chunks

  // Generate schema markup from fetched FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.title, // Ensure this matches your data structure
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer, // Ensure this matches your data structure
      }
    })),
  };

  return (
    <>
    
       {/* FAQ Schema Markup - placed outside <Head> for correct rendering */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> 

      <main className="container mx-auto my-8 px-6 min-h-screen">
        <h1 className="text-3xl font-bold text-primaryBlack mb-10">
          Frequently Asked Questions
        </h1>
        <FaqList faqs={allFaqs} /> {/* Pass all received FAQs to FaqList */}
      </main>
    </>
  );
}

// Helper function to fetch all FAQs in chunks of 5
async function fetchAllFaqsInChunks() {
  let allFaqs = [];
  let currentPage = 1;
  let moreFaqsAvailable = true;

  while (moreFaqsAvailable) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/faqs?page=${currentPage}&page_size=5`,
        { next: { revalidate: 3600 } }
      );
      const data = await response.json();

      if (data.faqs && data.faqs.length > 0) {
        allFaqs = [...allFaqs, ...data.faqs]; 
        currentPage++;
      } else {
        moreFaqsAvailable = false;
      }
    } catch (error) {
      console.error(`Error fetching FAQs on page ${currentPage}:`, error);
      moreFaqsAvailable = false; // Stop if there's an error
    }
  }

  return allFaqs;
}
