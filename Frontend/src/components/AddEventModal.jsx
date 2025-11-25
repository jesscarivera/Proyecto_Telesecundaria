import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

export const AddEventModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '08:00',
    location: 'Dirección',
    type: 'Academic'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      title: form.title,
      date: form.date,
      time: `${form.time} hrs`,
      location: form.location,
      type: form.type
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="relative bg-brand-blue p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg text-white">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Agendar Evento</h3>
              <p className="text-blue-100 text-xs">Nuevo evento en calendario</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título del Evento
            </label>
            <input 
              required
              placeholder="Ej. Consejo Técnico"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* Fecha y hora */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha
              </label>
              <input 
                type="date"
                required
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hora
              </label>
              <input 
                type="time"
                required
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lugar / Ubicación
            </label>
            <input 
              required
              placeholder="Ej. Aula de Medios"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          {/* Botón */}
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-900 shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02]"
            >
              Guardar en Agenda
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
