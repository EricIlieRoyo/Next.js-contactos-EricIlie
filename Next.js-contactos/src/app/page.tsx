import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ContactosManager from '@/components/ContactosManager';

export const dynamic = 'force-dynamic';

export default async function Inicio() {
  const session = await getServerSession(authOptions);

  let currentUserId: number | undefined = undefined;

  if (session?.user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (dbUser) {
      currentUserId = dbUser.id;
    }
  }

  const contactos = await prisma.contact.findMany({
    orderBy: { id: 'desc' },
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <ContactosManager
        contactos={contactos}
        currentUserId={currentUserId}
        isAuthenticated={Boolean(session?.user)}
      />
    </main>
  );
}
