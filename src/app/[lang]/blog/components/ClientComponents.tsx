'use client';
import FsLoading from '@/components/Loading/FsLoading';
import dynamic from 'next/dynamic';

export const Slide = dynamic(() => import('../components/Slide'), {
  ssr: false,
  loading: () => <FsLoading />,
});
export const Toc = dynamic(() => import('../components/ui/ToC'), {
  ssr: false,
  loading: () => <FsLoading />,
});
export const Menu = dynamic(() => import('../components/ui/Menu'), {
  ssr: false,
});
