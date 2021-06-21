import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import Image from 'next/image'

function PersonalNewsletter() {
  const { register, handleSubmit } = useForm()
  const [subscribeStatus, setSubscribeStatus] = useState(null)
  const [formErrorMessage, setFormErrorMessage] = useState(null)

  const handlePersonalSubmit = (data) => {
    axios
      .post('/api/braydoncoyer/newsletter', { data })
      .then(() => setSubscribeStatus('success'))
      .catch((err) => {
        const { error } = err.response.data
        setSubscribeStatus('failed')
        setFormErrorMessage(error)
      })
  }

  return (
    <div className="max-w-2xl">
      <div className="space-y-3">
        <p className="text-base md:text-lg text-[#374151]">
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
        {subscribeStatus && subscribeStatus === 'success' ? (
          <div className="mt-2 text-base text-emerald-500 flex space-x-2">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Success! You are on the mailing list!</span>
          </div>
        ) : subscribeStatus === 'failed' ? (
          <div className="mt-2 text-base text-pink-500 flex space-x-2">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formErrorMessage}</span>
          </div>
        ) : null}
      </div>

      <div className="flex mt-10">
        <div className="mr-4 flex-shrink-0 self-center">
          <Image
            className="rounded-full"
            width="80"
            height="80"
            src="/avatar.jpg"
            alt="Braydon Coyer"
          />
        </div>
        <div>
          <p className="text-base text-[#374151]">
            <span className="font-bold block">
              Hey there,{' '}
              <span role="img" aria-label="wave">
                👋
              </span>
            </span>{' '}
            I’m Braydon - a full-stack developer, blogger and the creator of this web app.{' '}
            <span className="hidden md:block">
              I love all things related to front-end development and love connecting with
              individuals.
            </span>
          </p>
          <a
            className="text-[#CF4BAD] underline italics hover:text-pink-700"
            href="https://braydoncoyer.dev/"
            target="_blank"
            rel="noreferrer"
          >
            Learn more about me
          </a>
        </div>
      </div>
    </div>
  )
}

export { PersonalNewsletter }
