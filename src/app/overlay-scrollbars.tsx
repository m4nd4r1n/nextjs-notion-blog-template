'use client';

import { useEffect } from 'react';

import { useOverlayScrollbars } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

const OverlayScrollbars = () => {
  const [initBodyOverlayScrollbars] = useOverlayScrollbars({
    defer: true,
  });

  useEffect(() => {
    initBodyOverlayScrollbars(document.body);
  }, [initBodyOverlayScrollbars]);

  return null;
};

export default OverlayScrollbars;
