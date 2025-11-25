import React from 'react';
import { X, MapPin, Calendar, Tag, Hash, Package } from 'lucide-react';

export const ItemDetailsModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">

        {/* Header */}
        <div className="relative bg-brand-blue h-32 flex items-end p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div>
            <span className="inline-block px-3 py-1 mb-2 text-xs font-medium bg-white/20 text-white backdrop-blur-md rounded-full border border-white/10">
              ID: #{item.id}
            </span>
            <h2 className="text-2xl font-bold text-white">{item.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Status Badge */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Estado Actual</span>
              <span className="font-semibold text-gray-800 dark:text-white">{item.status}</span>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500 dark:text-gray-400">Cantidad</span>
              <p className="text-2xl font-bold text-brand-blue dark:text-brand-purple">{item.quantity}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <Tag size={16} />
                <span>Categoría</span>
              </div>
              <p className="font-medium text-gray-800 dark:text-white">{item.category}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <MapPin size={16} />
                <span>Ubicación</span>
              </div>
              <p className="font-medium text-gray-800 dark:text-white">{item.location || 'No especificada'}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <Calendar size={16} />
                <span>Última Actualización</span>
              </div>
              <p className="font-medium text-gray-800 dark:text-white">
                {new Date(item.updatedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <Hash size={16} />
                <span>Número de Serie</span>
              </div>
              <p className="font-medium text-gray-800 dark:text-white">
                {item.serialNumber || 'N/A'}
              </p>
            </div>

          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <Package size={16} />
              <span>Descripción</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
              {item.description || 'Sin descripción detallada disponible para este ítem.'}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
