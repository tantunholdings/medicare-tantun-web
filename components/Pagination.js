"use client"; // Ensure this is a client component

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function PaginationComponent({ totalPages, activePage }) {
  const router = useRouter();

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/faq?page=${newPage}`); // Navigate to the new page
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faChevronLeft} /> Previous
      </button>

      <span className="text-lg">
        Page {activePage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

// PropTypes validation
PaginationComponent.propTypes = {
  totalPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
};
