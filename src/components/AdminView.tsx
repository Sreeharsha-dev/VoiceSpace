import { useState } from 'react';
import { useMessages } from '../lib/store';
import { CheckCircle, Inbox, ShieldCheck, Check } from 'lucide-react';

export default function AdminView() {
  const { messages, resolveMessage } = useMessages();
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  function handleResolve(id: string) {
    if (!resolutionText.trim()) return;
    resolveMessage(id, resolutionText.trim());
    setResolvingId(null);
    setResolutionText('');
  }

  const pending = messages.filter(m => m.status === 'pending');
  const resolved = messages.filter(m => m.status === 'resolved');

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-semibold tracking-tight text-slate-900 mb-2">
          Submissions
        </h2>
        <p className="text-slate-500 font-medium">Review and resolve incoming feedback.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wider font-mono">Inbox Queue</h3>
            <span className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
              {pending.length} Pending
            </span>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-white border border-slate-200 rounded-full text-slate-500">
              {resolved.length} Resolved
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <div className="text-center py-20 bg-white">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Inbox className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-sm text-slate-500 font-medium">No messages in queue</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 bg-white">
              {messages.map(message => (
                <div key={message.id} className="p-8 transition-colors hover:bg-slate-50/50 group">
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {message.status === 'pending' ? (
                          <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-slate-900 bg-slate-100 px-2 py-0.5 rounded-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse"></div>
                            Unresolved
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-slate-500 bg-slate-50 px-2 py-0.5 rounded-sm">
                            <CheckCircle className="w-3 h-3" />
                            Resolved
                          </span>
                        )}
                        <span className="text-xs font-mono text-slate-400">
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                      </div>
                      
                      <p className={`text-base font-medium leading-relaxed whitespace-pre-wrap ${
                        message.status === 'pending' ? 'text-slate-800' : 'text-slate-400 italic'
                      }`}>
                        {message.text}
                      </p>
                    </div>
                  </div>

                  {message.status === 'pending' && resolvingId !== message.id && (
                    <button
                      onClick={() => {
                        setResolvingId(message.id);
                        setResolutionText('');
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-900 transition-colors mt-4 uppercase tracking-widest border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-100 opacity-0 group-hover:opacity-100"
                    >
                      <Check className="w-3 h-3" />
                      Mark Resolved
                    </button>
                  )}

                  {resolvingId === message.id && (
                    <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-5">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Resolution Note (optional)
                      </label>
                      <textarea
                        value={resolutionText}
                        onChange={e => setResolutionText(e.target.value)}
                        placeholder="Detail the actions taken..."
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm resize-none outline-none focus:border-slate-400 mb-4 transition-colors"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResolve(message.id)}
                          className="px-5 py-2.5 text-[11px] font-bold bg-slate-900 text-white rounded-lg shadow-sm hover:bg-slate-800 transition-all uppercase tracking-widest"
                        >
                          Confirm Resolution
                        </button>
                        <button
                          onClick={() => setResolvingId(null)}
                          className="px-5 py-2.5 text-[11px] font-bold bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors uppercase tracking-widest"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {message.status === 'resolved' && message.resolution && (
                    <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-5">
                      <h4 className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        <ShieldCheck className="w-3 h-3" />
                        Admin Resolution
                      </h4>
                      <p className="text-sm text-slate-600 whitespace-pre-wrap">{message.resolution}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
