import { GetServerSideProps, NextPage } from 'next'
import { Layout } from '../components/Layout'
import { GradientCardList } from '../components/GradientCardList'
import { Button } from '../components/Button'
import { PlusSmIcon } from '@heroicons/react/solid'

import { firestore, fromMillis, postToJSON } from '../lib/firebase'

import { useContext, useState } from 'react'
import Link from 'next/link'
import { UserContext } from '../lib/context'

// Max post to query per page
const LIMIT = 12

const IndexPage: NextPage<any> = (props) => {
  const [gradients, setGradients] = useState(props.gradients)
  const [loading, setLoading] = useState(false)
  const [gradientsEnd, setGradientsEnd] = useState(false)
  const { user } = useContext(UserContext)

  const getMoreGradients = async () => {
    setLoading(true)
    const last = gradients[gradients.length - 1]

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt

    const query = firestore
      .collectionGroup('gradients')
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT)

    const newGradients = (await query.get()).docs.map((doc) => doc.data())

    setGradients(gradients.concat(newGradients))
    setLoading(false)

    if (newGradients.length < LIMIT) {
      setGradientsEnd(true)
    }
  }

  if (!gradients) {
    return (
      <div>
        <h2>No gradients to display...</h2>
      </div>
    )
  }

  return (
    <Layout>
      <div className="pb-5 mb-8 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Gradients</h3>
        {user && (
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <Link href="/new">
              <a>
                <Button>New Gradient</Button>
              </a>
            </Link>
          </div>
        )}
      </div>
      <GradientCardList gradients={gradients} />

      {!loading && !gradientsEnd && (
        <div className="relative mt-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <button
              onClick={getMoreGradients}
              type="button"
              className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              <PlusSmIcon className="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Load More</span>
            </button>
          </div>
        </div>
      )}

      {/* {gradientsEnd && 'You have reached the end!'} */}
    </Layout>
  )
}
export default IndexPage

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const gradientsQuery = firestore
    .collectionGroup('gradients')
    .orderBy('createdAt', 'desc')
    .limit(12)

  const gradients = (await gradientsQuery.get()).docs.map(postToJSON)

  // const refs = gradients.map(async (doc) => {
  //   const userDoc = await getUserWithUsername(doc.username)
  //   if (userDoc) {
  //     return userDoc.ref.collection('gradients').doc(doc.slug)
  //   }
  // })

  // const gradientRefs = refs.get().docs.map(postToJSON)

  // console.log(gradientRefs)
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
