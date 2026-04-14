import React from 'react';

interface ClientDateProps {
  dateString: string;
  format?: 'date' | 'time' | 'datetime' | 'full' | 'short-date' | 'short-weekday';
  className?: string;
}

export default function ClientDate({ dateString, format = 'date', className = '' }: ClientDateProps) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  let result = '';
  const timeZone = 'Europe/Prague';

  switch (format) {
    case 'date':
      result = date.toLocaleDateString('cs-CZ', { timeZone });
      break;
    case 'time':
      result = date.toLocaleTimeString('cs-CZ', { timeZone, hour: '2-digit', minute: '2-digit' });
      break;
    case 'datetime':
      result = `${date.toLocaleDateString('cs-CZ', { timeZone })} ${date.toLocaleTimeString('cs-CZ', { timeZone, hour: '2-digit', minute: '2-digit' })}`;
      break;
    case 'full':
      result = date.toLocaleDateString('cs-CZ', {
        timeZone,
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        hour: '2-digit', 
        minute: '2-digit'
      });
      break;
    case 'short-date':
      result = date.toLocaleDateString('cs-CZ', { timeZone, day: 'numeric', month: 'numeric' });
      break;
    case 'short-weekday':
      result = date.toLocaleDateString('cs-CZ', { timeZone, weekday: 'short' }).toUpperCase();
      break;
    default:
      result = date.toLocaleDateString('cs-CZ', { timeZone });
  }

  return <span className={className} suppressHydrationWarning>{result}</span>;
}
