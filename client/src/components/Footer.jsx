import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class="bg-gray-800 py-7 px-8 font-sans tracking-wide mt-20">
    <div class="flex max-lg:flex-col items-center justify-between gap-6">

      <ul class="flex flex-wrap justify-center gap-x-6 gap-4">
        <li>   <a href="https://www.facebook.com/profile.php?id=61564152554168" class="text-xl hover:text-gray-400" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline w-7 h-7" viewBox="0 0 512 512">
                <path fill="#1877f2" d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z" data-original="#1877f2" />
                <path fill="#fff" d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z" data-original="#ffffff" />
            </svg>
        </a></li>     
      </ul>

      <p class='text-base text-gray-300  max-lg:order-1'>© Copyright 2024 Event Evaluation System. All rights reserved.</p>
      <ul class="flex gap-x-6 gap-y-2 flex-wrap">
        <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-base">Terms of Service</a></li>
        <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-base">Privacy Policy</a></li>
        <li> <Link to="/contact" className="text-gray-300 hover:text-white text-base">
            Contact
          </Link></li>
      </ul>
    </div>
  </footer>
  );
};

export default Footer;
