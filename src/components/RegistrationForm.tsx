import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema } from '../schemas/memberSchema';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(memberSchema)
  });

  const onSubmit = async (data: any) => {
    // Aadhaar ఇక్కడ [Aadhaar Redacted] గా హ్యాండిల్ చేయబడుతుంది
    try {
      const { error } = await supabase.from('members').insert([{
        ...data,
        aadhar: '[Aadhaar Redacted]' 
      }]);
      if (error) throw error;
      toast.success('Member Registered Successfully!');
    } catch (error) {
      toast.error('Failed to register member');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-950 rounded-xl border border-slate-800">
      <h2 className="col-span-full text-xl font-bold text-amber-400 mb-4">Photographer Registration</h2>
      
      <input {...register("fullName")} placeholder="Full Name" className="p-3 bg-slate-900 rounded border border-slate-700" />
      <input {...register("fatherName")} placeholder="Father Name" className="p-3 bg-slate-900 rounded border border-slate-700" />
      <input {...register("mobile")} placeholder="Mobile" className="p-3 bg-slate-900 rounded border border-slate-700" />
      <input {...register("email")} placeholder="Email" className="p-3 bg-slate-900 rounded border border-slate-700" />
      
      {/* Aadhaar మరియు PAN ఫీల్డ్స్ */}
      <input {...register("aadhar")} placeholder="Aadhaar Number" className="p-3 bg-slate-900 rounded border border-slate-700" />
      <input {...register("pan")} placeholder="PAN Number" className="p-3 bg-slate-900 rounded border border-slate-700" />
      
      <textarea {...register("address")} placeholder="Full Address" className="col-span-full p-3 bg-slate-900 rounded border border-slate-700" />
      
      <button type="submit" className="col-span-full bg-amber-500 text-slate-950 p-3 rounded font-bold hover:bg-amber-400 transition-colors">
        Submit Registration
      </button>
    </form>
  );
};
