import { supabaseAdmin } from '../config/supabase';

export const registerMember = async (req: Request, res: Response) => {
  const { email, password, full_name, mobile } = req.body;

  // 1. అథెంటికేషన్ లో యూజర్‌ని క్రియేట్ చేయడం
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // ఆటోమేటిక్ కన్ఫర్మ్
    user_metadata: { full_name }
  });

  if (authError) return res.status(400).json({ error: authError.message });

  // 2. profiles టేబుల్‌లో మిగిలిన వివరాలు (mobile, role) యాడ్ చేయడం
  await supabaseAdmin
    .from('profiles')
    .update({ full_name, mobile, role: 'member' })
    .eq('id', authData.user.id);

  res.status(200).json({ message: "సభ్యుడు విజయవంతంగా యాడ్ అయ్యారు" });
};
