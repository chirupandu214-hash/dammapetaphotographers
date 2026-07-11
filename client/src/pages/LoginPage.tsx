import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. సుపాబేస్ ద్వారా లాగిన్
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('లాగిన్ విఫలమైంది: ' + error.message);
      return;
    }

    // 2. యూజర్ రోల్ (super_admin vs member) డేటాబేస్ నుండి పొందడం
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      toast.error('ప్రొఫైల్ వివరాలు దొరకలేదు');
      return;
    }

    // 3. రీడైరెక్ట్ లాజిక్
    if (profile.role === 'super_admin') {
      navigate('/dashboard'); // అడ్మిన్ కోసం
    } else {
      navigate('/member/profile'); // మెంబర్ కోసం
    }
    
    toast.success('స్వాగతం!');
  };

  return (
    // మీ లాగిన్ ఫారమ్ UI కోడ్ ఇక్కడ ఉంటుంది
    <form onSubmit={handleLogin}>
       {/* Input fields for email and password */}
    </form>
  );
};
