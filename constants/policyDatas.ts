import { Policy } from '@/app/common.types'

interface PolicyPagesProps {
  _id: string
  image?: string
  policyData: Policy[]
}

export const policiesPages: PolicyPagesProps[] = [
  {
    _id: 'Cookie-Policy',
    image: '/policy/cookie.png',
    policyData: [
      {
        description: 'cookiePolicy.0.description',
      },
      {
        title: 'cookiePolicy.1.title',
        description: 'cookiePolicy.1.description',
      },
      {
        title: 'cookiePolicy.2.title',
        description: 'cookiePolicy.2.description',
      },
      {
        title: 'cookiePolicy.3.title',
        description: 'cookiePolicy.3.description',
        subTitles: [
          {
            title: 'cookiePolicy.3.subTitles.0.title',
            description: 'cookiePolicy.3.subTitles.0.description',
          },
          {
            title: 'cookiePolicy.3.subTitles.1.title',
            description: 'cookiePolicy.3.subTitles.1.description',
          },
        ],
      },
      {
        title: 'cookiePolicy.4.title',
        description: 'cookiePolicy.4.description',
      },
      {
        title: 'cookiePolicy.5.title',
        description: 'cookiePolicy.5.description',
      },
      {
        title: 'cookiePolicy.6.title',
        description: 'cookiePolicy.6.description',
      },
    ],
  },
  {
    _id: 'Terms-Of-Privacy',
    policyData: [
      {
        description: 'privacyPolicy.0.description',
      },
      {
        title: 'privacyPolicy.1.title',
        description: 'privacyPolicy.1.description',
      },
      {
        title: 'privacyPolicy.2.title',
        description: 'privacyPolicy.2.description',
      },
      {
        title: 'privacyPolicy.3.title',
        description: 'privacyPolicy.3.description',
      },
      {
        title: 'privacyPolicy.4.title',
        description: 'privacyPolicy.4.description',
      },
      {
        title: 'privacyPolicy.5.title',
        description: 'privacyPolicy.5.description',
      },
      {
        title: 'privacyPolicy.6.title',
        description: 'privacyPolicy.6.description',
      },
      {
        title: 'privacyPolicy.7.title',
        description: 'privacyPolicy.7.description',
      },
      {
        title: 'privacyPolicy.8.title',
        description: 'privacyPolicy.8.description',
      },
    ],
  },
  {
    _id: 'gdpr',
    policyData: [
      {
        mainTitle: 'kvkk.0.mainTitle',
      },
      {
        title: 'kvkk.1.title',
        description: 'kvkk.1.description',
      },
      {
        title: 'kvkk.2.title',
        description: 'kvkk.2.description',
      },
      {
        title: 'kvkk.3.title',
        description: 'kvkk.3.description',
        subTitles: [
          {
            description: 'kvkk.3.subTitles.0.description',
          },
          {
            description: 'kvkk.3.subTitles.1.description',
          },
        ],
      },
      {
        title: 'kvkk.4.title',
        description: 'kvkk.4.description',
      },
      {
        title: 'kvkk.5.title',
        description: 'kvkk.5.description',
      },
      {
        title: 'kvkk.6.title',
        description: 'kvkk.6.description',
      },
      {
        title: 'kvkk.7.title',
        description: 'kvkk.7.description',
      },
      {
        title: 'kvkk.8.title',
        description: 'kvkk.8.description',
      },
      {
        title: 'kvkk.9.title',
        description: 'kvkk.9.description',
      },
    ],
  },
]
