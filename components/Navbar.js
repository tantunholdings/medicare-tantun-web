"use client"; // Ensure this is a client-side component
import { PHONE_NUMBER } from "@/utils/constants";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import DetailsPopup from "./DetailsPopup"; // Ensure DetailsPopup is correctly imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBars,faChevronDown } from "@fortawesome/free-solid-svg-icons"; // Import icons
import Image from "next/image"; // Import Next.js Image component
import logo from "/public/assets/Logo.png"; // Import the logo

export default function Navbar() {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Manage mobile menu state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
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
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileDropdown = () => setIsMobileDropdownOpen(!isMobileDropdownOpen);

  // Define the page title based on the path
  const getPageTitle = () => {
    switch (pathname) {
      case "/blog":
        return "Blog";
      case "/faq":
        return "FAQ";
      case "/about":
        return "About Us";
      case "/aiassistant":
        return "MedicareGPT";
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  

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
            {/* Learn About Medicare Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="text-gray-500 flex items-center">
                Learn about Medicare <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                  <Link href="/medicare-advantage-enrollment" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Medicare advantage enrollment</Link>
                  <Link href="/medicare-supplement" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Medicare Supplement Plans</Link>
                  <Link href="/signup" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>How to sign up for Medicare</Link>
                  <Link href="/blog" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Medicare Blog</Link>
                  
                </div>
              )}
            </div>
          
            
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
            {/* Add MedicareGPT link */}
            <Link
              href="/aiassistant"
              className={`${
                pathname === "/aiassistant"
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
            >
              MedicareGPT
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
              Request a Call Back
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
          <div className="mobile-menu fixed top-0 right-0 w-2/3 bg-white shadow-md rounded-bl-lg md:hidden flex flex-col items-start py-4 px-6 z-50" ref={mobileDropdownRef}>
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

            {/* Add MedicareGPT link in mobile menu */}
            <Link
              href="/aiassistant"
              className={`w-full text-left py-2 border-b ${
                pathname === "/aiassistant"
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
              onClick={toggleMobileMenu}
            >
              MedicareGPT
            </Link>
            {/* Mobile Learn About Medicare Dropdown */}
            <button onClick={toggleMobileDropdown} className="py-2 border-b flex justify-between w-full">
              Learn about Medicare <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {isMobileDropdownOpen && (
              <div className="pl-4">
                <Link href="/medicare-advantage-enrollment" className="block py-2" onClick={toggleMobileMenu}>Medicare advantage enrollment</Link>
                <Link href="/medicare-supplement" className="block py-2" onClick={toggleMobileMenu}>Medicare Supplement Plans</Link>
                <Link href="/signup" className="block py-2" onClick={toggleMobileMenu}>How to sign up for Medicare?</Link>
                <Link href="/blog" className="block py-2" onClick={toggleMobileMenu}>Medicare Blog</Link>
              </div>
            )}
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
              Request a Call Back
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
