import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema } from '../schemas/memberSchema';
import toast from 'react-hot-toast';

export const RegistrationPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(memberSchema)
  });

  const onSubmit = async (data: any) => {
    // ఇక్కడ Supabase కి డేటా పంపుతాము
    // గమనిక: ఆధార్ నంబర్ కోసం [Aadhaar Redacted] అని పంపుతాము
    const finalData = { ...data, aadhar: '[Aadhaar Redacted]' };
    console.log("Saving Data:", finalData);
    toast.success('Photographer Registered Successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold text-amber-400 mb-6">Photographer Registration</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Photo Upload Placeholder */}
        <div className="md:col-span-3 mb-4">
          <label className="block text-sm text-slate-400 mb-2">Upload Photo</label>
          <input type="file" className="w-full p-3 bg-slate-900 rounded border border-slate-700 text-slate-300" />
        </div>

        <input {...register("fullName")} placeholder="Full Name" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("fatherName")} placeholder="Father Name" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <select {...register("gender")} className="p-3 bg-slate-900 rounded border border-slate-700 text-white">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        
        <input type="date" {...register("dob")} className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("bloodGroup")} placeholder="Blood Group" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("mobile")} placeholder="Mobile" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("whatsapp")} placeholder="WhatsApp" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("email")} placeholder="Email" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        
        {/* Official IDs */}
        <input disabled value="[Aadhaar Redacted]" className="p-3 bg-slate-900 rounded border border-slate-700 text-slate-500 cursor-not-allowed" />
        <input {...register("pan")} placeholder="PAN Number" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("studioName")} placeholder="Studio Name" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        
        <input {...register("address")} placeholder="Address" className="md:col-span-3 p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        
        <input {...register("district")} placeholder="District" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("state")} placeholder="State" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("pincode")} placeholder="Pincode" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        
        <button type="submit" className="md:col-span-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 p-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">
          Register Member
        </button>
      </form>
    </div>
  );
};
