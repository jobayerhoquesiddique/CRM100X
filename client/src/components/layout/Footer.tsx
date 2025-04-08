import React from "react";
import { Link } from "wouter";
import { APP_INFO } from "@/lib/constants";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white p-6 border-t border-gray-200 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">{APP_INFO.copyright} All rights reserved.</p>
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
