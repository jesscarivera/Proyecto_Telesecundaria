import React from 'react';
import { X, User, Hash, Calendar, ShieldCheck, Cake } from 'lucide-react';

export const StudentDetailsModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="relative bg-brand-purple h-32 flex items-end p-6">
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
           >
             <X size={20} />
           </button>

           <div className="flex items-end gap-4">
             <div className="w-20 h-20 bg-white rounded-full border-4 border-white dark:border-gray-800 shadow-md flex items-center justify-center text-brand-purple">
                <User size={40} />
             </div>

             <div className="mb-1">
               <h2 className="text-xl font-bold text-white leading-tight">{student.name}</h2>
               <p className="text-purple-200 text-sm font-medium">Grupo {student.group}</p>
             </div>
           </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 mt-2">
          
          {/* Status Badge */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
             <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">Estado del Alumno</span>
                <span className={`font-bold ${student.status === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>
                  {student.status}
                </span>
             </div>

             <div className="text-right">
                <span className="text-sm text-gray-500 dark:text-gray-400">ID Sistema</span>
                <p className="text-lg font-bold text-gray-800 dark:text-white">#{student.id}</p>
             </div>
          </div>

          {/* Details */}
          <div className="space-y-4">

             <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Hash size={20}/></div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Matrícula</p>
                    <p className="font-medium text-gray-800 dark:text-white">{student.matricula}</p>
                </div>
             </div>

             <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><ShieldCheck size={20}/></div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Tutor / Padre de Familia</p>
                    <p className="font-medium text-gray-800 dark:text-white">{student.guardian}</p>
                </div>
             </div>

             <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Cake size={20}/></div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Edad</p>
                    <p className="font-medium text-gray-800 dark:text-white">{student.age} años</p>
                </div>
             </div>

             <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Calendar size={20}/></div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fecha de Ingreso</p>
                    <p className="font-medium text-gray-800 dark:text-white">{student.enrollmentDate}</p>
                </div>
             </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
