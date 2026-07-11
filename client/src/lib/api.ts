import axios from 'axios';
import { supabase } from './supabase';

const api = axios.create({
  // Render లో ఇచ్చిన బ్యాక్ఎండ్ లింక్ ఇక్కడ కనెక్ట్ అవుతుంది
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ప్రతి రిక్వెస్ట్ కి ముందు Supabase టోకెన్ (Security) యాడ్ చేస్తుంది
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
