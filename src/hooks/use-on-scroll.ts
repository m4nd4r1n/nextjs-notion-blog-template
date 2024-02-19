import { useEffect } from 'react';

type UseOnScroll = (listener: (this: Window, ev: Event) => unknown) => void;

const useOnScroll: UseOnScroll = (listener) => {
  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, [listener]);
};

export default useOnScroll;
