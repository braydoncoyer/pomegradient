import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import Image from 'next/image'

function PersonalNewsletter() {
  const { register, handleSubmit } = useForm()
  const [subscribeStatus, setSubscribeStatus] = useState(null)
  const [formErrorMessage, setFormErrorMessage] = useState(null)

  const handlePersonalSubmit = (data) => {
    console.log('submit')
  }

  return (
    <div className="max-w-2xl">
      <div className="space-y-3">
        <p className="text-base text-[#374151]">
          Join my newsletter to hear about new projects, content and articles that I publish.
        </p>
        <form onSubmit={handleSubmit(handlePersonalSubmit)} className="block md:flex">
          <div className="flex-1">
            <label htmlFor="personal_email" className="sr-only">
              Email address
            </label>
            <input
              {...register('email')}
              id="personal_email"
              type="email"
              className="block w-full border border-[#D1D5DB] rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-3 group">
            <button
              type="submit"
              className="w-full space-x-2 items-center justify-center text-white font-medium bg-gradient-to-r from-purple-700 to-pink-600 rounded-lg shadow-sm group-hover:shadow-lg py-3 px-5 border border-white border-opacity-10 transform group-hover:-translate-y-0.5 transition-all duration-150 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>

              <span>Subscribe</span>
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 flex justify-start items-center">
        {/* <Image src={braydonProfilePic} alt="Braydon Coyer" /> */}
        <p className="text-base text-[#374151]">
          <span className="font-bold block">Hey there,</span> I’m Braydon - a full-stack developer,
          blogger and the creator of this web app.{' '}
          <span className="md:block">
            I love all things related to front-end development and love connecting with individuals.
          </span>
        </p>
      </div>
    </div>
  )
}

export { PersonalNewsletter }
