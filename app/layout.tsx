import "./globals.css";

export const metadata = {
  title: "ASN CRUD",
  description: "Aplikasi Monitoring ASN - CRUD",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl p-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Monitoring ASN (CRUD)</h1>
            <a href="https://prisma.io" target="_blank" className="text-sm underline">Prisma</a>
          </header>
          {children}
          <footer className="mt-10 text-center text-xs text-gray-500">
            &copy; 2025 ASN CRUD Demo
          </footer>
        </div>
      </body>
    </html>
  );
}
