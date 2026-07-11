import { AddMemberForm } from '../components/members/AddMemberForm';
import { MembersTable } from '../components/members/MembersTable';

export const MembersPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Photographers Management</h1>
      
      {/* సభ్యులను యాడ్ చేయడానికి ఫారమ్ */}
      <AddMemberForm />
      
      {/* సభ్యుల జాబితా టేబుల్ */}
      <MembersTable />
    </div>
  );
};
