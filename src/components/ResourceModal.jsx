import React from 'react';
import { MapPin, Phone, Clock, X } from 'lucide-react';
import { getCategoryIcon } from '../utils/getCategoryIcon';

export default function ResourceModal({ resource, onClose }) {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">
                {getCategoryIcon(resource.category)}
              </span>
              <h2 className="text-xl font-bold text-gray-900">
                {resource.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mb-4">{resource.description}</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={18} className="text-gray-500 shrink-0" />
              <span>{resource.address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={18} className="text-gray-500 shrink-0" />
              <span>{resource.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={18} className="text-gray-500 shrink-0" />
              <span>{resource.hours}</span>
            </div>
          </div>
          {resource.eligibility && (
            <p className="mt-3 text-sm text-gray-600">
              <span className="font-medium">Eligibility:</span>{' '}
              {resource.eligibility}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              {resource.availability}
            </span>
            <span className="text-sm text-gray-600">
              Rating: {resource.rating} ★
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
