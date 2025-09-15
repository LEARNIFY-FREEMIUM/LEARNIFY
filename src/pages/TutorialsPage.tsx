import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TutorialCard } from '../components/TutorialCard';
import { AdBanner } from '../components/AdBanner';
import { mockTutorials } from '../data/mockData';
import { Search, Filter } from 'lucide-react';

export const TutorialsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Redirect guests to register
  if (!user || user.role === 'guest') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Learnify</h2>
          <p className="text-gray-600 mb-6">Create a free account to access our tutorial library.</p>
          <a
            href="/register"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
          >
            Join Free Now
          </a>
        </div>
      </div>
    );
  }

  // Filter tutorials - free users see non-premium, premium users see all
  const visibleTutorials = mockTutorials.filter(tutorial => {
    const categoryMatch = selectedCategory === 'all' || tutorial.category.toLowerCase() === selectedCategory;
    const searchMatch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const categories = ['all', ...Array.from(new Set(mockTutorials.map(t => t.category.toLowerCase())))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tutorial Library</h1>
          <p className="text-xl text-gray-600">
            {user.role === 'free' ? 'Explore our free tutorials' : 'Access your complete tutorial library'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tutorials..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tutorials Grid */}
        {/* <AdBanner slot="1234567890" /> */}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
        
        {/* <AdBanner slot="0987654321" /> */}

        {visibleTutorials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tutorials found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};