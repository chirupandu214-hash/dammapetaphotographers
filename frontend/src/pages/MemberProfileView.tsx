import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../store/AuthContext';
import { IdCardGenerator } from '../components/IdCardGenerator';
import api from '../services/api';

export const MemberProfileView: React.FC = () => {
  const { user } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['memberSelfProfile', user?.id],
    queryFn: async () => {
      const res = await api.get(`/members/profile/self`);
      return res.data.data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) return <div className="p-8 text-center animate-pulse text-slate-400">Loading profile ledger records...</div>;
  if (!profile) return <div className="p-8 text-center text-rose-500 font-medium">Profile entry mismatch. Contact system admin.</div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{profile.full_name}</h1>
          <p className="text-slate-500 text-sm">Member ID: {profile.member_code} • Status: {profile.membership_status}</p>
        </div>
        <div className="scale-90 sm:scale-100 origin-top-left md:origin-top-right">
          <IdCardGenerator member={profile} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Studio Registration Metadata</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-400 font-medium">Studio Nomenclature</dt>
                <dd className="font-semibold text-slate-900 dark:text-white mt-0.5">{profile.studio_name}</dd>
              </div>
              <div>
                <dt className="text-slate-400 font-medium">Primary Contact line</dt>
                <dd className="font-semibold text-slate-900 dark:text-white mt-0.5">{profile.mobile}</dd>
              </div>
              <div>
                <dt className="text-slate-400 font-medium">Email Address Token</dt>
                <dd className="font-semibold text-slate-900 dark:text-white mt-0.5">{profile.email || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-slate-400 font-medium">Blood Stratification Group</dt>
                <dd className="font-semibold text-slate-900 dark:text-white mt-0.5">{profile.blood_group}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Geographical & Postal Footprint</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {profile.address}, <br />
              {profile.village}, {profile.mandal}, <br />
              {profile.district}, {profile.state} - <span className="font-mono font-semibold">{profile.pin}</span>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Association Credentials</h3>
            <p className="text-xs text-slate-400 mb-4">Registration values mapped during onboarding sequences.</p>
            <div className="space-y-3 text-xs border-t border-slate-100 dark:border-slate-900 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Onboarding Frame</span>
                <span className="font-medium">{new Date(profile.joining_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">National Id Proof</span>
                <span className="font-medium text-emerald-500 font-semibold">[Verified File Stack]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
