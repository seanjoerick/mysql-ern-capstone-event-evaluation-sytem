import React, { useState } from 'react';
import InfoSection from '../components/InfoSection';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ questions and answers
  const organizerFAQs = [
    {
      question: "How does the Event Evaluation System work?",
      answer: "The Event Evaluation System allows students to submit feedback on events they attended. Organizers can create events and define criteria for evaluations. After the event, students receive notifications to submit their evaluations, which helps organizers improve future events."
    },
    {
      question: "How can I create a new event?",
      answer: "To create a new event, log into your organizer account and navigate to the 'Create Event' section. Fill out the required details and submit the form."
    },
    {
      question: "How do I view evaluation results?",
      answer: "You can view evaluation results by accessing the 'Evaluation Reports' section in your organizer dashboard after students have submitted their feedback."
    },
    {
      question: "What if I need assistance with the system?",
      answer: "If you need assistance, please contact support via the contact form or through the help section in your dashboard."
    },
  ];

  const studentFAQs = [
    {
      question: "How do I submit my evaluation?",
      answer: "After attending an event, you will receive a notification with a link to submit your evaluation. Click the link and complete the evaluation form."
    },
    {
      question: "Can I edit my evaluation after submission?",
      answer: "No, once your evaluation has been submitted, it cannot be edited. Please ensure all information is correct before submitting."
    },
    {
      question: "What should I do if I encounter technical issues?",
      answer: "If you experience technical issues, please reach out to support through the contact form or the help section."
    },
    {
      question: "Can I provide additional feedback on events?",
      answer: "Yes, you can include additional comments in the feedback section of your evaluation to share more insights about the event."
    }
  ];
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-black text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Organizer FAQs */}
        <div className="space-y-2">
          <h2 className="text-black text-xl font-semibold mb-4">Organizer/Administrator</h2>
          {organizerFAQs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="block p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-md w-full text-left"
              >
                {faq.question}
              </button>
              {openIndex === index && (
                <p className="p-4 text-gray-600 bg-gray-100 rounded-md">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Student FAQs */}
        <div className="space-y-2">
          <h2 className="text-black text-xl font-semibold mb-4">Student</h2>
          {studentFAQs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index + organizerFAQs.length ? null : index + organizerFAQs.length)}
                className="block p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-md w-full text-left"
              >
                {faq.question}
              </button>
              {openIndex === index + organizerFAQs.length && (
                <p className="p-4 text-gray-600 bg-gray-100 rounded-md">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <InfoSection />
    </div>
  );
};

export default FAQ;
