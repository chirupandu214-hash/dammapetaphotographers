import { Response } from 'express';
import { CustomRequest } from '../middlewares/auth.middleware';
import { supabase } from '../config/supabase';

export const issueNewLoan = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { financialYearId, memberId, loanType, loanAmount, interestRate, installments, guarantorId, remarks } = req.body;

    // Calculate Flat Interest Amortization Formula
    // Total Interest = P * R * (N / 12) [Assuming N represents months/installments directly here]
    const totalInterest = Number(loanAmount) * (Number(interestRate) / 100) * (Number(installments) / 12);
    const totalPayable = Number(loanAmount) + totalInterest;
    const emi = Math.round((totalPayable / Number(installments)) * 100) / 100;

    // Set fallback repayment threshold boundary dates (e.g., 30 days from generation)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const { data: loan, error: loanError } = await supabase
      .from('loans')
      .insert([{
        financial_year_id: financialYearId,
        member_id: memberId,
        loan_type: loanType,
        loan_amount: loanAmount,
        interest_type: 'Flat',
        interest_rate: interestRate,
        installments,
        emi,
        balance_amount: totalPayable,
        due_date: dueDate.toISOString().split('T')[0],
        guarantor_id: guarantorId,
        loan_status: 'Approved',
        remarks
      }])
      .select()
      .single();

    if (loanError) throw loanError;

    res.status(201).json({ success: true, data: loan });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const submitLoanPayment = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { loanId, amountPaid, paymentMode, remarks } = req.body;

    // 1. Fetch current live structural ledger records
    const { data: loan, error: fetchError } = await supabase
      .from('loans')
      .select('balance_amount, paid_amount')
      .eq('id', loanId)
      .single();

    if (fetchError || !loan) {
      res.status(404).json({ success: false, message: 'Target loan lifecycle ledger matrix entry not found.' });
      return;
    }

    const newBalance = Number(loan.balance_amount) - Number(amountPaid);
    const newPaidAccumulator = Number(loan.paid_amount) + Number(amountPaid);
    const updatedStatus = newBalance <= 0 ? 'Closed' : 'Active';

    // 2. Perform validation update changes securely
    const receiptCode = `DPLN-REC-${Date.now()}`;
    const { error: paymentError } = await supabase
      .from('loan_payments')
      .insert([{
        receipt_code: receiptCode,
        loan_id: loanId,
        amount_paid: amountPaid,
        payment_mode: paymentMode,
        remarks
      }]);

    if (paymentError) throw paymentError;

    // 3. Sync loan balance metrics
    await supabase
      .from('loans')
      .update({
        balance_amount: newBalance,
        paid_amount: newPaidAccumulator,
        loan_status: updatedStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', loanId);

    res.status(200).json({ success: true, message: 'Loan payment processed and ledger balanced successfully.', remainingBalance: newBalance });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
