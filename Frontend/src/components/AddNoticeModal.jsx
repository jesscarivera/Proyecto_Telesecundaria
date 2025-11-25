import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';

export const AddNoticeModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    type: 'General',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toLocaleDateString('es-MX', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });

    // Creamos el objeto para guardar
    onSave({
      title: form.title,
      type: form.type,
      content: form.content,
      date: today
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="relative bg-brand-red p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg text-white">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Nuevo Aviso</h3>
              <p className="text-red-100 text-xs">Publicar comunicado oficial</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título del Aviso
            </label>
            <input 
              required
              placeholder="Ej. Suspensión de Clases"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-red outline-none transition-all"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de Comunicado
            </label>
            <select 
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-red outline-none transition-all"
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
            >
              <option value="General">General</option>
              <option value="Urgente">Urgente</option>
              <option value="Info">Informativo</option>
              <option value="Reunión">Reunión</option>
            </select>
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contenido / Mensaje
            </label>
            <textarea 
              required
              rows={4}
              placeholder="Escribe los detalles del aviso aquí..."
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-red outline-none transition-all resize-none"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
            />
          </div>

          {/* Botón */}
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full py-3 bg-brand-red text-white rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all transform hover:scale-[1.02]"
            >
              Publicar Aviso
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
