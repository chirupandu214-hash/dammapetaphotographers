import { z } from 'zod';

export const memberFormSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters long'),
  fatherHusbandName: z.string().min(3, 'Father/Husband name is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Valid date of birth is required',
  }),
  bloodGroup: z.string().min(1, 'Blood group is required'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number structure'),
  whatsapp: z.string().regex(/^[6-9]\d{9}$/, 'Invalid WhatsApp number structure').optional(),
  email: z.string().email('Invalid email address structure').or(z.literal('')),
  studioName: z.string().min(2, 'Studio name must be valid'),
  address: z.string().min(5, 'Complete residential address is required'),
  village: z.string().min(2, 'Village is required'),
  mandal: z.string().min(2, 'Mandal is required'),
  district: z.string().min(2, 'District is required'),
  pin: z.string().regex(/^\d{6}$/, 'PIN code must be exactly 6 digits'),
  username: z.string().min(4, 'Username must be at least 4 characters'),
  password: z.string().min(8, 'Password must be a minimum of 8 cryptographic characters'),
});

export type MemberFormValues = z.infer<typeof memberFormSchema>;
