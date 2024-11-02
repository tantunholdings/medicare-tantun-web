"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/assets/Logo.png";
import footerShape from "/public/assets/footer-shape.svg";

import titleShape from "../public/assets/title-shape.svg";

import {
  Facebook,
  Twitter,
  Instagram,
  WhatsApp,
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-10">
      <div className="absolute inset-0 bg-gray-900 flex justify-around pt-10 z-0">
        <div className="grid grid-cols-2 gap-10 w-60 h-60">
          <div className="bg-primary w-28 h-28 blur-3xl" />
          <div className="bg-primary w-28 h-28 blur-3xl" />
          <div className="bg-blue-300 w-28 h-28 blur-3xl" />
          <div className="bg-yellow-600 w-28 h-28 blur-3xl" />
        </div>

        <div className="hidden md:grid  grid-cols-2 gap-10 w-60 h-60">
          <div className="bg-primary w-28 h-28 blur-3xl" />
          <div className="bg-primary w-28 h-28 blur-3xl" />
          <div className="bg-blue-300 w-28 h-28 blur-3xl" />
          <div className="bg-yellow-600 w-28 h-28 blur-3xl" />
        </div>
      </div>

      <div className="absolute inset-1 text-white">
        <div className="flex justify-end mt-16 mr-5">
          <Image
            src={titleShape}
            alt="Title Shape"
            style={{ transform: "rotate(45deg)" }}
          />
        </div>
      </div>

      <div className="relative z-10  container mx-auto py-8 px-4 text-white">
        <div className="grid gap-8 lg:grid-cols-4">
          <div>
            <Image src={logo} alt="Logo" width={40} height={40} />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                abc 123 road, Isreal
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +123456789
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                abc@gmail.com
              </div>
            </div>
          </div>
          <div className="hidden md:block pt-8">
            <Image src={footerShape} alt="Logo" width={200} height={200} />
          </div>
          <div className="mt-4 col-span-2">
            <div className="text-3xs md:text-2xs 2xl:text-xs text-white font-thin mb-4 space-y-0 text-justify">
              <p>
                The Medicare plans represented are PDP, HMO, PPO, or PFFS plans
                with a Medicare contract. Enrollment in plans depends on
                contract renewal. Enrollment in a plan may be limited to certain
                times. Eligibility may require a Special or Initial Enrollment
                Period. TantunAI and Medicare supplement insurance plans are not
                connected with or endorsed by the U.S. government or the federal
                Medicare program.
              </p>
              <p>
                We do not offer every plan available in your area. Please
                contact Medicare.gov, 1-800-MEDICARE, or your local State Health
                Insurance Program (SHIP) to get information on all of your
                options.
              </p>
              <p>
                The chatbot on this website uses Generative AI technology,
                powered by the OpenAI API, to provide responses. Please note
                that the information provided by the chatbot is for general
                purposes only and should not be considered professional advice.
                It is not a substitute for consultation with our insurance
                specialists. For personalized guidance and expert advice, we
                recommend contacting our insurance agents directly.
              </p>
              <p>
                By initiating a chat or scheduling a call, you agree to be
                contacted by a licensed sales agent by email, text message, or
                phone call to discuss Medicare insurance plans. This is a
                solicitation for insurance. Standard messaging rates may apply.
              </p>
              <p>
                Tantun's website is operated by Tantun Holdings, Inc., a
                licensed health insurance agency doing business as TantunAI. The
                purpose of this site is the solicitation of insurance. Contact
                may be made by an insurance agent/producer or insurance company.
                TantunAI is a free service with no obligation to enroll. Your
                information and use of this site are governed by our most recent{" "}
                <Link
                  href="/terms-of-use"
                  className="hover:underline text-primary"
                >
                  Terms of Use
                </Link>
                {" and "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://medicare-blogs.s3.amazonaws.com/privacy-policy/Privacy-Policy.html"
                  className="hover:underline text-primary"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-gray-600" />
          <div className="flex gap-4">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/faq" className="hover:text-primary">
              FAQs
            </Link>
            <Link href="/about" className="hover:text-primary">
              About Us
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <hr className=" border-t border-gray-600 w-screen" />
          <div className="text-sm text-gray-600">© All right reserve 2024</div>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-600 hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary">
              <Phone className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
