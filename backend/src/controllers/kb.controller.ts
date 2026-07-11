import { Response } from 'express';
import { CustomRequest } from '../middlewares/auth.middleware';
import { supabase } from '../config/supabase';

export const registerKutumbhaBharosha = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { memberId, nomineeName, relationship, nomineeMobile, familyDetails } = req.body;

    // Verify member existence and that they aren't already registered
    const { data: existingKB, error: checkError } = await supabase
      .from('kutumbha_bharosha')
      .select('id')
      .eq('member_id', memberId)
      .maybeSingle();

    if (existingKB) {
      res.status(400).json({ success: false, message: 'Member is already registered under Kutumbha Bharosha.' });
      return;
    }

    const { data: kbData, error: insertError } = await supabase
      .from('kutumbha_bharosha')
      .insert([{
        member_id: memberId,
        nominee_name: nomineeName,
        relationship,
        nominee_mobile: nomineeMobile,
        family_details: familyDetails || []
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    // Log action to Audit Logs
    await supabase.from('audit_logs').insert([{
      user_id: req.user?.id,
      username: req.user?.username,
      role: req.user?.role,
      action: 'INSERT',
      module: 'KUTUMBHA_BHAROSHA',
      record_id: kbData.id.toString(),
      ip_address: req.ip
    }]);

    res.status(201).json({ success: true, data: kbData });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Internal architectural failure.', error: error.message });
  }
};
