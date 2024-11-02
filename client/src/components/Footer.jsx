import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4 font-sans tracking-wide">
      <div className="text-center">
        <h6 className="text-base">Stay connected with us:</h6>

        <ul className="flex flex-wrap justify-center gap-x-8 gap-4 my-8">
          <li>
            <a href="javascript:void(0)" className="text-xl hover:text-gray-400">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" className="text-xl hover:text-gray-400">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" className="text-xl hover:text-gray-400">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" className="text-xl hover:text-gray-400">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
        </ul>

        <p className="text-base">© ReadymadeUI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
