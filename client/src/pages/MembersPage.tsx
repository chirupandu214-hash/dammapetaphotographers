import { AddMemberForm } from '../components/members/AddMemberForm';
import { MembersTable } from '../components/members/MembersTable';

export const MembersPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Photographers Management</h1>
        <div className="text-sm text-slate-400">Total Registered: 150</div>
      </div>

      {/* ఫారమ్ మరియు టేబుల్ సెక్షన్ */}
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-amber-500 mb-4 uppercase tracking-wider">
            Register New Member
          </h2>
          <AddMemberForm />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-amber-500 mb-4 uppercase tracking-wider">
            Members List
          </h2>
          <MembersTable />
        </section>
      </div>
    </div>
  );
};
