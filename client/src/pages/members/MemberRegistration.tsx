import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import { supabase } from '../../lib/supabase';

// ఫామ్ వాలిడేషన్ రూల్స్
const memberSchema = z.object({
  full_name: z.string().min(3, 'Full name is required'),
  father_name: z.string().min(3, 'Father name is required'),
  gender: z.enum(['Male', 'Female']),
  dob: z.string().min(1, 'DOB is required'),
  blood_group: z.string().min(1, 'Blood group is required'),
  mobile: z.string().length(10, 'Must be 10 digits'),
  whatsapp: z.string().length(10, 'Must be 10 digits'),
  email: z.string().email('Invalid email'),
  aadhar_number: z.string().length(12, 'Must be 12 digits'),
  pan_number: z.string().length(10, 'Must be 10 characters'),
  studio_name: z.string().min(3, 'Studio name required'),
  address: z.string().min(5, 'Address is required'),
  district: z.string().min(3, 'District is required'),
  state: z.string().min(3, 'State is required'),
  pincode: z.string().length(6, 'Must be 6 digits'),
});

type MemberFormValues = z.infer<typeof memberSchema>;

export const MemberRegistration: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      gender: 'Male',
      state: 'Telangana',
      district: 'Bhadradri Kothagudem'
    }
  });

  const onSubmit = async (data: MemberFormValues) => {
    setIsSubmitting(true);
    try {
      // ఫ్రంట్ఎండ్ నుండే డైరెక్ట్‌గా సురక్షితంగా Supabase కి పంపడం (బ్యాక్ఎండ్ పూర్తయ్యేలోపు టెస్టింగ్ కోసం)
      const { error } = await supabase.from('members').insert([data]);
      
      if (error) throw error;
      
      toast.success('Photographer Registered Successfully! Member ID auto-generated.');
      reset();
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h2 className="text-xl font-bold text-white">Photographer Registration</h2>
        <p className="text-xs text-slate-400 mt-1">Enroll a new association member. ID will be generated automatically.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Full Name *</label>
            <input {...register('full_name')} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
            {errors.full_name && <p className="text-red-400 text-xs mt-1">{errors.full_name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Father's Name *</label>
            <input {...register('father_name')} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
            {errors.father_name && <p className="text-red-400 text-xs mt-1">{errors.father_name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Mobile Number *</label>
            <input {...register('mobile')} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
            {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Email Address *</label>
            <input {...register('email')} type="email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Studio Name *</label>
            <input {...register('studio_name')} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Blood Group *</label>
            <select {...register('blood_group')} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none">
              <option value="O+">O+</option><option value="A+">A+</option><option value="B+">B+</option><option value="AB+">AB+</option>
              <option value="O-">O-</option><option value="A-">A-</option><option value="B-">B-</option><option value="AB-">AB-</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Aadhar Number *</label>
            <input {...register('aadhar_number')} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" placeholder="12-digit number" />
            {errors.aadhar_number && <p className="text-red-400 text-xs mt-1">{errors.aadhar_number.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Date of Birth *</label>
            <input {...register('dob')} type="date" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
          </div>
        </div>

        {/* దాచిన ఫీల్డ్స్ (డిఫాల్ట్ వాల్యూస్ కోసం) */}
        <input type="hidden" {...register('whatsapp')} value="0000000000" />
        <input type="hidden" {...register('pan_number')} value="ABCDE1234F" />
        <input type="hidden" {...register('gender')} value="Male" />

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Full Address *</label>
          <textarea {...register('address')} rows={2} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">District</label>
            <input {...register('district')} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">State</label>
            <input {...register('state')} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Pincode</label>
            <input {...register('pincode')} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 font-bold text-slate-950 text-sm rounded-xl shadow-lg transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : 'Register Member'}
          </button>
        </div>
      </form>
    </div>
  );
};
