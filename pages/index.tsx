import { GetStaticProps, NextPage } from 'next'
import Gradient from '../models/Gradient'
import { Layout } from '../components/Layout'
import { GradientCard } from '../components/GradientCard'

const IndexPage: NextPage<any> = ({ gradients }) => {
  return (
    <Layout>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {gradients.map((item) => (
          <div key={item.key}>
            <GradientCard item={item} />
          </div>
        ))}
      </ul>
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
  ]

  return {
    props: {
      gradients: mockGradientData,
    },
  }
}
