import { Response } from 'express';
import { CustomRequest } from '../middlewares/auth.middleware';
import { supabase } from '../config/supabase';

export const collectYearlyFund = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { financialYearId, memberId, femaleBb, maleBb, idCardFee, amountPaid, paymentMode, remarks } = req.body;

    // Auto-generate safe programmatic receipt footprints
    const timestamp = Date.now();
    const randomHex = Math.floor(Math.random() * 10000).toString(16).toUpperCase();
    const receiptCode = `DPR-${timestamp}-${randomHex}`;

    const { data: fundRecord, error: fundError } = await supabase
      .from('yearly_funds')
      .insert([{
        receipt_code: receiptCode,
        financial_year_id: financialYearId,
        member_id: memberId,
        female_bb: femaleBb || 0.00,
        male_bb: maleBb || 0.00,
        id_card_fee: idCardFee || 0.00,
        amount_paid: amountPaid,
        payment_mode: paymentMode,
        remarks
      }])
      .select()
      .single();

    if (fundError) throw fundError;

    res.status(201).json({ success: true, data: fundRecord });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
