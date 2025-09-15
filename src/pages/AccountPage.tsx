import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Crown, Calendar, MessageCircle, BookOpen, Settings } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin':
        return { text: 'Administrator', color: 'text-purple-600', bgColor: 'bg-purple-100' };
      case 'premium':
        return { text: 'Premium Member', color: 'text-amber-600', bgColor: 'bg-amber-100' };
      case 'free':
        return { text: 'Free Member', color: 'text-green-600', bgColor: 'bg-green-100' };
      default:
        return { text: 'Guest', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const roleDisplay = getRoleDisplay(user.role);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-6">
              <User className="h-12 w-12 text-white" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-4">{user.email}</p>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className={`${roleDisplay.bgColor} ${roleDisplay.color} px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1`}>
                  {user.role === 'premium' && <Crown className="h-4 w-4" />}
                  <span>{roleDisplay.text}</span>
                </span>
                
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Account Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Account Details</span>
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Subscription Status</span>
                <span className={`font-medium ${
                  user.role === 'premium' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {user.role === 'premium' ? 'Active' : 'Free'}
                </span>
              </div>

              {user.role === 'premium' && (
                <>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Plan Type</span>
                    <span className="font-medium text-amber-600 capitalize">
                      {user.subscriptionPlan || 'Basic'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Next Billing</span>
                    <span className="font-medium text-gray-900">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">
                  {new Date(user.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>

            <div className="space-y-4">
              <Link
                to="/tutorials"
                className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group"
              >
                <BookOpen className="h-6 w-6 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Browse Tutorials</div>
                  <div className="text-sm text-gray-600">Explore our tutorial library</div>
                </div>
              </Link>

              {user.role === 'premium' && (
                <>
                  <Link
                    to="/premium"
                    className="flex items-center space-x-3 p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 group"
                  >
                    <Crown className="h-6 w-6 text-amber-600" />
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-amber-600">Premium Content</div>
                      <div className="text-sm text-gray-600">Access exclusive videos</div>
                    </div>
                  </Link>

                  {user.subscriptionPlan === 'pro' && (
                    <Link
                      to="/chat"
                      className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 group"
                    >
                      <MessageCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-green-600">Chat with Instructor</div>
                        <div className="text-sm text-gray-600">Get personalized help</div>
                      </div>
                    </Link>
                  )}
                </>
              )}

              {user.role === 'free' && (
                <Link
                  to="/upgrade"
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 text-white"
                >
                  <Crown className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Upgrade to Premium</div>
                    <div className="text-sm text-amber-100">Unlock videos and chat</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};