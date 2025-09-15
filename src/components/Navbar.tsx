import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Menu, X, Crown, User, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" onClick={closeMobileMenu}>
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Learnify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/tutorials" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Free Tutorials
            </Link>
            {user && user.role !== 'guest' && (
              <Link 
                to="/premium" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <Crown className="h-4 w-4" />
                <span>Premium</span>
              </Link>
            )}
            {user && user.role === 'admin' && (
              <Link 
                to="/admin" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Admin
              </Link>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
                >
                  Join Free
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                {user.role === 'premium' && (
                  <span className="flex items-center space-x-1 text-amber-600 font-medium">
                    <Crown className="h-4 w-4" />
                    <span>Premium</span>
                  </span>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t-lg"
                      onClick={closeMobileMenu}
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-b-lg flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/tutorials"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                Free Tutorials
              </Link>
              {user && user.role !== 'guest' && (
                <Link
                  to="/premium"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                  onClick={closeMobileMenu}
                >
                  <Crown className="h-4 w-4" />
                  <span>Premium</span>
                </Link>
              )}
              {user && user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Admin
                </Link>
              )}
              
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    Join Free
                  </Link>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-700">{user.name}</span>
                    {user.role === 'premium' && (
                      <span className="flex items-center space-x-1 text-amber-600 text-sm">
                        <Crown className="h-3 w-3" />
                        <span>Premium</span>
                      </span>
                    )}
                  </div>
                  <Link
                    to="/account"
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 mb-2"
                    onClick={closeMobileMenu}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};