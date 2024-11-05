import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faCheck } from '@fortawesome/free-solid-svg-icons';

const InfoSection = () => {
  return (
    <div className="grid sm:grid-cols-3 gap-6 items-center mt-16">
      {[
        { 
          title: "Student Feedback", 
          subtitle: "Gather insightful feedback from participants.", 
          icon: <FontAwesomeIcon icon={faCheckCircle} className="text-yellow-500 text-4xl" /> 
        },
        { 
          title: "Continuous Improvement", 
          subtitle: "Enhance future events based on evaluation results.", 
          icon: <FontAwesomeIcon icon={faCheckSquare} className="text-red-500 text-4xl" /> 
        },
        { 
          title: "Engagement Metrics", 
          subtitle: "Analyze student engagement through evaluations.", 
          icon: <FontAwesomeIcon icon={faCheck} className="text-gray-500 text-4xl" /> 
        }
      ].map((item, index) => (
        <div className="flex flex-col items-center text-center" key={index}>
          <div className="mb-2">
            {item.icon}
          </div>
          <h5 className="font-bold text-2xl text-gray-900 mb-2">{item.title}</h5>
          <p className="text-gray-700">{item.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoSection;
