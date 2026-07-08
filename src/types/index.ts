export type AppRole = "admin" | "member";

export type RecordStatus =
  | "active"
  | "inactive"
  | "pending"
  | "approved"
  | "rejected"
  | "closed"
  | "archived";

export interface Profile {
  id: string;
  full_name: string;
  email: string | null;
  mobile: string | null;
  role: AppRole;
  avatar_url: string | null;
  status: RecordStatus;
  must_change_password: boolean;
}

export interface FieldConfig {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "number"
    | "date"
    | "textarea"
    | "select";
  required?: boolean;
  readonly?: boolean;
  options?: string[];
}

export interface ResourceConfig {
  table: string;
  title: string;
  description: string;
  path: string;
  adminOnly: boolean;
  searchable: string[];
  fields: FieldConfig[];
}
