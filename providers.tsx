import { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}
