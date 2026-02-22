import React from 'react';
import { Database, Search, Phone, Clock, Star } from 'lucide-react';
import { getCategoryIcon } from '../utils/getCategoryIcon';

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'food', label: 'Food Assistance' },
  { value: 'housing', label: 'Housing' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'employment', label: 'Employment' },
  { value: 'youth', label: 'Youth Services' },
  { value: 'crisis', label: 'Crisis Support' },
];

export default function ResourceDirectory({
  resources,
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  savedFavorites,
  onToggleFavorite,
  onOpenResourceModal,
}) {
  const filteredResources = resources.filter((r) => {
    const matchesCategory =
      filterCategory === 'all' || r.category === filterCategory;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Database size={28} />
            Resource Directory
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full p-4 flex-1 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">
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
              <p className="text-sm text-gray-600 mb-3">
                {resource.description}
              </p>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={14} />
                  <span>{resource.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={14} />
                  <span>{resource.hours}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {resource.availability}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm text-gray-700">
                    {resource.rating}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onOpenResourceModal(resource)}
                className="w-full mt-3 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
