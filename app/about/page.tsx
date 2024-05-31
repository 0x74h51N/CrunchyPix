'use client'

import { motion } from 'framer-motion'
import { polygonIn } from '@/utils/motion'
import { useTranslation } from 'react-i18next'
import { CldImage } from 'next-cloudinary'
import Construction from '@/components/Construction'

const AboutPage = () => {
  const { t } = useTranslation('about')
  let descriptions = t('description', { returnObjects: true }) as string[]
  if (!Array.isArray(descriptions)) {
    descriptions = []
  }
  return (
    // <div className="flexCenter min-w-[100svw] min-h-[100svh] overflow-hidden">
    //   <motion.div
    //     initial="hidden"
    //     whileInView="show"
    //     viewport={{ once: true, amount: 'some' }}
    //     variants={polygonIn('screen', 'easeInOut', 0.7, 0.8)}
    //     className="flex flex-col items-center h-full w-full max-w-[1300px] min-h-[100svh] md:py-20 py-14 px-8"
    //   >
    //     <h1 className="h1 mb-6">{t('title')}</h1>
    //     <CldImage
    //       src="crunchypix/headColor.png"
    //       alt="Photo"
    //       quality={100}
    //       width={250}
    //       height={250}
    //       loading="lazy"
    //       className="object-center bg-opacity-0 grayscale w-auto max-lg:w-[230px] max-md:w-[200px] h-auto z-30"
    //     />
    //     <div className="flex flex-col p gap-3 px-10">
    //       {descriptions.map((description, index) => (
    //         <p key={index}>{description}</p>
    //       ))}
    //     </div>
    //   </motion.div>
    // </div>
    <Construction />
  )
}

export default AboutPage
