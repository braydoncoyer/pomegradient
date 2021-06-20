import { NextPage } from 'next'
import React from 'react'
import { Hero } from '../components/Hero'

const IndexPage: NextPage<any> = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-10xl mx-auto">
        <p>Content here</p>
      </div>
    </div>
  )
}
export default IndexPage
