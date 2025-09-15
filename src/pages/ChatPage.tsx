import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockChatMessages } from '../data/mockData';
import { Send, MessageCircle, Crown, Clock } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [messages] = useState(mockChatMessages);

  if (!user || user.role !== 'premium' || user.subscriptionPlan !== 'pro') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <Crown className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pro Membership Required</h2>
          <p className="text-gray-600 mb-6">Upgrade to Pro to chat directly with instructors.</p>
          <a
            href="/upgrade"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 font-medium"
          >
            Upgrade to Pro
          </a>
        </div>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Mock sending message
      alert('Message sent! The instructor will reply soon.');
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chat with Instructor</h1>
              <p className="text-gray-600">Get personalized help and guidance</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start the Conversation</h3>
                <p className="text-gray-600">Send your first message to get help from the instructor.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white rounded-2xl rounded-tr-md p-4 max-w-xs lg:max-w-md">
                      <p className="text-sm">{message.message}</p>
                      <div className="flex items-center space-x-1 mt-2 text-blue-100 text-xs">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(message.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin Reply */}
                  {message.adminReply && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-tl-md p-4 max-w-xs lg:max-w-md">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">I</span>
                          </div>
                          <span className="text-sm font-medium text-green-600">Instructor</span>
                        </div>
                        <p className="text-sm">{message.adminReply}</p>
                        <div className="flex items-center space-x-1 mt-2 text-gray-500 text-xs">
                          <Clock className="h-3 w-3" />
                          <span>{message.adminReplyTimestamp ? new Date(message.adminReplyTimestamp).toLocaleString() : ''}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-6">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Chat Guidelines</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Be specific about your questions for better help</li>
            <li>• Include relevant code snippets when asking technical questions</li>
            <li>• Response time is typically within 2-24 hours</li>
            <li>• Keep messages professional and respectful</li>
          </ul>
        </div>
      </div>
    </div>
  );
};