import { GetServerSideProps, NextPage } from 'next'
import { Layout } from '../components/Layout'
import { GradientCardList } from '../components/GradientCardList'

import { firestore, fromMillis, postToJSON } from '../lib/firebase'

import { useState } from 'react'

// Max post to query per page
const LIMIT = 1

const IndexPage: NextPage<any> = (props) => {
  const [gradients, setGradients] = useState(props.gradients)
  const [loading, setLoading] = useState(false)

  const [gradientsEnd, setGradientsEnd] = useState(false)

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
      <div className="flex items-center mb-6">
        <h2 className="flex-1 text-2xl font-bold leading-7  sm:text-3xl sm:truncate">Gradients</h2>
      </div>
      <GradientCardList gradients={gradients} />

      {!loading && !gradientsEnd && <button onClick={getMoreGradients}>Load more</button>}

      {gradientsEnd && 'You have reached the end!'}
    </Layout>
  )
}
export default IndexPage

export const getServerSideProps: GetServerSideProps<any> = async () => {
  const gradientsQuery = firestore
    .collectionGroup('gradients')
    .orderBy('createdAt', 'desc')
    .limit(20)

  const gradients = (await gradientsQuery.get()).docs.map(postToJSON)
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
