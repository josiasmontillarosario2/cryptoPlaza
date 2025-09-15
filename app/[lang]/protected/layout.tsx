
import { AuthButton } from "@/components/auth/auth-button";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen ">
        <div className="flex-1 ">
          {children}
        </div>
    </main>
  );
}
