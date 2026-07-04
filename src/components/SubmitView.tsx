import React, { useState } from 'react';
import { useMessages } from '../lib/store';
import { Send, CheckCircle, ShieldCheck } from 'lucide-react';

export default function SubmitView() {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addMessage } = useMessages();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      addMessage(text.trim());
      setSubmitted(true);
      setText('');
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-6">
          <ShieldCheck className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-mono font-medium text-slate-600 uppercase tracking-widest">End-to-End Anonymous</span>
        </div>
        <h2 className="text-4xl font-display font-semibold tracking-tight text-slate-900 mb-4">
          Speak Freely
        </h2>
        <p className="text-slate-500 max-w-md mx-auto text-base">
          Share your feedback, report an issue, or express your thoughts. Your identity is stripped at the client level.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <textarea
              id="message"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Start typing your message here..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-slate-700 h-40 resize-none outline-none focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-50 transition-all placeholder:text-slate-400 text-base"
              required
            />
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <p className="text-xs font-mono text-slate-400">
              {text.length} characters
            </p>
            <button
              type="submit"
              disabled={!text.trim() || isSubmitting}
              className="inline-flex items-center justify-center bg-slate-900 text-white font-medium px-8 py-3.5 rounded-xl text-sm transition-all hover:bg-slate-800 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Encrypting...</span>
              ) : submitted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Delivered Safely
                </>
              ) : (
                <>
                  Submit Message
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
