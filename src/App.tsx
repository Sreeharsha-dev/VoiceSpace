import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SubmitView from './components/SubmitView';
import AdminView from './components/AdminView';
import { LogOut, ShieldCheck } from 'lucide-react';

function UserApp() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">VoiceSpace</h1>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <SubmitView />
      </main>
    </div>
  );
}

function AdminApp() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-sm w-full text-center">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-display font-semibold tracking-tight text-slate-900 mb-2">Admin Portal</h1>
          <p className="text-sm text-slate-500 mb-8">Enter the master password to access messages.</p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (password === 'admin2427@@@@') {
                setIsAuthenticated(true);
              } else {
                alert('Incorrect password');
              }
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Authentication Password"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-slate-400 focus:bg-white transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-medium py-3 rounded-lg text-sm transition-all hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full bg-white border border-slate-200 text-slate-600 font-medium py-3 rounded-lg text-sm transition-colors hover:bg-slate-50 mt-1"
            >
              Back to Home
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">VoiceSpace</h1>
            <span className="ml-3 bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-slate-200">
              Admin
            </span>
          </div>
          
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors bg-white border border-slate-200 px-3 py-2 rounded-full hover:bg-slate-50"
          >
            <LogOut className="w-3 h-3" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-1">
        <AdminView />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserApp />} />
      <Route path="/harshabro" element={<AdminApp />} />
    </Routes>
  );
}
