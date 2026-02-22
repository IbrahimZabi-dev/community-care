import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import ProfileFormScreen from './components/ProfileFormScreen';
import ClientView from './components/ClientView';
import CaseWorkerLogin from './components/CaseWorkerLogin';
import CaseWorkerDashboard from './components/CaseWorkerDashboard';
import { sampleResources } from './data/resources';
import { defaultAnalytics } from './data/analytics';
import { hasCrisisKeyword, sendChatMessage } from './services/chatService';

const INITIAL_PROFILE_FORM = {
  name: '',
  age: '',
  sex: '',
  occupation: '',
  contactNumber: '',
  address: '',
};

export default function App() {
  const [currentView, setCurrentView] = useState('client');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [savedFavorites, setSavedFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [resources, setResources] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [clientUsername, setClientUsername] = useState('');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [profileForm, setProfileForm] = useState(INITIAL_PROFILE_FORM);

  useEffect(() => {
    setResources(sampleResources);
    setAnalytics(defaultAnalytics);
  }, []);

  const handleClientLogin = () => {
    if (clientUsername.trim()) {
      setShowProfileForm(true);
    }
  };

  const handleProfileSubmit = () => {
    if (profileForm.name && profileForm.age && profileForm.sex) {
      setCurrentUserProfile({
        username: clientUsername,
        ...profileForm,
        createdAt: new Date().toISOString(),
      });
      setShowProfileForm(false);
      setChatMessages([]);
    }
  };

  const handleLogout = () => {
    setCurrentUserProfile(null);
    setClientUsername('');
    setChatMessages([]);
    setSavedFavorites([]);
    setProfileForm(INITIAL_PROFILE_FORM);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    if (hasCrisisKeyword(inputMessage)) {
      const crisisResource = resources.find((r) => r.id === '6');
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `🚨 I notice you may be in crisis. Please contact the Crisis Hotline immediately at 988 (available 24/7). Your safety is the top priority.\n\nI'm also here to help you find other resources. Would you like me to continue helping with that?`,
          resources: crisisResource ? [crisisResource] : [],
        },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const parsed = await sendChatMessage({
        message: inputMessage,
        userProfile: currentUserProfile,
        resources,
        apiKey,
      });

      const recommendedResources = resources.filter((r) =>
        parsed.recommendedResourceIds?.includes(r.id)
      );

      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: parsed.message,
          resources: recommendedResources,
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I apologize, but I encountered an error. Please try again or speak with a case worker for assistance.',
        },
      ]);
    }

    setIsLoading(false);
  };

  const toggleFavorite = (resourceId) => {
    setSavedFavorites((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  // Client flow
  if (currentView === 'client') {
    if (!currentUserProfile && !showProfileForm) {
      return (
        <LoginScreen
          clientUsername={clientUsername}
          setClientUsername={setClientUsername}
          handleClientLogin={handleClientLogin}
          setCurrentView={setCurrentView}
        />
      );
    }

    if (!currentUserProfile && showProfileForm) {
      return (
        <ProfileFormScreen
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          handleProfileSubmit={handleProfileSubmit}
          setShowProfileForm={setShowProfileForm}
          setClientUsername={setClientUsername}
        />
      );
    }

    if (currentUserProfile) {
      return (
        <ClientView
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedFavorites={savedFavorites}
          currentUserProfile={currentUserProfile}
          chatMessages={chatMessages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          isLoading={isLoading}
          analytics={analytics}
          resources={resources}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showResourceModal={showResourceModal}
          setShowResourceModal={setShowResourceModal}
          selectedResource={selectedResource}
          setSelectedResource={setSelectedResource}
          onSendMessage={handleSendMessage}
          onLogout={handleLogout}
          onToggleFavorite={toggleFavorite}
          setCurrentView={setCurrentView}
        />
      );
    }
  }

  // Case worker flow
  if (currentView === 'caseworker') {
    if (!isAuthenticated) {
      return <CaseWorkerLogin onLogin={() => setIsAuthenticated(true)} />;
    }
    return (
      <CaseWorkerDashboard
        analytics={analytics}
        onSwitchToClient={() => setCurrentView('client')}
        onSignOut={() => setIsAuthenticated(false)}
      />
    );
  }

  return null;
}
