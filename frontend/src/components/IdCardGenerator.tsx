import React from 'react';
import QRCode from 'react-qr-code';
import { MemberProfile } from '../types';

interface IdCardProps {
  member: MemberProfile;
}

export const IdCardGenerator: React.FC<IdCardProps> = ({ member }) => {
  const verificationUrl = `https://dpa-portal.web.app/verify/member/${member.member_code}`;

  return (
    <div className="w-[3.375in] h-[2.125in] bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-3 relative shadow-xl overflow-hidden border border-slate-700 flex flex-col justify-between select-none">
      {/* Decorative Matrix Header Layout */}
      <div className="flex items-center space-x-2 border-b border-slate-700 pb-1.5">
        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center font-bold text-[10px] text-slate-950">DPA</div>
        <div>
          <h4 className="text-[10px] font-bold tracking-wide uppercase text-amber-400">Dhammapeta Photographers</h4>
          <p className="text-[7px] text-slate-400 -mt-0.5 font-medium">Association Management Portal</p>
        </div>
      </div>

      {/* Main Structural Bio Section */}
      <div className="flex items-start justify-between my-2">
        <div className="flex space-x-2.5">
          <div className="w-14 h-16 bg-slate-800 rounded border border-slate-600 flex items-center justify-center overflow-hidden">
            {member.photo_url ? (
              <img src={member.photo_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[8px] text-slate-500 font-medium">NO PHOTO</span>
            )}
          </div>
          <div className="space-y-0.5 text-left">
            <p className="text-[8px] text-amber-500 font-bold uppercase tracking-tight">{member.member_code}</p>
            <h3 className="text-[11px] font-bold tracking-tight text-white">{member.full_name}</h3>
            <p className="text-[8px] text-slate-300 font-semibold truncate max-w-[120px]">{member.studio_name}</p>
            <p className="text-[7px] text-slate-400">Cell: {member.mobile}</p>
          </div>
        </div>

        {/* System Cryptographic Verification Target */}
        <div className="bg-white p-1 rounded shadow-md flex items-center justify-center">
          <QRCode value={verificationUrl} size={42} level="M" />
        </div>
      </div>

      {/* Footer System Boundaries Layout */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-1 text-[7px] text-slate-400">
        <div>
          <span>Issued: {new Date(member.joining_date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="font-medium text-slate-300 uppercase tracking-wider">{member.membership_status}</span>
        </div>
      </div>
    </div>
  );
};
