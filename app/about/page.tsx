import Construction from '@/components/Construction';
import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('about');
}
const AboutPage = () => {
  return <Construction />;
};

export default AboutPage;
