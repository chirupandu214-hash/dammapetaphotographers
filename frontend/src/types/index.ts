export interface BaseUser {
  id: string;
  email: string;
  role: 'Admin' | 'Member';
  username: string;
  created_at: string;
}

export interface MemberProfile {
  id: number;
  member_code: string;
  user_id: string | null;
  full_name: string;
  father_husband_name: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  blood_group: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  studio_name: string;
  address: text;
  village: string;
  mandal: string;
  district: string;
  state: string;
  pin: string;
  joining_date: string;
  membership_status: 'Active' | 'Inactive' | 'Suspended';
  photo_url?: string;
  aadhaar_url?: string;
  created_at: string;
}

export interface YearlyFundRecord {
  id: number;
  receipt_code: string;
  financial_year_id: number;
  member_id: number;
  female_bb: number;
  male_bb: number;
  id_card_fee: number;
  total_amount: number;
  amount_paid: number;
  remaining_balance: number;
  payment_mode: 'Cash' | 'UPI' | 'Bank Transfer';
  collection_date: string;
  remarks?: string;
}
