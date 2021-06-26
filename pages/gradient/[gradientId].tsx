import { NextPage } from 'next'
import GradientContent from '../../components/GradientContent'
import { Layout } from '../../components/Layout'
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Heart from '../../components/HeartButton'
import AuthCheck from '../../components/AuthCheck'
import Link from 'next/link'

const GradientDetailPage: NextPage = (props) => {
  const gradientRef = firestore.doc(props.path)
  const [realtimeGradient] = useDocumentData(gradientRef)

  const gradient = realtimeGradient || props.gradient

  return (
    <AuthCheck
      fallback={
        <Link href="/">
          <button>Sign up</button>
        </Link>
      }
    >
      <Layout>
        {JSON.stringify(gradient)}
        <GradientContent gradient={gradient} />
        <Heart gradientRef={gradientRef} />
      </Layout>
    </AuthCheck>
  )
  // return (
  //   <Layout>
  //     <div className="pb-8">
  //       <div className="w-full mx-auto px-6 md:px-0 ">
  //         <h1 className="sr-only">Page title</h1>
  //         <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
  //           <div className="grid grid-cols-1 gap-4 lg:col-span-2">
  //             <section aria-labelledby="section-1-title">
  //               <h2 className="sr-only" id="section-1-title">
  //                 Section title
  //               </h2>
  //               <div className="rounded-lg bg-white overflow-hidden shadow h-96">
  //                 <div className="p-6"></div>
  //               </div>
  //             </section>
  //           </div>

  //           <div className="grid grid-cols-1 gap-4">
  //             <section aria-labelledby="section-2-title">
  //               <h2 className="sr-only" id="section-2-title">
  //                 Section title
  //               </h2>
  //               <div className="rounded-lg bg-white overflow-hidden shadow h-96">
  //                 <div className="p-6"></div>
  //               </div>
  //             </section>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </Layout>
  // )
}

export default GradientDetailPage

export async function getStaticProps({ params }) {
  const { username, slug } = params
  const userDoc = await getUserWithUsername(username)

  let gradient
  let path

  if (userDoc) {
    const gradientRef = userDoc.ref.collection('gradients').doc(slug)
    gradient = postToJSON(await gradientRef.get())

    path = gradientRef.path
  }

  return {
    props: { gradient, path },
    revalidate: 10000,
  }
}

export async function getStaticPaths() {
  // Improve by using Admin SDK to select empty docs
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
