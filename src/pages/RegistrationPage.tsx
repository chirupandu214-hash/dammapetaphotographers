import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema } from '../schemas/memberSchema'; // మీ Zod స్కీమా ఇక్కడ ఉండాలి
import toast from 'react-hot-toast';

export const RegistrationPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(memberSchema)
  });

  const onSubmit = async (data: any) => {
    // API Call (Supabase)
    console.log("Form Data:", data);
    toast.success('Photographer Registered Successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-950 border border-slate-800 rounded-xl">
      <h2 className="text-2xl font-bold text-amber-400 mb-6">Photographer Registration</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Basic Details */}
        <input {...register("fullName")} placeholder="Full Name" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("fatherName")} placeholder="Father Name" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <select {...register("gender")} className="p-3 bg-slate-900 rounded border border-slate-700 text-white">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        
        <input type="date" {...register("dob")} className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("bloodGroup")} placeholder="Blood Group" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("mobile")} placeholder="Mobile" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("whatsapp")} placeholder="WhatsApp" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("email")} placeholder="Email" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        
        {/* Official Details */}
        <input {...register("aadhar")} placeholder="Aadhaar Number" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("pan")} placeholder="PAN Number" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("studioName")} placeholder="Studio Name" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("address")} placeholder="Address" className="md:col-span-2 p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        
        <input {...register("district")} placeholder="District" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("state")} placeholder="State" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        <input {...register("pincode")} placeholder="Pincode" className="p-3 bg-slate-900 rounded border border-slate-700 text-white" />
        
        <button type="submit" className="md:col-span-3 bg-amber-500 text-slate-950 p-4 rounded font-bold hover:bg-amber-400">
          Complete Registration
        </button>
      </form>
    </div>
  );
};
