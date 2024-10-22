import Navbar from "@/components/Navbar";
import FaqList from "@/components/FaqList";
import Disclaimer from "@/components/Disclaimer";

// Server-rendered FAQ page
export default async function FAQ({ searchParams }) {
  const activePage = parseInt(searchParams.page || "1", 10); // Default to page 1
  const { faqs, totalPages } = await fetchFaqs(activePage); // Fetch FAQs on the server

  return (
    <>
      <Navbar />
      <main className="container mx-auto my-8 px-6 min-h-screen">
        <h1 className="text-3xl font-bold text-primaryBlack mb-10">
          Frequently Asked Questions
        </h1>
        <FaqList faqs={faqs} totalPages={totalPages} activePage={activePage} />
      </main>
      <Disclaimer />
    </>
  );
}

// Fetch FAQs on the server side
async function fetchFaqs(page) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FASTAPI_URL}/faqs?page=${page}&page_size=5`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return {
      faqs: data.faqs || [],
      totalPages: data.total_pages || 1,
    };
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return { faqs: [], totalPages: 1 };
  }
}
