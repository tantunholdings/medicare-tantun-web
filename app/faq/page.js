import Navbar from "@/components/Navbar";
import FaqList from "@/components/FaqList";
import Disclaimer from "@/components/Disclaimer";

// Server-rendered FAQ page with chunked requests (5 FAQs per request)
export default async function FAQ() {
  const allFaqs = await fetchAllFaqsInChunks(); // Fetch all FAQs in chunks

  return (
    <>
      <Navbar />
      <main className="container mx-auto my-8 px-6 min-h-screen">
        <h1 className="text-3xl font-bold text-primaryBlack mb-10">
          Frequently Asked Questions
        </h1>
        <FaqList faqs={allFaqs} /> {/* Pass all received FAQs to FaqList */}
      </main>
      <Disclaimer />
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
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/faqs?page=${currentPage}&page_size=1`,
        { cache: "no-store" }
      );
      const data = await response.json();

      if (data.faqs && data.faqs.length > 0) {
        allFaqs = [...allFaqs, ...data.faqs]; // Append received FAQs to the list
        currentPage++;
      } else {
        moreFaqsAvailable = false; // Stop fetching if no more FAQs are available
      }
    } catch (error) {
      console.error(`Error fetching FAQs on page ${currentPage}:`, error);
      moreFaqsAvailable = false; // Stop if there's an error
    }
  }

  return allFaqs;
}
