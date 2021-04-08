import { GetServerSideProps, NextPage } from 'next'
import { Layout } from '../components/Layout'
import { GradientCardList } from '../components/GradientCardList'
import { useEffect } from 'react'
import db from '../utils/db'

import { useState } from 'react'

const IndexPage: NextPage<any> = ({ gradients }) => {
  const [sortOptionOpen, setSortOptionOpen] = useState(false)
  const [sortValue, setSortValue] = useState('old')

  useEffect(() => {
    const sortGradients = () => {
      console.log('SORT')
    }

    sortGradients()
  }, [sortValue])

  if (!gradients) {
    return (
      <div>
        <h2>No gradients to display...</h2>
      </div>
    )
  }

  return (
    <Layout footer>
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
                <button
                  onClick={() => setSortValue('recent')}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Most recent
                </button>
                <button
                  onClick={() => setSortValue('old')}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Most popular
                </button>
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

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const id = 'WhbqNuTUCFVESCMSBdVg7z4KtXv1'
  const user = await db.collection('users').doc(id).get()
  const data = await db.collection('gradients').orderBy('createdAt', 'desc').get()
  const gradients = data.docs.map((item: any) => {
    return {
      id: item.id,
      author: user.data(),
      ...item.data(),
    }
  })

  // const mockGradientData: Gradient[] = [
  //   {
  //     id: 0,
  //     name: 'Slime',
  //     author: 'braydoncoyer',
  //     colors: ['#efd5ff', '#515ada'],
  //   },
  //   {
  //     id: 1,
  //     name: 'VioletBlue',
  //     author: 'braydoncoyer',
  //     colors: ['#4776E6', '#8E54E9'],
  //   },
  //   {
  //     id: 2,
  //     name: 'Grad 3',
  //     author: 'braydoncoyer',
  //     colors: ['#3F2B96', '#A8C0FF'],
  //   },
  //   {
  //     id: 3,
  //     name: 'Kale Salad',
  //     author: 'braydoncoyer',
  //     colors: ['#00C9FF', '#92FE9D'],
  //   },
  //   {
  //     id: 4,
  //     name: 'Dusty Cactus',
  //     author: 'braydoncoyer',
  //     colors: ['#fcff9e', '#c67700'],
  //   },
  //   {
  //     id: 5,
  //     name: 'Dusty Cactus',
  //     author: 'braydoncoyer',
  //     colors: ['#fcff9e', '#c67700'],
  //   },
  //   {
  //     id: 6,
  //     name: 'Pomegradient',
  //     author: 'braydoncoyer',
  //     colors: ['#F9974B', '#EF4171'],
  //   },
  //   {
  //     id: 7,
  //     name: 'Purple Dusk',
  //     author: 'braydoncoyer',
  //     colors: ['#737dfe', '#ffcac9'],
  //   },
  //   {
  //     id: 8,
  //     name: 'Lush Lime',
  //     author: 'braydoncoyer',
  //     colors: ['#d6ff7f', '#00b3cc'],
  //   },
  //   {
  //     id: 9,
  //     name: 'Morning Dawn',
  //     author: 'braydoncoyer',
  //     colors: ['#F3904F', '#3B4371'],
  //   },
  //   {
  //     id: 10,
  //     name: 'Honey Dew',
  //     author: 'braydoncoyer',
  //     colors: ['#43C6AC', '#F8FFAE'],
  //   },
  //   {
  //     id: 11,
  //     name: 'Purple Guava',
  //     author: 'braydoncoyer',
  //     colors: ['#43C6AC', '#9654e2'],
  //   },
  // ]

  return {
    props: {
      gradients,
    },
  }
}
