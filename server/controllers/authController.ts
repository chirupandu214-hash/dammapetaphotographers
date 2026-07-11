// server/controllers/authController.ts
export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Supabase లో లాగిన్
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(401).json({ error: "Invalid Credentials" });

  // యూజర్ రోల్ చెక్ చేయడం
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (profile?.role !== 'super_admin') {
    return res.status(403).json({ error: "Access Denied: You are not an admin" });
  }

  // సక్సెస్ - ఆడిట్ లాగ్ ఎంట్రీ
  await supabaseAdmin.from('audit_logs').insert([{
    user_id: data.user.id,
    action: 'LOGIN',
    details: 'Super Admin logged in'
  }]);

  res.status(200).json({ message: "Welcome Admin", session: data.session });
};
