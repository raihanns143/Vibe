import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Search, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Avatar } from '../common/Avatar';

export const MessagesView: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    currentUser,
    navigateToUser,
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const [searchConv, setSearchConv] = useState('');
  const [mobileInThread, setMobileInThread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, messageText);
    setMessageText('');
  };

  const filteredConversations = conversations.filter((c) => {
    if (!searchConv.trim()) return true;
    const q = searchConv.toLowerCase();
    return (
      c.participant.name.toLowerCase().includes(q) ||
      c.participant.username.toLowerCase().includes(q) ||
      c.messages.some((m) => m.content.toLowerCase().includes(q))
    );
  });

  return (
    <div className="rounded-2xl bg-[#111115] border border-neutral-900 overflow-hidden h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex">
      {/* Conversations List Panel */}
      <div
        className={`w-full md:w-80 border-r border-neutral-900 flex flex-col ${
          mobileInThread ? 'hidden md:flex' : 'flex'
        }`}
      >
        <div className="p-3.5 border-b border-neutral-900 space-y-2.5">
          <div className="flex items-center justify-between">
            <h1 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              Direct Messages
            </h1>
            <span className="text-[10px] font-mono text-neutral-500">
              {conversations.length} chats
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchConv}
              onChange={(e) => setSearchConv(e.target.value)}
              placeholder="Search conversations..."
              className="w-full h-8 pl-8 pr-3 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-red-600/50"
            />
          </div>
        </div>

        {/* List items */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-900/60">
          {filteredConversations.map((conv) => {
            const isActive = activeConversation?.id === conv.id;
            const lastMsg = conv.messages[conv.messages.length - 1];

            return (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConversationId(conv.id);
                  setMobileInThread(true);
                }}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#18181F] border-l-2 border-red-600' : 'hover:bg-neutral-900/40'
                }`}
              >
                <Avatar
                  user={conv.participant}
                  size="md"
                  showVerified={conv.participant.verified}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <p className="text-xs font-semibold text-neutral-100 truncate">
                      {conv.participant.name}
                    </p>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                      {conv.lastActivity}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 truncate mt-0.5">
                    {lastMsg ? lastMsg.content : 'No messages'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Conversation Chat Window */}
      <div
        className={`flex-1 flex flex-col bg-[#0D0D10] ${
          !mobileInThread ? 'hidden md:flex' : 'flex'
        }`}
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-14 px-4 border-b border-neutral-900 flex items-center justify-between bg-[#111115]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileInThread(false)}
                  className="md:hidden p-1.5 -ml-1 text-neutral-400 hover:text-white rounded-lg"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div
                  onClick={() => navigateToUser(activeConversation.participant)}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <Avatar user={activeConversation.participant} size="sm" />
                  <div>
                    <p className="text-xs font-semibold text-white group-hover:text-red-400 transition-colors">
                      {activeConversation.participant.name}
                    </p>
                    <p className="text-[10px] font-mono text-neutral-500">
                      @{activeConversation.participant.username}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-neutral-400">
                <button
                  onClick={() => navigateToUser(activeConversation.participant)}
                  className="text-[11px] px-2.5 py-1 bg-neutral-850 hover:bg-neutral-800 text-neutral-300 rounded-lg transition-colors cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            </div>

            {/* Message History List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="text-center py-4">
                <Avatar user={activeConversation.participant} size="lg" className="mx-auto mb-2" />
                <p className="text-xs font-semibold text-white">
                  {activeConversation.participant.name}
                </p>
                <p className="text-[11px] text-neutral-500 max-w-xs mx-auto mt-0.5">
                  {activeConversation.participant.bio}
                </p>
                <div className="w-12 h-px bg-neutral-850 mx-auto my-3" />
              </div>

              {activeConversation.messages.map((msg) => {
                const isMine = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed break-words ${
                        isMine
                          ? 'bg-red-600 text-white rounded-tr-none'
                          : 'bg-[#1C1C22] text-neutral-200 border border-neutral-800 rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 mt-1 px-1">
                      {msg.createdAt}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Send Message Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-neutral-900 bg-[#111115] flex items-center gap-2"
            >
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={`Message @${activeConversation.participant.username}...`}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-600/60"
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="p-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white transition-all cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-neutral-500">
            <MessageSquare className="w-8 h-8 mb-2 text-neutral-600" />
            <p className="text-xs font-medium text-neutral-300">Select a conversation</p>
            <p className="text-[11px] text-neutral-500">
              Send messages directly to other demo creators.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
