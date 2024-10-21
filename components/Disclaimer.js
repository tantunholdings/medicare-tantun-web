import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/assets/Logo.png"; // Import the logo

const Footer = () => {
  return (
    <footer className="bg-gray-100 rounded-lg shadow  mt-24">
      <div className="w-full  px-5 py-8 md:px-10">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image src={logo} alt="Brand Logo" width={50} height={50} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Tantun.com
            </span>
          </Link>

          {/* Footer Links */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-primaryBlack sm:mb-0 ">
            <li>
              <Link href="/about" className="hover:underline me-4 md:me-6">
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-use"
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline me-4 md:me-6">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-1 border-line sm:mx-auto  lg:my-3" />

        {/* Disclaimer Section */}
        <div className="text-3xs md:text-2xs 2xl:text-xs text-primaryBlack mb-4 space-y-0 text-justify">
          <p>
            The Medicare plans represented are PDP, HMO, PPO, or PFFS plans with
            a Medicare contract. Enrollment in plans depends on contract
            renewal. Enrollment in a plan may be limited to certain times.
            Eligibility may require a Special or Initial Enrollment Period.
            TantunAI and Medicare supplement insurance plans are not connected
            with or endorsed by the U.S. government or the federal Medicare
            program.
          </p>
          <p>
            We do not offer every plan available in your area. Please contact
            Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance
            Program (SHIP) to get information on all of your options.
          </p>
          <p>
            The chatbot on this website uses Generative AI technology, powered
            by the OpenAI API, to provide responses. Please note that the
            information provided by the chatbot is for general purposes only and
            should not be considered professional advice. It is not a substitute
            for consultation with our insurance specialists. For personalized
            guidance and expert advice, we recommend contacting our insurance
            agents directly.
          </p>
          <p>
            By initiating a chat or scheduling a call, you agree to be contacted
            by a licensed sales agent by email, text message, or phone call to
            discuss Medicare insurance plans. This is a solicitation for
            insurance. Standard messaging rates may apply.
          </p>
          <p>
            Tantun's website is operated by Tantun Holdings, Inc., a licensed
            health insurance agency doing business as TantunAI. The purpose of
            this site is the solicitation of insurance. Contact may be made by
            an insurance agent/producer or insurance company. TantunAI is a free
            service with no obligation to enroll. Your information and use of
            this site are governed by our most recent{" "}
            <Link href="/terms-of-use" className="hover:underline text-primary">
              Terms of Use
            </Link>
            {" and "}
            <a target="_blank"  rel="noopener noreferrer" href="https://medicare-blogs.s3.amazonaws.com/privacy-policy/Privacy-Policy.html" className="hover:underline text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2024{" "}
          <Link href="" className="hover:underline">
            Tantun.com
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
