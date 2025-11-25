import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarWidget = ({ events, small = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const hasEvent = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    const dateStr = `${year}-${month}-${d}`;
    
    return events.filter(e => e.date === dateStr);
  };

  const renderDays = () => {
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-14"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = hasEvent(i);
      const today = isToday(i);

      days.push(
        <div 
          key={i} 
          className={`relative h-10 md:h-24 border-t border-l border-gray-100 dark:border-gray-700 flex flex-col items-start justify-start p-1 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${small ? 'md:h-12' : ''}`}
        >
          <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
            today ? 'bg-brand-red text-white shadow-md' : 'text-gray-700 dark:text-gray-300'
          }`}>
            {i}
          </span>

          <div className="flex flex-wrap gap-1 mt-1 w-full">
            {dayEvents.map((ev, idx) =>
              small ? (
                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-brand-blue mx-auto" title={ev.title}></div>
              ) : (
                <div key={idx} className="w-full text-[10px] truncate px-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hidden md:block">
                  {ev.title}
                </div>
              )
            )}

            {!small && dayEvents.length > 0 && (
              <div className="md:hidden flex gap-1 ml-1">
                {dayEvents.map((_, idx) => (
                  <div key={idx} className="w-1 h-1 bg-brand-blue rounded-full"></div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      
      <div className="p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white capitalize">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
        {dayNames.map((day) => (
          <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 bg-white dark:bg-gray-800">
        {renderDays()}
      </div>
    </div>
  );
};
