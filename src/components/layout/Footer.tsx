import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Twitter, Facebook, Instagram, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Film size={24} className="text-purple-500" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Cinemate
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Explore, rate, and stream your favorite movies and TV series. Join our community of cinephiles and discover your next favorite watch.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors" aria-label="Github">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  Browse
                </Link>
              </li>
              <li>
                <Link to="/watchlist" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  Watchlist
                </Link>
              </li>
              <li>
                <Link to="/purchases" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  My Purchases
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse?genre=Action" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  Action
                </Link>
              </li>
              <li>
                <Link to="/browse?genre=Comedy" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  Comedy
                </Link>
              </li>
              <li>
                <Link to="/browse?genre=Drama" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  Drama
                </Link>
              </li>
              <li>
                <Link to="/browse?genre=Horror" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  Horror
                </Link>
              </li>
              <li>
                <Link to="/browse?genre=Sci-Fi" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  Sci-Fi
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact & Legal */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact & Legal</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-400">
                <Mail size={14} className="mr-2" />
                <a href="mailto:info@cinemate.com" className="hover:text-purple-500 transition-colors">
                  info@cinemate.com
                </a>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-purple-500 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Cinemate. All rights reserved.</p>
          <p className="mt-2">
            Made with ❤️ for movie lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;