import { z } from 'zod';

export const memberSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  fatherName: z.string().min(3, "Father name is required"),
  gender: z.enum(['male', 'female', 'other']),
  dob: z.date(),
  bloodGroup: z.string(),
  mobile: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number"),
  whatsapp: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number"),
  email: z.string().email("Invalid email"),
  aadhar: z.string().min(12, "Invalid Aadhaar format"), // [Aadhaar Redacted]
  pan: z.string().length(10, "Invalid PAN format"),
  studioName: z.string().min(3, "Studio name required"),
  address: z.string().min(10, "Address is required"),
  district: z.string(),
  state: z.string(),
  pincode: z.string().length(6, "Invalid Pincode"),
  joiningDate: z.date(),
  status: z.string().default('active')
});
