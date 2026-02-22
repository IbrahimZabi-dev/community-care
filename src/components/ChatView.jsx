import React, { useRef, useEffect } from 'react';
import { Send, MessageSquare, Users, Check, Clock, TrendingUp, LogOut, MapPin, Phone, Star } from 'lucide-react';
import { getCategoryIcon } from '../utils/getCategoryIcon';

const SUGGESTIONS = [
  { text: 'I need food assistance', icon: '🍽️' },
  { text: 'I need help finding housing', icon: '🏠' },
  { text: 'I need healthcare services', icon: '🏥' },
  { text: 'I need help finding a job', icon: '💼' },
];

export default function ChatView({
  currentUserProfile,
  chatMessages,
  inputMessage,
  setInputMessage,
  isLoading,
  analytics,
  savedFavorites,
  onSendMessage,
  onLogout,
  onToggleFavorite,
  onOpenResourceModal,
}) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <MessageSquare size={28} />
                CommunityCare Network
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                Welcome back, {currentUserProfile?.name}!
              </p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition text-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            <div className="bg-blue-700 bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-blue-100" />
                <p className="text-xs text-blue-100">Total Inquiries</p>
              </div>
              <p className="text-xl font-bold">
                {analytics?.totalInquiries ?? 0}
              </p>
            </div>
            <div className="bg-blue-700 bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Check size={16} className="text-blue-100" />
                <p className="text-xs text-blue-100">Successful Referrals</p>
              </div>
              <p className="text-xl font-bold">
                {analytics?.successfulReferrals ?? 0}
              </p>
            </div>
            <div className="bg-blue-700 bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-blue-100" />
                <p className="text-xs text-blue-100">Avg Response</p>
              </div>
              <p className="text-xl font-bold">
                {analytics?.avgResponseTime ?? 'N/A'}
              </p>
            </div>
            <div className="bg-blue-700 bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-blue-100" />
                <p className="text-xs text-blue-100">Success Rate</p>
              </div>
              <p className="text-xl font-bold">
                {analytics
                  ? Math.round(
                      (analytics.successfulReferrals / analytics.totalInquiries) *
                        100
                    )
                  : 0}
                  %
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        {chatMessages.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-semibold mb-3">
              Hi {currentUserProfile?.name}! How can we help you today?
            </h2>
            <p className="text-gray-600 mb-4">
              Tell us what you need in your own words. We'll help you find the
              right resources.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputMessage(suggestion.text)}
                  className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition"
                >
                  <span className="text-2xl mr-2">{suggestion.icon}</span>
                  <span className="text-sm text-gray-700">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 ${msg.role === 'user' ? 'flex justify-end' : ''}`}
          >
            <div
              className={`max-w-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white shadow-md'
              } rounded-lg p-4`}
            >
              <p
                className={
                  msg.role === 'user' ? 'text-white' : 'text-gray-800'
                }
              >
                {msg.content}
              </p>

              {msg.resources && msg.resources.length > 0 && (
                <div className="mt-4 space-y-3">
                  <p className="font-semibold text-sm text-gray-700">
                    Recommended Resources:
                  </p>
                  {msg.resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {getCategoryIcon(resource.category)}
                          </span>
                          <h3 className="font-semibold text-gray-900">
                            {resource.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => onToggleFavorite(resource.id)}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          <Star
                            size={20}
                            fill={
                              savedFavorites.includes(resource.id)
                                ? 'currentColor'
                                : 'none'
                            }
                          />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {resource.description}
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin size={14} />
                          <span>{resource.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone size={14} />
                          <span>{resource.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock size={14} />
                          <span>{resource.hours}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {resource.availability}
                        </span>
                        <button
                          onClick={() => onOpenResourceModal(resource)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Finding resources for you...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="bg-white border-t p-4 max-w-4xl mx-auto w-full">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Describe what you need help with..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={onSendMessage}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          🚨 In crisis? Call 988 for immediate support
        </p>
      </div>
    </div>
  );
}
