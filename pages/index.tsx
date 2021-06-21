import { NextPage } from 'next'
import React from 'react'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { PersonalNewsletter } from '../components/PersonalNewsletter'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

const IndexPage: NextPage<any> = () => {
  return (
    <>
      <NextSeo
        title="Pomegradient"
        description="Find, save and craft gradients with a creative community!"
        canonical="https://www.pomegradient.com/"
        openGraph={{
          type: 'website',
          url: 'https://www.pomegradient.com',
          title: 'Pomegradient',
          description: 'Find, save and craft gradients with a creative community!',
          images: [
            {
              url: '/pomegradient_social_og.png',
              width: 1200,
              height: 627,
              alt: 'Og Image Alt',
            },
          ],
        }}
        twitter={{
          handle: '@pomeradient',
          site: 'https://www.pomegradient.com',
          cardType: 'summary_large_image',
        }}
      />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Hero />
          <Image width="1800px" height="500" src="/pomegradient_app.svg" alt="Pomegradient App" />
          <div className="max-w-10xl flex justify-center px-4">
            <PersonalNewsletter />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
export default IndexPage
