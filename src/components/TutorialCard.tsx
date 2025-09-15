import React from 'react';
import { Link } from 'react-router-dom';
import { Tutorial } from '../types';
import { Clock, Lock, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TutorialCardProps {
  tutorial: Tutorial;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  const { user } = useAuth();
  const canAccess = !tutorial.isPremium || (user && (user.role === 'premium' || user.role === 'admin'));

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={tutorial.thumbnailUrl}
          alt={tutorial.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {tutorial.isPremium && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <Crown className="h-3 w-3" />
            <span>Premium</span>
          </div>
        )}
        {tutorial.isPremium && !canAccess && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
            {tutorial.category}
          </span>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Clock className="h-4 w-4" />
            <span>{tutorial.readTime} min</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {tutorial.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {tutorial.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tutorial.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <Link
            to={canAccess ? `/tutorial/${tutorial.id}` : '/upgrade'}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              canAccess
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canAccess ? 'Read More' : 'Upgrade'}
          </Link>
        </div>
      </div>
    </div>
  );
};