import { GetStaticProps, NextPage } from 'next'
import Gradient from '../models/Gradient'
import { Layout } from '../components/Layout'
import { GradientCardList } from '../components/GradientCardList'
import { useState } from 'react'
import { useSession, signIn } from 'next-auth/client'

const IndexPage: NextPage<any> = ({ gradients }) => {
  const [session] = useSession()
  const [sortOptionOpen, setSortOptionOpen] = useState(false)
  // const [sortValue, setSortValue] = useState('recent')

  if (!gradients) {
    return (
      <div>
        <h2>No gradients to display...</h2>
      </div>
    )
  }

  return (
    <Layout footer>
      {!session && (
        <div className="relative mb-12 ">
          <div className="mx-auto w-full">
            <div className="relative rounded-2xl px-6 py-10 bg-gradient-to-r from-[#737dfe] to-[#ffcac9] overflow-hidden shadow-xl sm:px-12 ">
              <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                <svg
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 1463 360"
                >
                  <path
                    className="text-purple-400 text-opacity-40"
                    fill="currentColor"
                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                  />
                  <path
                    className="text-purple-600 text-opacity-40"
                    fill="currentColor"
                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                  />
                </svg>
              </div>
              <div className="relative">
                <div className="sm:text-center">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                    Sign in to create gradients
                  </h2>
                  <p className="mt-3 md:mt-6 mx-auto max-w-2xl text-lg text-purple-100">
                    Discover gradients. Share gradients. Love gradients.
                  </p>
                </div>
                <div className="flex items-center mt-3 md:mt-6">
                  <button
                    onClick={() => signIn('github')}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in with GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center mb-6">
        <h2 className="flex-1 text-2xl font-bold leading-7  sm:text-3xl sm:truncate">Gradients</h2>
        <div className="relative">
          <button
            onClick={() => setSortOptionOpen(!sortOptionOpen)}
            type="button"
            className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="sort-menu"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
            </svg>
            Sort
            <svg
              className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {sortOptionOpen && (
            <div
              className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="sort-menu"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Most recent
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Most popular
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <GradientCardList gradients={gradients} />
      {/* <div className="h-96 bg-gradient-to-tr from-[#009CFF] via-[#E348A4] to-[#FC6F63]"></div> */}
    </Layout>
  )
}
export default IndexPage

export const getStaticProps: GetStaticProps<any> = async () => {
  const mockGradientData: Gradient[] = [
    {
      id: 0,
      name: 'Slime',
      author: 'braydoncoyer',
      colors: ['#efd5ff', '#515ada'],
    },
    {
      id: 1,
      name: 'VioletBlue',
      author: 'braydoncoyer',
      colors: ['#4776E6', '#8E54E9'],
    },
    {
      id: 2,
      name: 'Grad 3',
      author: 'braydoncoyer',
      colors: ['#3F2B96', '#A8C0FF'],
    },
    {
      id: 3,
      name: 'Kale Salad',
      author: 'braydoncoyer',
      colors: ['#00C9FF', '#92FE9D'],
    },
    {
      id: 4,
      name: 'Dusty Cactus',
      author: 'braydoncoyer',
      colors: ['#fcff9e', '#c67700'],
    },
    {
      id: 5,
      name: 'Dusty Cactus',
      author: 'braydoncoyer',
      colors: ['#fcff9e', '#c67700'],
    },
    {
      id: 6,
      name: 'Pomegradient',
      author: 'braydoncoyer',
      colors: ['#F9974B', '#EF4171'],
    },
    {
      id: 7,
      name: 'Purple Dusk',
      author: 'braydoncoyer',
      colors: ['#737dfe', '#ffcac9'],
    },
    {
      id: 8,
      name: 'Lush Lime',
      author: 'braydoncoyer',
      colors: ['#d6ff7f', '#00b3cc'],
    },
    {
      id: 9,
      name: 'Pomegradient',
      author: 'braydoncoyer',
      colors: ['#F9974B', '#EF4171'],
    },
    {
      id: 10,
      name: 'Purple Dusk',
      author: 'braydoncoyer',
      colors: ['#737dfe', '#ffcac9'],
    },
    {
      id: 11,
      name: 'Lush Lime',
      author: 'braydoncoyer',
      colors: ['#d6ff7f', '#00b3cc'],
    },
  ]

  return {
    props: {
      gradients: mockGradientData,
    },
  }
}
