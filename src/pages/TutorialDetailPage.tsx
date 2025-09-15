import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockTutorials } from '../data/mockData';
import { Clock, Calendar, Tag, Crown, Play, Lock } from 'lucide-react';

export const TutorialDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const tutorial = mockTutorials.find(t => t.id === id);

  if (!tutorial) {
    return <Navigate to="/tutorials" replace />;
  }

  const canAccess = !tutorial.isPremium || (user && (user.role === 'premium' || user.role === 'admin'));

  if (!canAccess) {
    return <Navigate to="/upgrade" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <img
            src={tutorial.thumbnailUrl}
            alt={tutorial.title}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {tutorial.category}
              </span>
              {tutorial.isPremium && (
                <div className="flex items-center space-x-1 text-amber-600 font-medium">
                  <Crown className="h-4 w-4" />
                  <span>Premium</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {tutorial.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {tutorial.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(tutorial.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{tutorial.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Tag className="h-4 w-4" />
                <span>By {tutorial.author}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {tutorial.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Video Section (Premium Only) */}
        {tutorial.isPremium && tutorial.videoUrl && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Video Tutorial</h2>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-8 text-center">
              <Play className="h-16 w-16 text-white mx-auto mb-4 opacity-75" />
              <p className="text-white text-lg">Video player would be embedded here</p>
              <p className="text-gray-300 text-sm mt-2">URL: {tutorial.videoUrl}</p>
            </div>
          </div>
        )}

        {/* Content */}
        {/* <AdBanner slot="1357924680" /> */}
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {tutorial.content}
            </div>
          </div>
        </div>
        
        {/* <AdBanner slot="2468013579" /> */}
      </div>
    </div>
  );
};