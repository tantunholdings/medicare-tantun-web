"use client"; // Ensure this is a client-side component
import { PHONE_NUMBER } from "@/utils/constants";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import DetailsPopup from "./DetailsPopup"; // Ensure DetailsPopup is correctly imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBars } from "@fortawesome/free-solid-svg-icons"; // Import icons
import Image from "next/image"; // Import Next.js Image component
import logo from "/public/assets/Logo.png"; // Import the logo

export default function Navbar() {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Manage mobile menu state
  const pathname = usePathname(); // Get the current path

  const handleContactUsClick = () => {
    setShowDetailsPopup(true); // Show the popup when Contact Us is clicked
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false); // Close the popup when requested
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu state
  };

  // Define the page title based on the path
  const getPageTitle = () => {
    switch (pathname) {
      case "/blog":
        return "Blog";
      case "/faq":
        return "FAQ";
      case "/about":
        return "About Us";
      default:
        return "Home";
    }
  };

  // Close the mobile menu when clicking outside of it
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".mobile-menu")) {
          setIsMobileMenuOpen(false);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isMobileMenuOpen]);

  if (pathname.includes("admin")){
    return <></>
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
          {/* Logo (Visible on all views) */}
          <div className="flex items-center">
            <Link href="/">
              <Image src={logo} alt="Brand Logo" width={50} height={50} />
            </Link>
          </div>

          {/* Centered Page Title in Mobile View */}
          <div className="text-2xl font-bold text-primaryBlack md:hidden absolute left-1/2 transform -translate-x-1/2">
            {getPageTitle()}
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${
                pathname === "/about"
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className={`${
                pathname === "/blog"
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className={`${
                pathname === "/faq"
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
            >
              FAQ
            </Link>
          </div>

          {/* Mobile Menu Button - Aligned to the Right */}
          <div className="md:hidden flex items-center ml-auto">
            <button onClick={toggleMobileMenu} type="button">
              <FontAwesomeIcon icon={faBars} className="text-primary text-xl" />
            </button>
          </div>

          {/* Contact Information (Visible on all views) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-secondary p-2 rounded">
                <FontAwesomeIcon icon={faPhone} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500">CALL US</div>
                <div className="text-lg font-semibold text-gray-800">
                  {PHONE_NUMBER}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleContactUsClick}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Contact us
            </button>
          </div>
        </div>

        <div className="flex justify-center md:hidden">
        <h2>To speak with a licensed agent</h2>
        </div>
        <div className="flex justify-center">
            <a href={`tel:${PHONE_NUMBER}`} className="px-4 block md:hidden">
            <div className="flex items-center justify-center bg-primary text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-700">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
             Call Now: {PHONE_NUMBER}
            </div>
          </a>
        </div>

        {/* Mobile Menu Links */}
        {isMobileMenuOpen && (
          <div className="mobile-menu fixed top-0 right-0 w-2/3 bg-white shadow-md rounded-bl-lg md:hidden flex flex-col items-start py-4 px-6 z-50">
            <Link
              href="/"
              className={`w-full text-left py-2 border-b ${
                pathname === "/"
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`w-full text-left py-2 border-b ${
                pathname === "/about"
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className={`w-full text-left py-2 border-b ${
                pathname === "/blog"
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
              onClick={toggleMobileMenu}
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className={`w-full text-left py-2 border-b ${
                pathname === "/faq"
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
              onClick={toggleMobileMenu}
            >
              FAQ
            </Link>

            {/* Contact Information in Mobile Menu */}
            <div className="flex items-center space-x-2 w-full py-2 border-b">
              <div className="bg-secondary p-2 rounded">
                <FontAwesomeIcon icon={faPhone} className="text-white" />
              </div>
              <div>
                <a href={`tel:${PHONE_NUMBER}`}>
                  <div className="text-xs text-gray-500">CALL US</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {PHONE_NUMBER}
                  </div>
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={handleContactUsClick}
              className="bg-primary text-white px-4 py-2 mt-4 w-full text-center rounded"
            >
              Contact us
            </button>
          </div>
        )}
      </nav>

      {/* Render DetailsPopup as a modal if showDetailsPopup is true */}
      {showDetailsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DetailsPopup closePopup={closeDetailsPopup} />
        </div>
      )}
    </>
  );
}
