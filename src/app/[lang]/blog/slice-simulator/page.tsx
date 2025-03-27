import { SliceZone } from '@prismicio/react';
import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from '@slicemachine/adapter-next/simulator';
import { redirect } from 'next/navigation';
import { components } from '../slices';

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams & { searchParams: { secret?: string } }) {
  if (
    process.env.SLICE_SIMULATOR_SECRET &&
    searchParams.secret !== process.env.SLICE_SIMULATOR_SECRET
  ) {
    redirect('/');
  }
  const { state } = await searchParams;
  const slices = getSlices(state);

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
