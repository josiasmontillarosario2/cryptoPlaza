

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
