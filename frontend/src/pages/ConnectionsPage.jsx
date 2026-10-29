import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageCircleHeart,
  ArrowLeft,
  Send,
  Heart,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  Briefcase,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  User,
  ExternalLink,
  ChevronRight,
  Bell
} from 'lucide-react';

export const ConnectionsPage = () => {
  const {
    navigateTo,
    sentInterests,
    receivedInterests,
    acceptedConnections,
    acceptInterest,
    declineInterest,
    registeredProfiles,
    openProfileDetail,
    currentUser,
    notifications,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('sent'); // 'sent' | 'received' | 'accepted' | 'notifications'
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'them',
      text: 'As-salamu alaykum wa rahmatullahi wa barakatuh! It is a pleasure to connect.',
      time: '10:30 AM'
    },
    {
      id: 2,
      sender: 'me',
      text: 'Wa alaykum as-salam wa rahmatullah! Thank you for accepting the invitation. How is your family doing?',
      time: '10:32 AM'
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: chatMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory((prev) => [...prev, newMsg]);
    setChatMessage('');
    showToast('Message sent securely.', 'success');
  };

  // Find profiles for sent interests
  const sentProfiles = registeredProfiles.filter((p) => sentInterests.includes(p.id));
  // Find profiles for received interests
  const receivedProfiles = registeredProfiles.filter((p) => receivedInterests.includes(p.id));
  // Find profiles for accepted connections
  const acceptedProfiles = registeredProfiles.filter((p) => acceptedConnections.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[80vh]">
      
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
            Invites & Match Connections
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track match invitations sent, review incoming proposals, and communicate securely upon Sunnah guidelines.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3.5 py-2 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-gray-600">
              <Send className="w-3.5 h-3.5 text-amber-500" />
              <strong>{sentInterests.length}</strong> Sent
            </span>
            <span className="w-1 h-3 bg-gray-200 rounded-full" />
            <span className="flex items-center gap-1 text-gray-600">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <strong>{receivedInterests.length}</strong> Received
            </span>
            <span className="w-1 h-3 bg-gray-200 rounded-full" />
            <span className="flex items-center gap-1 text-gray-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <strong>{acceptedConnections.length}</strong> Connected
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'sent'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Sent Invitations ({sentInterests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('received')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'received'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Received Proposals ({receivedInterests.length})</span>
          {receivedInterests.length > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'received' ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'}`}>
              New
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('accepted')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'accepted'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <MessageCircleHeart className="w-3.5 h-3.5" />
          <span>Accepted & Chats ({acceptedConnections.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notification Logs ({notifications.length})</span>
        </button>
      </div>

      {/* TAB CONTENT: SENT INVITATIONS */}
      {activeTab === 'sent' && (
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Invitations Dispatched ({sentInterests.length})</span>
            </h3>
            <span className="text-xs text-gray-400">Status: Sent / Pending Response</span>
          </div>

          {sentProfiles.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-gray-200">
              <Send className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-700">No Sent Invitations Yet</p>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                Explore registered profiles on the home page and click "Invite / Express Interest" to connect.
              </p>
              <button
                onClick={() => navigateTo('home')}
                className="mt-4 px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Browse Registered Members
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sentProfiles.map((p) => {
                const photo = p.photos && p.photos.length > 0 ? p.photos[0] : (
                  p.gender === 'female'
                    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
                    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
                );

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow p-4 flex gap-4"
                  >
                    <img
                      src={photo}
                      alt={p.name}
                      className="w-20 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-sm font-bold text-gray-900 truncate">
                            {p.name}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                            Pending
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {p.age} yrs • {p.city}
                        </p>
                        <p className="text-[11px] text-gray-600 font-medium truncate mt-1">
                          {p.occupation}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-gray-50 mt-2">
                        <button
                          onClick={() => openProfileDetail(p.id)}
                          className="text-[11px] font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
                        >
                          View Bio
                        </button>
                        <span className="text-gray-300">•</span>
                        <span className="text-[10px] text-emerald-600 font-medium">Notification Sent ✓</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: RECEIVED PROPOSALS */}
      {activeTab === 'received' && (
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Incoming Match Proposals ({receivedProfiles.length})</span>
            </h3>
            <span className="text-xs text-gray-400">Review and accept to begin conversation</span>
          </div>

          {receivedProfiles.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-gray-200">
              <Heart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-700">No Pending Received Proposals</p>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                When other registered members express interest in your profile, their requests will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {receivedProfiles.map((p) => {
                const photo = p.photos && p.photos.length > 0 ? p.photos[0] : (
                  p.gender === 'female'
                    ? 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400'
                    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
                );

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-3xl border border-rose-100 shadow-sm p-5 flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      <img
                        src={photo}
                        alt={p.name}
                        className="w-24 h-28 rounded-2xl object-cover shrink-0 ring-2 ring-rose-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-base font-bold text-gray-900 truncate">
                            {p.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                            {p.matchScore || 94}% Match
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {p.age} yrs • {p.height || "5'4\""} • {p.city}
                        </p>
                        <p className="text-xs font-semibold text-gray-800 mt-1">
                          {p.occupation}
                        </p>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 italic">
                          "{p.bio || 'Practicing upon the Sunnah.'}"
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2">
                      <button
                        onClick={() => openProfileDetail(p.id)}
                        className="py-2 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl border border-gray-200 text-center cursor-pointer"
                      >
                        Full Bio
                      </button>

                      <button
                        onClick={() => declineInterest(p.id)}
                        className="py-2 text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl border border-gray-200 text-center cursor-pointer transition-colors"
                      >
                        Decline
                      </button>

                      <button
                        onClick={() => acceptInterest(p.id, p.name)}
                        className="py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs text-center cursor-pointer"
                      >
                        Accept ✓
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: ACCEPTED CONNECTIONS & CHAT */}
      {activeTab === 'accepted' && (
        <div className="py-6">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[480px]">
            
            {/* Left list of connections */}
            <div className="border-r border-gray-200 p-4 space-y-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Mutual Connections ({acceptedProfiles.length})
              </h4>

              {acceptedProfiles.length === 0 ? (
                <div className="py-8 text-center text-gray-400 text-xs">
                  No accepted connections yet. Accept an incoming proposal to start messaging.
                </div>
              ) : (
                acceptedProfiles.map((p) => {
                  const photo = p.photos && p.photos.length > 0 ? p.photos[0] : (
                    p.gender === 'female'
                      ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
                      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
                  );

                  return (
                    <div
                      key={p.id}
                      className="p-3 rounded-2xl bg-rose-50/60 border border-rose-200/60 flex items-center gap-3 cursor-pointer"
                    >
                      <img
                        src={photo}
                        alt={p.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">{p.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{p.city} • Active</p>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Chat Window */}
            <div className="md:col-span-2 flex flex-col justify-between bg-gray-50/50">
              {/* Chat Header */}
              <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                    MZ
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">
                      {acceptedProfiles[0]?.name || 'Maryam Siddiqui'}
                    </h4>
                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Verified Member • Wali Supervision Enabled
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openProfileDetail(acceptedProfiles[0]?.id || 'usr_sister_03')}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                >
                  View Profile
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="p-4 space-y-3 overflow-y-auto max-h-[320px]">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'me'
                          ? 'bg-rose-600 text-white rounded-br-xs'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-gray-400 mt-0.5 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a respectful message..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATION LOGS */}
      {activeTab === 'notifications' && (
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-500" />
              <span>Activity & Notification Records ({notifications.length})</span>
            </h3>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-xs divide-y divide-gray-100 overflow-hidden">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 sm:p-5 flex items-start gap-3.5 hover:bg-gray-50/60 transition-colors">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  n.type === 'interest_sent' ? 'bg-amber-100 text-amber-700' :
                  n.type === 'interest_accepted' ? 'bg-emerald-100 text-emerald-700' :
                  n.type === 'interest_received' ? 'bg-rose-100 text-rose-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {n.type === 'interest_sent' ? <Send className="w-4 h-4" /> :
                   n.type === 'interest_accepted' ? <CheckCircle2 className="w-4 h-4" /> :
                   n.type === 'interest_received' ? <Heart className="w-4 h-4 fill-rose-600" /> :
                   <Sparkles className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-900">{n.title}</h4>
                    <span className="text-[10px] text-gray-400">
                      {n.timestamp ? new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
