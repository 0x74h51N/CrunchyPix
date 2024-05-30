import { ProjectInfoType } from '@/app/common.types'
import LogoImage from '@/components/LogoImage'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

const ProjectInfo = ({ ProjectInfo }: { ProjectInfo: ProjectInfoType }) => {
  const { t } = useTranslation('portfolio')

  if (ProjectInfo)
    return (
      <div className="relative flex lg:h-[570px] md:w-[400px] sm:w-[350px] md:h-[480px] sm:h-[450px] h-[440px] w-[300px] rounded-xl bg-log-col md:ml-6 ml-0">
        <Image
          src="/projectInfo.png"
          alt="project info background"
          width={1200}
          height={1200}
          quality={100}
          loading="lazy"
          className="z-0 h-full object-cover rounded-xl"
        />
        <div className="absolute flex flex-col lg:gap-6 md:gap-4 sm:gap-4 gap-6 w-full h-full justify-start lg:p-[3.9rem] md:p-11 p-10">
          <div>
            <h4 className="h4 cool">{t('portfolioItemComp.category')}</h4>
            <h3 className="h3 cool">{t(ProjectInfo.category)}</h3>
          </div>
          <div>
            <h4 className="h4 cool">{t('portfolioItemComp.client')}</h4>
            <h3 className="h3 cool">{t(ProjectInfo.client)}</h3>
          </div>
          <div>
            <h4 className="h4 cool">{t('portfolioItemComp.location')}</h4>
            <h3 className="h3 cool">{t(ProjectInfo.location)}</h3>
          </div>
          <div>
            <h4 className="h4 cool">{t('portfolioItemComp.date')}</h4>
            <h3 className="h3 cool">{t(ProjectInfo.date)}</h3>
          </div>
          <div>
            <h3 className="p cool">{t('portfolioItemComp.tech')}</h3>
            {ProjectInfo.tech && (
              <div className="absolute left-0 lg:bottom-12 md:bottom-8 sm:bottom-12 bottom-8 flex flex-row justify-between p-2 lg:px-[4.2rem] md:px-12 px-10 bg-slate-300 bg-opacity-50 w-full ">
                {ProjectInfo.tech.map((tech: string, index: number) => (
                  <div
                    key={index}
                    className="relative md:w-10 md:h-10 w-7 h-7 grayscale"
                  >
                    <LogoImage logoKey={tech} index={index} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  else return null
}

export default ProjectInfo
