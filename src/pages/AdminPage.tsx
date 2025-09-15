import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockTutorials, mockChatMessages } from '../data/mockData';
import { 
  Users, 
  BookOpen, 
  MessageCircle, 
  Plus, 
  Settings,
  Crown,
  Mail,
  Clock
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have admin permissions.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const renderOverview = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">1,247</p>
            <p className="text-gray-600 text-sm">Total Users</p>
          </div>
        </div>
        <div className="text-green-600 text-sm">+12% this month</div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <BookOpen className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockTutorials.length}</p>
            <p className="text-gray-600 text-sm">Tutorials</p>
          </div>
        </div>
        <div className="text-blue-600 text-sm">2 published this week</div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Crown className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">89</p>
            <p className="text-gray-600 text-sm">Premium Users</p>
          </div>
        </div>
        <div className="text-amber-600 text-sm">$1,335 MRR</div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <MessageCircle className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockChatMessages.length}</p>
            <p className="text-gray-600 text-sm">Messages</p>
          </div>
        </div>
        <div className="text-purple-600 text-sm">1 pending reply</div>
      </div>
    </div>
  );

  const renderTutorials = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Tutorials</h2>
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Tutorial</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutorial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTutorials.map((tutorial) => (
                <tr key={tutorial.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-lg object-cover" src={tutorial.thumbnailUrl} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{tutorial.title}</div>
                        <div className="text-sm text-gray-500">{tutorial.readTime} min read</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {tutorial.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {tutorial.isPremium ? (
                      <span className="flex items-center space-x-1 text-amber-600">
                        <Crown className="h-4 w-4" />
                        <span className="text-sm font-medium">Premium</span>
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">Free</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(tutorial.publishDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-700 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Student Messages</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {mockChatMessages.filter(m => !m.adminReply).length} pending
        </span>
      </div>

      <div className="space-y-4">
        {mockChatMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-2">
                <Mail className="h-5 w-5 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-medium text-gray-900">{message.userEmail}</span>
                  <span className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(message.timestamp).toLocaleString()}</span>
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{message.message}</p>
                
                {message.adminReply ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium mb-1">Your Reply:</p>
                    <p className="text-green-700 text-sm">{message.adminReply}</p>
                    <span className="text-green-600 text-xs mt-2 block">
                      Replied on {message.adminReplyTimestamp ? new Date(message.adminReplyTimestamp).toLocaleString() : ''}
                    </span>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Type your reply..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                    <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm font-medium">
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">P</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">premium@test.com</div>
                      <div className="text-sm text-gray-500">Premium User</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="flex items-center space-x-1 text-amber-600">
                    <Crown className="h-4 w-4" />
                    <span className="text-sm font-medium">Premium</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Jan 15, 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-700 mr-4">Edit</button>
                  <button className="text-red-600 hover:text-red-700">Suspend</button>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-8 w-8 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">F</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">free@test.com</div>
                      <div className="text-sm text-gray-500">Free User</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Free</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Feb 1, 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-700 mr-4">Upgrade</button>
                  <button className="text-red-600 hover:text-red-700">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'tutorials':
        return renderTutorials();
      case 'messages':
        return renderMessages();
      case 'users':
        return renderUsers();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Learnify platform</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};