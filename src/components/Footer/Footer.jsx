import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

function Footer() {
  return (
    // Footer section with gradient background and border top
    <footer className="bg-gradient-to-r from-gray-700 to-gray-800 text-white py-12 border-t border-gray-600">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Logo and Copyright */}
          <div className="w-full md:w-1/3 flex flex-col justify-between">
            <div className="mb-4">
              <Logo width="120px" /> {/* Site logo */}
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
            </p>
          </div>

          {/* Footer Links */}
          <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <FooterColumn title="Company" links={["Features", "Pricing", "Affiliate Program", "Press Kit"]} />
            <FooterColumn title="Support" links={["Account", "Help", "Contact Us", "Customer Support"]} />
            <FooterColumn title="Legals" links={["Terms & Conditions", "Privacy Policy", "Licensing"]} />
          </div>
        </div>
      </div>
    </footer>
  );
}

// Footer column component with title and link items
const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="text-xs font-semibold uppercase text-gray-300 mb-4 tracking-wider">
      {title}
    </h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to="/"
            className="text-sm text-gray-300 hover:text-blue-400 transition duration-200"
          >
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
