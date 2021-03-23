import { GetStaticProps, NextPage } from 'next'
import Gradient from '../models/Gradient'
import { Layout } from '../components/Layout'
import { GradientCardList } from '../components/GradientCardList'

const IndexPage: NextPage<any> = ({ gradients }) => {
  if (!gradients) {
    return (
      <div>
        <h2>No gradients to display...</h2>
      </div>
    )
  }

  return (
    <Layout>
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
