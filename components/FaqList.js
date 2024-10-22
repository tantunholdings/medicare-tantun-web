import PropTypes from "prop-types";
import QuestionCard from "./QuestionCard";
import PaginationComponent from "./Pagination";

export default function FaqList({ faqs, totalPages, activePage }) {
  return (
    <>
      <div className="space-y-6 mx-auto">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <QuestionCard
              key={faq.id}
              question={faq.title}
              answer={faq.answer}
              initiallyVisible={index === 0} // Automatically expand the first question
            />
          ))
        ) : (
          <p>No FAQs available at the moment.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-10">
          <PaginationComponent
            totalPages={totalPages}
            activePage={activePage}
          />
        </div>
      )}
    </>
  );
}

// PropTypes validation
FaqList.propTypes = {
  faqs: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
};
