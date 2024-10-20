import React from 'react';

const Disclaimer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 text-xs p-5">
      <div>
        <p>
          The Medicare plans represented are PDP, HMO, PPO or PFFS plans with a
          Medicare contract. Enrollment in plans depends on contract renewal.
          Enrollment in a plan may be limited to certain times. Eligibility may
          require a Special or Initial Enrollment Period. TantunAI and Medicare
          supplement insurance plans are not connected with or endorsed by the
          U.S. government or the federal Medicare program.
        </p>
        <p>
          We do not offer every plan available in your area. Please contact{' '}
          <a
            href="https://www.medicare.gov"
            className="text-green-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Medicare.gov
          </a>
          , 1-800-MEDICARE, or your local State Health Insurance Program (SHIP)
          to get information on all of your options.
        </p>
        <p>
          The chatbot on this website uses Generative AI technology, powered by
          the OpenAI API, to provide responses. Please note that the information
          provided by the chatbot is for general purposes only and should not be
          considered professional advice. It is not a substitute for consultation
          with our insurance specialists. For personalized guidance and expert
          advice, we recommend contacting our insurance agents directly.
        </p>
        <p>
          By initiating a chat or scheduling a call, you agree to be contacted by
          a licensed sales agent by email, text message, or phone call to discuss
          Medicare insurance plans. This is a solicitation for insurance.
          Standard messaging rates may apply.
        </p>
        <p>
          Tantun's website is operated by Tantun Holdings, Inc., a licensed health
          insurance agency doing business as TantunAI. The purpose of this site
          is the solicitation of insurance. Contact may be made by an insurance
          agent/producer or insurance company. TantunAI is a free service with no
          obligation to enroll. Your information and use of this site are governed
          by our most recent{' '}
          <a
            href="https://medicare-blogs.s3.amazonaws.com/terms-of-use/terms-of-use-1.html"
            className="text-green-400 hover:underline"
          >
            Terms of Use
          </a>{' '}
          and{' '}
          <a
            href="https://medicare-blogs.s3.amazonaws.com/terms-of-use/terms-of-use-1.html"
            className="text-green-400 hover:underline"
          >
            Privacy Policy
          </a>.
        </p>
      </div>
    </footer>
  );
};

export default Disclaimer;
