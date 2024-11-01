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
          <div className="bg-blue-600 w-28 h-28 blur-3xl" />
          <div className="bg-green-600 w-28 h-28 blur-3xl" />
          <div className="bg-blue-300 w-28 h-28 blur-3xl" />
          <div className="bg-yellow-600 w-28 h-28 blur-3xl" />
        </div>

        <div className="hidden md:grid  grid-cols-2 gap-10 w-60 h-60">
          <div className="bg-blue-600 w-28 h-28 blur-3xl" />
          <div className="bg-green-600 w-28 h-28 blur-3xl" />
          <div className="bg-blue-300 w-28 h-28 blur-3xl" />
          <div className="bg-yellow-600 w-28 h-28 blur-3xl" />
        </div>
      </div>

      <div className="absolute inset-1 text-white">
      <div className="flex justify-end mt-16 mr-5"><Image src={titleShape} alt="Title Shape" style={{ transform: "rotate(45deg)" }} /></div>
      </div>

      <div className="relative z-10  container mx-auto py-8 px-4 text-white">
        <div className="grid gap-8 lg:grid-cols-3">
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
          <div className="mt-4">
            <h3 className="text-xl font-bold">Get Us in Your Inbox</h3>
            <div className="text-xs md:text-base mt-4 flex items-center rounded-3xl border bg-white text-black">
              <input
                className="flex-1 border-none outline-none pl-4 pr-2 rounded-3xl"
                placeholder="Enter your email"
                type="email"
              />
              <button className="rounded-3xl bg-blue-600 m-px px-4 py-2 text-white hover:bg-blue-700">
                Submit
              </button>
            </div>

            <p className="mt-2 text-sm ">
              By entering email you are agree to our{" "}
              <Link
                href="/terms-of-use"
                className="hover:underline text-blue-600"
              >
                Terms of Use
              </Link>
              {" and "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://medicare-blogs.s3.amazonaws.com/privacy-policy/Privacy-Policy.html"
                className="hover:underline text-blue-600"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-gray-600" />
          <div className="flex gap-4">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/faq" className="hover:text-blue-600">
              FAQs
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About Us
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <hr className=" border-t border-gray-600 w-screen" />
          <div className="text-sm text-gray-600">© All right reserve 2024</div>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              <Phone className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
