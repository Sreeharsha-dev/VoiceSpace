import { useState, useEffect } from 'react';
import { Message } from '../types';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error('Failed to fetch messages', e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const addMessage = async (text: string) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (res.ok) {
        const newMessage = await res.json();
        setMessages(prev => [newMessage, ...prev]);
      }
    } catch (e) {
      console.error('Failed to add message', e);
    }
  };

  const resolveMessage = async (id: string, resolution?: string) => {
    try {
      const res = await fetch(`/api/messages/${id}/resolve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolution })
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => 
          m.id === id ? { ...m, status: 'resolved', resolution: resolution || '' } : m
        ));
      }
    } catch (e) {
      console.error('Failed to resolve message', e);
    }
  };

  const deleteMessage = (id: string) => {
    // For local UI update if needed, actual deletion API not implemented yet
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return { messages, addMessage, resolveMessage, deleteMessage };
}
