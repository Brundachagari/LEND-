import React, { createContext, useContext, useMemo, useState } from 'react';

export type Message = {
  id: string;
  conversationId: string;
  fromUserId: string;
  text: string;
  createdAt: number;
};

export type Conversation = {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  lastMessageAt: number;
};

type MessagingContextValue = {
  conversations: Conversation[];
  messagesByConversationId: Record<string, Message[]>;
  getOrCreateConversation: (params: { listingId: string; buyerId: string; sellerId: string }) => string;
  sendMessage: (params: { conversationId: string; fromUserId: string; text: string }) => void;
};

const MessagingContext = createContext<MessagingContextValue | undefined>(undefined);

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messagesByConversationId, setMessagesByConversationId] = useState<Record<string, Message[]>>({});

  const getOrCreateConversation: MessagingContextValue['getOrCreateConversation'] = ({
    listingId,
    buyerId,
    sellerId,
  }) => {
    const existing = conversations.find(
      (c) => c.listingId === listingId && c.buyerId === buyerId && c.sellerId === sellerId
    );
    if (existing) return existing.id;

    const id = `c_${Date.now()}`;
    const now = Date.now();
    const next: Conversation = { id, listingId, buyerId, sellerId, lastMessageAt: now };
    setConversations((cur) => [next, ...cur]);
    setMessagesByConversationId((cur) => ({
      ...cur,
      [id]: [
        {
          id: `m_${now}`,
          conversationId: id,
          fromUserId: sellerId,
          text: 'Hi! It’s still available 💕',
          createdAt: now,
        },
      ],
    }));
    return id;
  };

  const sendMessage: MessagingContextValue['sendMessage'] = ({ conversationId, fromUserId, text }) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = Date.now();
    const message: Message = {
      id: `m_${now}`,
      conversationId,
      fromUserId,
      text: trimmed,
      createdAt: now,
    };
    setMessagesByConversationId((cur) => ({
      ...cur,
      [conversationId]: [...(cur[conversationId] ?? []), message],
    }));
    setConversations((cur) =>
      cur
        .map((c) => (c.id === conversationId ? { ...c, lastMessageAt: now } : c))
        .sort((a, b) => b.lastMessageAt - a.lastMessageAt)
    );
  };

  const value = useMemo(
    () => ({ conversations, messagesByConversationId, getOrCreateConversation, sendMessage }),
    [conversations, messagesByConversationId]
  );

  return <MessagingContext.Provider value={value}>{children}</MessagingContext.Provider>;
}

export function useMessaging() {
  const ctx = useContext(MessagingContext);
  if (!ctx) throw new Error('useMessaging must be used within a MessagingProvider');
  return ctx;
}

