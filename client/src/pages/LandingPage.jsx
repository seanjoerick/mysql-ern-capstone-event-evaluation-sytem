import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClipboardList, faBell, faChartLine, faUserShield, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/LandingPageHeader';
import Footer from '../components/Footer';
import background from '../assets/background.mp4';

const LandingPage = ({ content }) => {
  // Feature items with corresponding icons
  const features = [
    {
      title: "Event Creation",
      description: "Admins and organizers can effortlessly create and manage events, ensuring a smooth process for all participants.",
      icon: faClipboardList,
    },
    {
      title: "Student Notifications",
      description: "Automated reminders are sent to students for upcoming evaluations and events.",
      icon: faBell,
    },
    {
      title: "Criteria Management",
      description: "Admins can define and manage evaluation criteria to ensure comprehensive feedback.",
      icon: faCheckCircle,
    },
    {
      title: "Student Evaluations",
      description: "Students can submit their evaluations easily and provide valuable feedback on events.",
      icon: faUsersCog,
    },
    {
      title: "Dashboard Insights",
      description: "Admins and organizers have access to a dashboard showcasing event insights and evaluation summaries.",
      icon: faChartLine,
    },
    {
      title: "User Authentication",
      description: "Secure login and signup processes ensure that both students and admins can access the system safely.",
      icon: faUserShield,
    },
  ];

  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="bg-white text-gray-800 text-[15px]">
        {/* Background Video Section */}
        <div className="relative lg:min-h-screen 2xl:min-h-[730px] bg-gray-100 overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          >
            <source src={background} type="video/mp4" />
          </video>

          {/* Content Over Video */}
          <div className="relative z-10">
            <Header />
            <div className="max-w-5xl mx-auto text-center px-4 sm:px-10 mt-16">
              {/* Main content area for dynamic content */}
              {content}
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="px-4 sm:px-10">
          <div className="mt-32 max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl text-center mx-auto">
              <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6 text-gray-900">Our Features</h2>
              <p className="text-gray-600">
                Discover the capabilities of our Event Evaluation System, designed to streamline event management and evaluation.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 mt-16">
              {features.map((feature, index) => (
                <div className="text-center bg-gray-100 px-6 py-8 rounded-2xl" key={index}>
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className={`w-12 mb-6 inline-block ${index % 2 === 0 ? 'text-blue-600' : 'text-red-600'} bg-gray-200 p-3 rounded-xl`}
                  />
                  <h3 className="text-xl mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
