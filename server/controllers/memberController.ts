// server/controllers/memberController.ts
import { supabaseAdmin } from '../config/supabase';

export const addMember = async (req: Request, res: Response) => {
  try {
    const memberData = req.body;
    // ఆధార్ నంబర్ రిడాక్ట్ చేయడం (Security Protocol)
    const secureData = { ...memberData, aadhar_ref: '[Aadhaar Redacted]' };
    
    const { data, error } = await supabaseAdmin.from('members').insert([secureData]);
    if (error) throw error;
    
    res.status(201).json({ message: "సభ్యుని నమోదు విజయవంతమైంది", data });
  } catch (error) {
    res.status(500).json({ error: "డేటాబేస్ లో సేవ్ చేయడం సాధ్యం కాలేదు" });
  }
};
