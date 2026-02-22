import React from 'react';

export default function ProfileFormScreen({
  profileForm,
  setProfileForm,
  handleProfileSubmit,
  setShowProfileForm,
  setClientUsername,
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Tell Us About Yourself
        </h2>
        <p className="text-gray-600 mb-6">
          This information helps us provide better assistance and connect you
          with appropriate resources.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm({ ...profileForm, name: e.target.value })
              }
              placeholder="John Doe"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={profileForm.age}
              onChange={(e) =>
                setProfileForm({ ...profileForm, age: e.target.value })
              }
              placeholder="25"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sex <span className="text-red-500">*</span>
            </label>
            <select
              value={profileForm.sex}
              onChange={(e) =>
                setProfileForm({ ...profileForm, sex: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Occupation
            </label>
            <input
              type="text"
              value={profileForm.occupation}
              onChange={(e) =>
                setProfileForm({ ...profileForm, occupation: e.target.value })
              }
              placeholder="Teacher, Student, etc."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              value={profileForm.contactNumber}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  contactNumber: e.target.value,
                })
              }
              placeholder="(817) 555-0100"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address/City
            </label>
            <input
              type="text"
              value={profileForm.address}
              onChange={(e) =>
                setProfileForm({ ...profileForm, address: e.target.value })
              }
              placeholder="Fort Worth, TX"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          <span className="text-red-500">*</span> Required fields
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowProfileForm(false);
              setClientUsername('');
            }}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleProfileSubmit}
            disabled={
              !profileForm.name || !profileForm.age || !profileForm.sex
            }
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Start Chatting
          </button>
        </div>
      </div>
    </div>
  );
}
