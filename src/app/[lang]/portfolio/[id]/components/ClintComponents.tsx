'use client';
import FsLoading from '@/components/Loading/FsLoading';
import dynamic from 'next/dynamic';

export const OtherProjects = dynamic(
  () => import('./OtherProjects/OtherProjects'),
  { ssr: false, loading: () => <FsLoading /> },
);
