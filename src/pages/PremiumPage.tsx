import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TutorialCard } from '../components/TutorialCard';
import { mockTutorials } from '../data/mockData';
import { Crown, Lock, MessageCircle } from 'lucide-react';

export const PremiumPage: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role === 'guest') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <Crown className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Access Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view premium content.</p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const premiumTutorials = mockTutorials.filter(t => t.isPremium);
  const hasAccess = user.role === 'premium' || user.role === 'admin';

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Crown className="h-20 w-20 text-amber-500 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unlock Premium Content
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get access to exclusive video tutorials, downloadable resources, and direct chat with instructors.
          </p>

          {/* Premium Benefits */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Exclusive Videos</h3>
              <p className="text-gray-600">Access in-depth video tutorials with step-by-step guidance.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Direct Chat</h3>
              <p className="text-gray-600">Get personalized help from instructors via chat.</p>
            </div>
          </div>

          <Link
            to="/upgrade"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl inline-block"
          >
            Upgrade to Premium
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="h-8 w-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-gray-900">Premium Tutorials</h1>
          </div>
          <p className="text-xl text-gray-600">
            Exclusive video content and advanced tutorials for premium members
          </p>
        </div>

        {/* Chat Access for Pro Members */}
        {user.role === 'premium' && user.subscriptionPlan === 'pro' && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-6 w-6" />
                <div>
                  <h3 className="text-lg font-semibold">Chat with Instructor</h3>
                  <p className="text-green-100">Get personalized help and guidance</p>
                </div>
              </div>
              <Link
                to="/chat"
                className="bg-white text-green-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Start Chat
              </Link>
            </div>
          </div>
        )}

        {/* Tutorials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>

        {premiumTutorials.length === 0 && (
          <div className="text-center py-12">
            <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Premium Content Yet</h3>
            <p className="text-gray-600">New premium tutorials are being added regularly.</p>
          </div>
        )}
      </div>
    </div>
  );
};