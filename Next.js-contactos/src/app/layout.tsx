import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Lista de Contactos',
  description: 'Aplicación de agenda de contactos con Next.js y Prisma',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="max-w-4xl mx-auto p-6 w-full flex-1">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
