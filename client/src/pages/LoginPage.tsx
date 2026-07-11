import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // signInWithPassword ఫంక్షన్ కాల్
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message); // లాగిన్ ఫెయిల్ అయితే ఎర్రర్ మెసేజ్
    } else {
      toast.success('Login Successful!');
      navigate('/dashboard'); // లాగిన్ తర్వాత డ్యాష్‌బోర్డ్‌కి వెళ్లడం
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 bg-slate-900 rounded-lg">
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
        className="block w-full p-2 mb-4 bg-slate-800 text-white"
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
        className="block w-full p-2 mb-4 bg-slate-800 text-white"
      />
      <button type="submit" className="w-full bg-amber-500 p-2 font-bold text-slate-950">
        Sign In
      </button>
    </form>
  );
};
