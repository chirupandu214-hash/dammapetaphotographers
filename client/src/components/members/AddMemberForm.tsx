import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

// 1. వాలిడేషన్ స్కీమా
const memberSchema = z.object({
  full_name: z.string().min(3, "పేరు కనీసం 3 అక్షరాలు ఉండాలి"),
  email: z.string().email("సరైన ఈమెయిల్ ఇవ్వండి"),
  mobile: z.string().length(10, "10 అంకెల ఫోన్ నంబర్ ఇవ్వండి"),
  password: z.string().min(6, "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి"),
});

export const AddMemberForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(memberSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/register-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("రిజిస్ట్రేషన్ విఫలమైంది");
      
      toast.success("సభ్యుని నమోదు విజయవంతమైంది!");
      reset(); // ఫారమ్ క్లియర్ చేయడం
    } catch (error) {
      toast.error("ఏదో తప్పు జరిగింది, మళ్ళీ ప్రయత్నించండి");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="text-slate-400 text-sm">Full Name</label>
          <input {...register("full_name")} className="w-full p-2 bg-slate-800 rounded text-white border border-slate-700" />
          {errors.full_name && <p className="text-red-400 text-xs">{errors.full_name.message as string}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-slate-400 text-sm">Email</label>
          <input {...register("email")} className="w-full p-2 bg-slate-800 rounded text-white border border-slate-700" />
          {errors.email && <p className="text-red-400 text-xs">{errors.email.message as string}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label className="text-slate-400 text-sm">Mobile</label>
          <input {...register("mobile")} className="w-full p-2 bg-slate-800 rounded text-white border border-slate-700" />
          {errors.mobile && <p className="text-red-400 text-xs">{errors.mobile.message as string}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="text-slate-400 text-sm">Default Password</label>
          <input type="password" {...register("password")} className="w-full p-2 bg-slate-800 rounded text-white border border-slate-700" />
          {errors.password && <p className="text-red-400 text-xs">{errors.password.message as string}</p>}
        </div>
      </div>

      <button type="submit" className="mt-6 w-full bg-amber-500 text-slate-950 font-bold py-2 rounded hover:bg-amber-600">
        Register Member
      </button>
    </form>
  );
};
