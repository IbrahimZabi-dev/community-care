import React from 'react';
import { Database, MessageSquare } from 'lucide-react';
import ChatView from './ChatView';
import ResourceDirectory from './ResourceDirectory';
import ResourceModal from './ResourceModal';

export default function ClientView({
  activeTab,
  setActiveTab,
  savedFavorites,
  currentUserProfile,
  chatMessages,
  inputMessage,
  setInputMessage,
  isLoading,
  analytics,
  resources,
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  showResourceModal,
  setShowResourceModal,
  selectedResource,
  setSelectedResource,
  onSendMessage,
  onLogout,
  onToggleFavorite,
  setCurrentView,
}) {
  const openResourceModal = (resource) => {
    setSelectedResource(resource);
    setShowResourceModal(true);
  };

  return (
    <div>
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
        <button
          onClick={() =>
            setActiveTab(activeTab === 'chat' ? 'resources' : 'chat')
          }
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          title="Switch view"
        >
          {activeTab === 'chat' ? (
            <Database size={24} />
          ) : (
            <MessageSquare size={24} />
          )}
        </button>
        {savedFavorites.length > 0 && (
          <div className="bg-yellow-500 text-white p-2 rounded-full text-xs font-bold w-8 h-8 flex items-center justify-center">
            {savedFavorites.length}
          </div>
        )}
      </div>

      <button
        onClick={() => setCurrentView('caseworker')}
        className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-900 transition text-sm"
      >
        Staff Login →
      </button>

      {activeTab === 'chat' ? (
        <ChatView
          currentUserProfile={currentUserProfile}
          chatMessages={chatMessages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          isLoading={isLoading}
          analytics={analytics}
          savedFavorites={savedFavorites}
          onSendMessage={onSendMessage}
          onLogout={onLogout}
          onToggleFavorite={onToggleFavorite}
          onOpenResourceModal={openResourceModal}
        />
      ) : (
        <ResourceDirectory
          resources={resources}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          savedFavorites={savedFavorites}
          onToggleFavorite={onToggleFavorite}
          onOpenResourceModal={openResourceModal}
        />
      )}

      {showResourceModal && selectedResource && (
        <ResourceModal
          resource={selectedResource}
          onClose={() => {
            setShowResourceModal(false);
            setSelectedResource(null);
          }}
        />
      )}
    </div>
  );
}
