'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PROVINCIAS_PERMITIDAS } from '@/lib/constants';

export async function createContacto(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/login');
  }

  const nombre = (formData.get('nombre') as string)?.trim();
  const email = (formData.get('email') as string || formData.get('correo') as string)?.trim();
  const numero = (formData.get('numero') as string)?.trim();
  const provincia = (formData.get('provincia') as string)?.trim();

  if (!nombre || !email || !numero || !provincia) {
    return;
  }

  if (!PROVINCIAS_PERMITIDAS.includes(provincia as any)) {
    return;
  }

  await prisma.contact.create({
    data: {
      nombre,
      email,
      numero,
      provincia,
      userId: user.id,
    },
  });

  revalidatePath('/');
  redirect('/');
}

export async function updateContacto(id: number, formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/login');
  }

  const contactoExistente = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contactoExistente) {
    return;
  }

  const nombre = (formData.get('nombre') as string)?.trim();
  const email = (formData.get('email') as string || formData.get('correo') as string)?.trim();
  const numero = (formData.get('numero') as string)?.trim();
  const provincia = (formData.get('provincia') as string)?.trim();

  if (!nombre || !email || !numero || !provincia) {
    return;
  }

  if (!PROVINCIAS_PERMITIDAS.includes(provincia as any)) {
    return;
  }

  await prisma.contact.update({
    where: { id },
    data: {
      nombre,
      email,
      numero,
      provincia,
    },
  });

  revalidatePath('/');
  redirect('/');
}

export async function deleteContacto(id: number): Promise<{ error?: string; success?: boolean }> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { error: 'No has iniciado sesión.' };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return { error: 'Usuario no encontrado.' };
  }

  const contactoExistente = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contactoExistente) {
    return { error: 'El contacto no existe.' };
  }

  await prisma.contact.delete({
    where: { id },
  });

  revalidatePath('/');
  return { success: true };
}
