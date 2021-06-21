import { NextPage } from 'next'
import React from 'react'
import { Hero } from '../components/Hero'
import { PersonalNewsletter } from '../components/PersonalNewsletter'

const IndexPage: NextPage<any> = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-10xl flex justify-center px-4">
        <PersonalNewsletter />
      </div>
    </div>
  )
}
export default IndexPage
