import { HeaderComponent } from './Header'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'

function Hero() {
  const { register, handleSubmit } = useForm()
  const [subscribeStatus, setSubscribeStatus] = useState(null)
  const [formErrorMessage, setFormErrorMessage] = useState(null)
  const { data } = useSWR('/api/pomegradient/subscribers', fetcher)
  const subscriberCount = new Number(data?.count)

  const pomegradientOnSubmit = (data) => {
    axios
      .post('/api/pomegradient/newsletter', { data })
      .then(() => setSubscribeStatus('success'))
      .catch((err) => {
        const { error } = err.response.data
        setSubscribeStatus('failed')
        setFormErrorMessage(error)
      })
  }

  return (
    <div className="w-full bg-gradient-to-r from-purple-700 to-pink-600 px-4 sm:px-6 lg:px-16">
      <HeaderComponent />
      <div className="max-w-10xl mx-auto pt-12 pb-16">
        <h1 className="text-left font-display text-white text-3xl leading-9 font-semibold sm:text-4xl sm:leading-10">
          {' '}
          Beautiful hand-crafted gradients,{' '}
          <span className="sm:block text-purple-300">curated by the community.</span>
        </h1>
        <form onSubmit={handleSubmit(pomegradientOnSubmit)} className="mt-6 sm:max-w-lg sm:flex">
          <div className="min-w-0 flex-1">
            <label htmlFor="cta_email" className="sr-only">
              Email address
            </label>
            <input
              {...register('email')}
              id="cta_email"
              type="email"
              className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-3 group">
            <button
              type="submit"
              className="w-full space-x-2 inline-flex items-center justify-center text-white font-medium bg-white bg-opacity-20 group-hover:bg-opacity-30 rounded-lg shadow-sm group-hover:shadow-lg py-3 px-5 border border-white border-opacity-10 transform group-hover:-translate-y-0.5 transition-all duration-150 md:flex"
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>

              <span>Notify me</span>
            </button>
          </div>
        </form>
        {subscribeStatus && subscribeStatus === 'success' ? (
          <div className="mt-2 text-base text-emerald-300 flex space-x-2">
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
          <div className="mt-2 text-base text-pink-300 flex space-x-2">
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
        <p className="mt-2 text-base text-[#D1D5DB]">
          Join {`${subscriberCount > 0 ? subscriberCount.toLocaleString() : '-'}`} others and be
          notified when Pomegradient goes live!{' '}
          <span className="block leading-4">No spam - promise!</span>
        </p>
      </div>
    </div>
  )
}

export { Hero }
