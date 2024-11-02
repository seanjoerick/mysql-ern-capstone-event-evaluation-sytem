// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faInfoCircle, faQuestionCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// const Header = () => {
//   return (
//     <header className="shadow-md font-sans tracking-wide relative z-50">
//       <div className="flex flex-wrap items-center justify-between gap-4 px-10 py-4 bg-white min-h-[70px]">
//         <a href="javascript:void(0)">
//           <img
//             src="https://readymadeui.com/readymadeui.svg"
//             alt="logo"
//             className="w-36"
//           />
//         </a>
//         <div
//           id="collapseMenu"
//           className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
//         >
//           <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
//             <li className="max-lg:border-b max-lg:py-3 px-3">
//               <Link to="/" className="hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]">
//                 <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3 px-3">
//               <Link to="/about" className="hover:text-[#007bff] text-[#333] block font-bold text-[15px]">
//                 <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> About
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3 px-3">
//               <Link to="/faq" className="hover:text-[#007bff] text-[#333] block font-bold text-[15px]">
//                 <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> FAQ
//               </Link>
//             </li>
//             <li className="max-lg:border-b max-lg:py-3 px-3">
//               <Link to="/contact" className="hover:text-[#007bff] text-[#333] block font-bold text-[15px]">
//                 <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact Us
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div className="flex max-lg:ml-auto">
//           <button id="toggleOpen" className="lg:hidden">
//             <svg
//               className="w-7 h-7"
//               fill="#000"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faQuestionCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="shadow-md font-sans tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 px-10 py-4 bg-white min-h-[80px]"> {/* Increased height from 70px to 80px */}
        <a href="javascript:void(0)">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-36"
          />
        </a>
        <div
          id="collapseMenu"
          className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link to="/" className="hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]">
                <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link to="/about" className="hover:text-[#007bff] text-[#333] block font-bold text-[15px]">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> About
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link to="/faq" className="hover:text-[#007bff] text-[#333] block font-bold text-[15px]">
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> FAQ
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link to="/contact" className="hover:text-[#007bff] text-[#333] block font-bold text-[15px]">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex max-lg:ml-auto">
          <button id="toggleOpen" className="lg:hidden">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
