import React from 'react';
import {
  LayoutDashboard,
  LogOut,
  Users,
  Check,
  Clock,
  TrendingUp,
} from 'lucide-react';

const RECENT_INTERACTIONS = [
  {
    name: 'Maria G.',
    need: 'Food assistance for family of 4',
    status: 'Matched',
    time: '15 min ago',
  },
  {
    name: 'John D.',
    need: 'Emergency housing support',
    status: 'Follow-up needed',
    time: '1 hour ago',
  },
  {
    name: 'Sarah M.',
    need: 'Healthcare referral',
    status: 'Completed',
    time: '2 hours ago',
  },
];

export default function CaseWorkerDashboard({
  analytics,
  onSwitchToClient,
  onSignOut,
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <LayoutDashboard size={28} />
              Case Worker Dashboard
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSwitchToClient}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition text-sm"
            >
              ← Client View
            </button>
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition text-sm"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 flex-1 overflow-y-auto">
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.totalInquiries}
                  </p>
                </div>
                <Users className="text-blue-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Successful Referrals
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.successfulReferrals}
                  </p>
                </div>
                <Check className="text-green-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.avgResponseTime}
                  </p>
                </div>
                <Clock className="text-orange-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      (analytics.successfulReferrals /
                        analytics.totalInquiries) *
                        100
                    )}
                    %
                  </p>
                </div>
                <TrendingUp className="text-purple-600" size={32} />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Top Service Categories
          </h2>
          <div className="space-y-3">
            {analytics?.topCategories?.map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{cat.name}</span>
                  <span className="text-gray-600">{cat.count} requests</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(cat.count / analytics.totalInquiries) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Client Interactions
          </h2>
          <div className="space-y-3">
            {RECENT_INTERACTIONS.map((client, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    {client.name}
                  </span>
                  <span className="text-xs text-gray-500">{client.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{client.need}</p>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    client.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : client.status === 'Matched'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
