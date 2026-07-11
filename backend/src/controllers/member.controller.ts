import { Response } from 'express';
import { CustomRequest } from '../middlewares/auth.middleware';
import { supabase } from '../config/supabase';

export const registerMember = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const {
      fullName, fatherHusbandName, gender, dob, bloodGroup, mobile, whatsapp,
      email, studioName, address, village, mandal, district, pin, username, password, role
    } = req.body;

    // 1. Structural provisioning through core Supabase Auth engine
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError || !authData.user) {
      res.status(400).json({ success: false, message: 'Auth engine compilation failed.', error: authError });
      return;
    }

    const userId = authData.user.id;

    // 2. Insert tracking layer mapping configuration
    const { error: userTableError } = await supabase
      .from('users')
      .insert([{ id: userId, email, role: role || 'Member', username }]);

    if (userTableError) {
      await supabase.auth.admin.deleteUser(userId);
      res.status(400).json({ success: false, message: 'User layer synchronization failure.', error: userTableError });
      return;
    }

    // 3. Populate core relational metadata model
    const { data: memberData, error: memberError } = await supabase
      .from('members')
      .insert([{
        user_id: userId,
        full_name: fullName,
        father_husband_name: fatherHusbandName,
        gender,
        dob,
        blood_group: bloodGroup,
        mobile,
        whatsapp,
        email,
        studio_name: studioName,
        address,
        village,
        mandal,
        district,
        pin
      }])
      .select()
      .single();

    if (memberError) {
      await supabase.auth.admin.deleteUser(userId);
      res.status(400).json({ success: false, message: 'Profile injection aborted.', error: memberError });
      return;
    }

    // 4. Record action via Audit Log Pipeline
    await supabase.from('audit_logs').insert([{
      user_id: req.user?.id,
      username: req.user?.username,
      role: req.user?.role,
      action: 'INSERT',
      module: 'MEMBERS',
      record_id: memberData.id.toString(),
      ip_address: req.ip
    }]);

    res.status(201).json({ success: true, data: memberData });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Internal architectural failure.', error: error.message });
  }
};

export const getMembers = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const offset = (page - 1) * limit;

    let query = supabase.from('members').select('*', { count: 'exact' }).eq('is_deleted', false);

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,studio_name.ilike.%${search}%,member_code.ilike.%${search}%`);
    }

    const { data, count, error } = await query
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.status(200).json({
      success: true,
      meta: { total: count, page, limit, pages: Math.ceil((count || 0) / limit) },
      data
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
