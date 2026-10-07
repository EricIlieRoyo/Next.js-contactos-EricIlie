'use client';

import { useState } from 'react';
import ContactoCard, { Contacto } from '@/components/ContactoCard';
import ContactFormModal from '@/components/ContactFormModal';

interface ContactosManagerProps {
  contactos: Contacto[];
  currentUserId?: number;
  isAuthenticated: boolean;
}

export default function ContactosManager({ contactos, currentUserId, isAuthenticated }: ContactosManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContacto, setEditingContacto] = useState<Contacto | null>(null);

  const handleCreateClick = () => {
    setEditingContacto(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (contacto: Contacto) => {
    setEditingContacto(contacto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContacto(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Directorio de Contactos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {isAuthenticated
              ? 'Gestiona tus contactos almacenados de forma rápida y sencilla.'
              : 'Inicia sesión para crear, editar o eliminar contactos de la agenda.'}
          </p>
        </div>

        {isAuthenticated && (
          <button
            onClick={handleCreateClick}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Crear nuevo contacto
          </button>
        )}
      </div>

      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/60 dark:to-slate-800/30 border border-blue-100 dark:border-slate-700/60 rounded-2xl p-8 mb-8 text-center shadow-sm">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              ¡Bienvenido a la Gestión de Contactos!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Para agregar tus propios contactos o realizar modificaciones en la base de datos, por favor inicia sesión o crea una cuenta gratuita.
            </p>
            <div className="flex justify-center gap-3">
              <a
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                Iniciar Sesión
              </a>
              <a
                href="/register"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                Registrarse
              </a>
            </div>
          </div>
        </div>
      )}

      {contactos.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            📋
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            No hay contactos guardados actualmente.
          </p>
          {isAuthenticated && (
            <button
              onClick={handleCreateClick}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm inline-block"
            >
              + Añadir el primer contacto
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {contactos.map((contacto) => (
            <ContactoCard
              key={contacto.id}
              contacto={contacto}
              currentUserId={currentUserId}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      )}

      <ContactFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={editingContacto}
      />
    </div>
  );
}
