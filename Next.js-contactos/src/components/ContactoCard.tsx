'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { deleteContacto } from '@/app/actions/contactActions';

export interface Contacto {
  id: number;
  nombre: string;
  email: string;
  numero: string;
  provincia: string;
  userId: number;
}

interface ContactoCardProps {
  contacto: Contacto;
  currentUserId?: number;
  onEdit?: (contacto: Contacto) => void;
}

export default function ContactoCard({ contacto, currentUserId, onEdit }: ContactoCardProps) {
  const [isPending, startTransition] = useTransition();

  const canEdit = currentUserId !== undefined;

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${contacto.nombre}?`)) {
      startTransition(async () => {
        const res = await deleteContacto(contacto.id);
        if (res?.error) {
          alert(res.error);
        }
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            <Link href={`/contactos/${contacto.id}`} className="hover:underline">
              {contacto.nombre}
            </Link>
          </h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
            {contacto.provincia}
          </span>
        </div>

        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{contacto.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{contacto.numero}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs mb-1">
          <Link
            href={`/contactos/${contacto.id}`}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium inline-flex items-center gap-1"
          >
            Ver Ficha Completa &rarr;
          </Link>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit?.(contacto)}
              className="flex-1 text-center bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/50 text-xs font-semibold py-2 px-3 rounded-xl border border-amber-200/80 dark:border-amber-800/80 transition-all"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/50 disabled:opacity-50 text-xs font-semibold py-2 px-3 rounded-xl border border-rose-200/80 dark:border-rose-800/80 transition-all"
            >
              {isPending ? 'Borrando...' : 'Borrar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

