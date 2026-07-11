import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberFormSchema, MemberFormValues } from '../schemas/member.schema';
import api from '../services/api';

export const RegisterMember: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: { gender: 'Male', bloodGroup: 'O+' }
  });

  const onSubmitForm = async (values: MemberFormValues) => {
    try {
      await api.post('/members', values);
      alert('Member records synchronized securely into system state.');
      reset();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error occurred during network propagation.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-950 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-bold mb-6 tracking-tight">Register New Association Member</h2>
      
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input {...register('fullName')} className="w-full px-3 py-2 border rounded-md dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
            {errors.fullName && <p className="text-rose-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Father / Husband Name</label>
            <input {...register('fatherHusbandName')} className="w-full px-3 py-2 border rounded-md dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
            {errors.fatherHusbandName && <p className="text-rose-500 text-xs mt-1">{errors.fatherHusbandName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Studio Name</label>
            <input {...register('studioName')} className="w-full px-3 py-2 border rounded-md dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
            {errors.studioName && <p className="text-rose-500 text-xs mt-1">{errors.studioName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input { ...register('mobile') } className="w-full px-3 py-2 border rounded-md dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
            {errors.mobile && <p className="text-rose-500 text-xs mt-1">{errors.mobile.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select { ...register('gender') } className="w-full px-3 py-2 border rounded-md dark:bg-slate-900 border-slate-300 dark:border-slate-700">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input type="date" { ...register('dob') } className="w-full px-3 py-2 border rounded-md dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
            {errors.dob && <p className="text-rose-500 text-xs mt-1">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Village</label>
            <input { ...register('village') } className="w-full px-3 py-2 border rounded-md dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
            {errors.village && <p className="text-rose-500 text-xs mt-1">{errors.village.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">PIN Code</label>
            <input { ...register('pin') } className="w-full px-3 py-2 border rounded-md dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
            {errors.pin && <p className="text-rose-500 text-xs mt-1">{errors.pin.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Portal Authentication Username</label>
            <input { ...register('username') } className="w-full px-3 py-2 border rounded-md dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
            {errors.username && <p className="text-rose-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Portal Authentication Password</label>
            <input type="password" { ...register('password') } className="w-full px-3 py-2 border rounded-md dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : 'Finalize Registration'}
          </button>
        </div>
      </form>
    </div>
  );
};
