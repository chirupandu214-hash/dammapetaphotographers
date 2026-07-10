export interface Member {
  id: number;
  memberId: string;

  fullName: string;

  fatherName: string;

  mobile: string;

  aadhaar: string;

  email: string;

  gender: string;

  dob: string;

  bloodGroup: string;

  studioName: string;

  address: string;

  joinDate: string;

  photo: string;

  role: "Admin" | "Member";

  status: "Active" | "Inactive";
}
