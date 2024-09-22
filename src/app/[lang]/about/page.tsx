import Construction from '@/components/Construction';
import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import AboutMe from './components/AboutMe';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('about');
}
const AboutPage = () => {
  return <AboutMe />;
};

export default AboutPage;
