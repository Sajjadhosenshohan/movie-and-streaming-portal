import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Film, UserCircle, LogOut, BookmarkCheck } from 'lucide-react';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film size={28} className="text-purple-500" />
            <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Cinemate
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-gray-300 hover:text-white transition-colors">
              Browse
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/watchlist" className="text-gray-300 hover:text-white transition-colors">
                  Watchlist
                </Link>
                <Link to="/purchases" className="text-gray-300 hover:text-white transition-colors">
                  My Purchases
                </Link>
              </>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
                Admin
              </Link>
            )}
          </nav>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative flex-1 max-w-sm mx-6">
            <input
              type="text"
              placeholder="Search movies & series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-4 pr-10 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <button 
              type="submit" 
              className="absolute right-3 text-gray-400 hover:text-white"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>
          
          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UserCircle size={24} className="text-gray-300" />
                  <span className="text-sm text-gray-300">
                    {user?.name}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut size={16} />}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-gray-300 hover:text-white"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 overflow-hidden transition-all duration-300 ease-in-out">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                placeholder="Search movies & series..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-4 pr-10 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
            
            {/* Mobile Links */}
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/browse" 
                className="text-gray-300 hover:text-white py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              {isAuthenticated && (
                <>
                  <Link 
                    to="/watchlist" 
                    className="text-gray-300 hover:text-white py-2 transition-colors flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookmarkCheck size={18} className="mr-2" />
                    Watchlist
                  </Link>
                  <Link 
                    to="/purchases" 
                    className="text-gray-300 hover:text-white py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Purchases
                  </Link>
                </>
              )}
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="text-gray-300 hover:text-white py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </nav>
            
            {/* Mobile Auth */}
            <div className="mt-6 space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-300 mb-3">
                    <UserCircle size={20} />
                    <span>{user?.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    fullWidth 
                    leftIcon={<LogOut size={16} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" fullWidth>
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;