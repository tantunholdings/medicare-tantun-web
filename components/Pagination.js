import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"; // Import icons

const PaginationComponent = ({ totalPages, activePage, setActivePage }) => {
  const [loading, setLoading] = useState(false);

  // Helper to create an array of page numbers based on totalPages and activePage
  const createPagesArray = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (activePage > 3) {
        pages.push("...");
      }
      const startPage = Math.max(2, activePage - 1);
      const endPage = Math.min(totalPages - 1, activePage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (activePage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  // Handle page change with a 2-second delay
  const handlePageChange = (page) => {
    if (!loading && page !== activePage) {
      setLoading(true); // Set loading to true to disable interaction

      // Simulate page loading with a 2-second delay
     
        setActivePage(page); // Trigger the page change
        setLoading(false); // Re-enable interaction after 2 seconds
      
    }
  };

  return (
    <div className="flex items-center justify-center space-x-1 text-gray-700">
      {" "}
      {/* Decreased space */}
      {/* Left Button */}
      <button
        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-200 transition-colors duration-300"
        disabled={activePage === 1 || loading} // Disable when on the first page or loading
        onClick={() => handlePageChange(activePage - 1)}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-gray-500 text-lg"
        />
      </button>
      {/* Page numbers */}
      {createPagesArray().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-2 py-1">...</span>
          ) : (
            <button
              className={`px-3 py-1 rounded-lg ${
                activePage === page
                  ? "bg-green-100 text-primary font-medium"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handlePageChange(page)}
              disabled={loading} // Disable when loading
            >
              {page}
              {activePage === page && (
                <div className="h-1 bg-primary rounded-t-md mt-1"></div>
              )}
            </button>
          )}
        </React.Fragment>
      ))}
      {/* Right Button */}
      <button
        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-200 transition-colors duration-300"
        disabled={activePage === totalPages || loading} // Disable when on the last page or loading
        onClick={() => handlePageChange(activePage + 1)}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-gray-500 text-lg"
        />
      </button>
    </div>
  );
};

// Define PropTypes for the component
PaginationComponent.propTypes = {
  totalPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default PaginationComponent;
