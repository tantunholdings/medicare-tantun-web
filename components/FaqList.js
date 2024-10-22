import PropTypes from "prop-types";
import QuestionCard from "./QuestionCard";

export default function FaqList({ faqs }) {
  return (
    <div className="space-y-6 mx-auto">
      {faqs.length > 0 ? (
        faqs.map((faq, index) => (
          <QuestionCard
            key={faq.id}
            question={faq.title}
            answer={faq.answer}
            initiallyVisible={index === 0} // Expand the first question by default
          />
        ))
      ) : (
        <p>No FAQs available at the moment.</p>
      )}
    </div>
  );
}

// PropTypes validation
FaqList.propTypes = {
  faqs: PropTypes.array.isRequired,
};
