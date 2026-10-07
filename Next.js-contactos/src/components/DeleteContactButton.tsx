'use client';

import { useTransition } from 'react';
import { deleteContacto } from '@/app/actions/contactActions';
import { useRouter } from 'next/navigation';

interface DeleteContactButtonProps {
  contactId: number;
  contactName: string;
  className?: string;
}

export default function DeleteContactButton({ contactId, contactName, className }: DeleteContactButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${contactName}?`)) {
      startTransition(async () => {
        const res = await deleteContacto(contactId);
        if (res?.error) {
          alert(res.error);
        } else {
          router.push('/');
          router.refresh();
        }
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className={
        className ||
        'flex-1 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-md disabled:opacity-50 transition-all text-center'
      }
    >
      {isPending ? 'Borrando...' : 'Borrar'}
    </button>
  );
}
