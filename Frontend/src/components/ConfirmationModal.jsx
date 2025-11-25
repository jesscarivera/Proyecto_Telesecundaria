import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400">
            <AlertTriangle size={24} />
          </div>

          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            {title}
          </h3>

          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            {message}
          </p>

          <div className="flex gap-3 justify-center">
            <button 
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium text-sm"
            >
              Cancelar
            </button>

            <button 
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm shadow-lg shadow-red-500/30"
            >
              Sí, Eliminar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
