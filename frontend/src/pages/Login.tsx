import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import axios from 'axios';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorText(null);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
      const response = await axios.post(`${baseUrl}/auth/login`, { username, password });
      
      const { token, role, user } = response.data.data;
      login(token, role, user);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorText(err.response?.data?.message || 'Network propagation layer error encountered.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-amber-500">DPA Management Portal</h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Dhammapeta Photographers Association</p>
        </div>

        {errorText && (
          <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-400 text-xs font-medium rounded-lg">
            {errorText}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Account Username</label>
            <input 
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" 
              placeholder="e.g., dpp_admin"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Account Password</label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" 
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-md disabled:opacity-50 mt-2"
          >
            {isSubmitting ? 'Verifying Cryptographic Credentials...' : 'Authenticate & Enter Portal'}
          </button>
        </form>
      </div>
    </div>
  );
};
