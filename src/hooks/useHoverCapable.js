import { useEffect, useState } from 'react';

// One definition of "has a real cursor", shared by the drawer's hover, blur and scroll lock.
const QUERY = '(hover: hover) and (pointer: fine)';

/**
 * True on devices with a mouse or trackpad, false on touch-only devices.
 * Follows the query live, so plugging in a mouse switches behaviour without a reload.
 */
export function useHoverCapable() {
  const [capable, setCapable] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const onChange = (event) => setCapable(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return capable;
}
