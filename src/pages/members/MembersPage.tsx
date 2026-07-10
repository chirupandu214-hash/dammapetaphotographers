import AppLayout from "@/layouts/AppLayout";

import MemberTable from "@/components/members/MemberTable";

import { members } from "@/data/members";

export default function MembersPage() {
  return (
    <AppLayout>
      <h1>Members</h1>

      <br />

      <MemberTable members={members} />
    </AppLayout>
  );
}
