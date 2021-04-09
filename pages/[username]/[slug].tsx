import { NextPage } from 'next'
import GradientContent from '../../components/GradientContent'
import { Layout } from '../../components/Layout'
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'

const GradientPage: NextPage<any> = (props) => {
  const gradientRef = firestore.doc(props.path)
  const [realtimeGradient] = useDocumentData(gradientRef)

  const gradient = realtimeGradient || props.gradient
  return (
    <Layout>
      {JSON.stringify(gradient)}
      <GradientContent gradient={gradient} />
    </Layout>
  )
}
export default GradientPage

export async function getStaticProps({ params }) {
  const { username, slug } = params
  const userDoc = await getUserWithUsername(username)

  let gradient
  let path

  if (userDoc) {
    const postRef = userDoc.ref.collection('gradients').doc(slug)
    gradient = postToJSON(await postRef.get())

    path = postRef.path
  }

  return {
    props: { gradient, path },
    revalidate: 10000,
  }
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('gradients').get()

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data()
    return {
      params: { username, slug },
    }
  })

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  }
}
