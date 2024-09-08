// components/HeroSection.js
export default function HeroSection() {
    return (
      <section className="bg-teal-900 text-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to Insurance Advisor, where understanding insurance is simple and easy.</h1>
        <p className="mb-6">
          Discover a wealth of information tailored to guide you through the complexities of insurance, ensuring you make informed decisions with confidence.
          Our comprehensive resources break down various insurance types.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="bg-green-500 text-white px-6 py-3 rounded-md">Contact us</a>
          <a href="#" className="bg-blue-500 text-white px-6 py-3 rounded-md">Call us</a>
        </div>
      </section>
    );
  }
  