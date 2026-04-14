'use client';

import { useEffect, useState } from 'react';

interface ClientDateProps {
  dateString: string;
  format?: 'date' | 'time' | 'datetime' | 'full' | 'short-date' | 'short-weekday';
  className?: string;
}

export default function ClientDate({ dateString, format = 'date', className = '' }: ClientDateProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return;

    let result = '';
    switch (format) {
      case 'date':
        result = date.toLocaleDateString('cs-CZ');
        break;
      case 'time':
        result = date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
        break;
      case 'datetime':
        result = `${date.toLocaleDateString('cs-CZ')} ${date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}`;
        break;
      case 'full':
        result = date.toLocaleDateString('cs-CZ', {
          weekday: 'long', 
          day: 'numeric', 
          month: 'long', 
          hour: '2-digit', 
          minute: '2-digit'
        });
        break;
      case 'short-date':
        result = date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' });
        break;
      case 'short-weekday':
        result = date.toLocaleDateString('cs-CZ', { weekday: 'short' }).toUpperCase();
        break;
      default:
        result = date.toLocaleDateString('cs-CZ');
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormattedDate(result);
  }, [dateString, format]);

  // Initial SSR fallback (prevents visual gap while hydrating)
  if (!formattedDate) {
    const serverDate = new Date(dateString);
    let serverFormat = '';
    if (!isNaN(serverDate.getTime())) {
      switch (format) {
        case 'date': serverFormat = serverDate.toLocaleDateString('cs-CZ'); break;
        case 'time': serverFormat = serverDate.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }); break;
        case 'datetime': serverFormat = `${serverDate.toLocaleDateString('cs-CZ')} ${serverDate.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}`; break;
        case 'full': serverFormat = serverDate.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }); break;
        case 'short-date': serverFormat = serverDate.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' }); break;
        case 'short-weekday': serverFormat = serverDate.toLocaleDateString('cs-CZ', { weekday: 'short' }).toUpperCase(); break;
      }
    }
    return <span className={className} suppressHydrationWarning>{serverFormat}</span>;
  }

  return <span className={className}>{formattedDate}</span>;
}
