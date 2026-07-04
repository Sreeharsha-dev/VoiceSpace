import { useState, useEffect } from 'react';
import { Message } from '../types';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  // Load initial from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('voicespace_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const addMessage = (text: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      createdAt: Date.now(),
      status: 'pending'
    };
    
    setMessages(prev => {
      const updated = [newMessage, ...prev];
      localStorage.setItem('voicespace_messages', JSON.stringify(updated));
      return updated;
    });
  };

  const resolveMessage = (id: string, resolution?: string) => {
    setMessages(prev => {
      const updated = prev.map(m => 
        m.id === id ? { ...m, status: 'resolved', resolution } : m
      );
      localStorage.setItem('voicespace_messages', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => {
      const updated = prev.filter(m => m.id !== id);
      localStorage.setItem('voicespace_messages', JSON.stringify(updated));
      return updated;
    });
  };

  return { messages, addMessage, resolveMessage, deleteMessage };
}
