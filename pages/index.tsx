import { NextPage } from 'next'
import React from 'react'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { PersonalNewsletter } from '../components/PersonalNewsletter'
import Image from 'next/image'

const IndexPage: NextPage<any> = () => {
  return (
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
  )
}
export default IndexPage
