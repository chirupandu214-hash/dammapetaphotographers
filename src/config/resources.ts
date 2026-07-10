export interface ResourceField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  readonly?: boolean;
  options?: string[];
}

export interface ResourceConfig {
  table: string;
  title: string;
  description?: string;
  path: string;
  adminOnly?: boolean;
  searchable?: string[];
  fields?: ResourceField[];
}

export const adminResources: ResourceConfig[] = [
  {
    table: "members",
    title: "Member Management",
    description: "Manage members, profiles, QR codes and ID cards.",
    path: "members",
    adminOnly: true,
    searchable: [
      "member_id",
      "membership_number",
      "full_name",
      "mobile_number",
      "studio_name",
      "village",
    ],
    fields: [
      {
        name: "member_id",
        label: "Member ID",
        type: "text",
        readonly: true,
      },
      {
        name: "full_name",
        label: "Full Name",
        type: "text",
        required: true,
      }
    ]
  }

];
