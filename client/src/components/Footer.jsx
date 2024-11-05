import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111] px-4 sm:px-10 py-12 mt-32">
      <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg mb-6">About Us</h4>
          <p className="text-gray-400 mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida,
            mi eu pulvinar cursus, sem elit interdum mauris.
          </p>
        </div>
        <div>
          <h4 className="text-lg mb-6">Services</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Web Development</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Mobile App Development</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">UI/UX Design</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Digital Marketing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg mb-6">Resources</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Webinars</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Ebooks</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Templates</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Tutorials</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg mb-6">About Us</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Our Story</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Mission and Values</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Team</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-600 transition-all">Testimonials</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
