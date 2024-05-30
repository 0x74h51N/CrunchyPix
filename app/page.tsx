import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/Loading'
import { sectionsData } from '@/constants/sections'

const Section = dynamic(() => import('@/components/Section'), {
  ssr: false,
  loading: () => (
    <div className="absolute top-0 left-0 w-full min-h-full overflow-hidden z-50 bg-black">
      <LoadingComponent />
    </div>
  ),
})

const Home = () => {
  return (
    <>
      <div>
        <Section sectionsData={sectionsData}></Section>
      </div>
    </>
  )
}

export default Home
