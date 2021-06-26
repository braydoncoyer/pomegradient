import { NextPage } from 'next'
import GradientContent from '../../components/GradientContent'
import { Layout } from '../../components/Layout'
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Heart from '../../components/HeartButton'
import AuthCheck from '../../components/AuthCheck'
import Link from 'next/link'

const GradientPage: NextPage<any> = (props) => {
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
        {/* {JSON.stringify(gradient)} */}

        {/* <GradientContent gradient={gradient} /> */}
        {/* <Heart gradientRef={gradientRef} /> */}

        <div className="md:flex md:space-x-12">
          <div
            className="w-full h-64 rounded-xl"
            style={{
              background: `linear-gradient(90deg, ${gradient.colors[0]} 0%, ${gradient.colors[1]} 100%)`,
            }}
          ></div>
          <div className="mt-6">
            <h1 className="text-3xl text-[#374151] font-extrabold">{gradient.name}</h1>
            <p className="text-base text-[#9CA3AF]">By {gradient.username}</p>
            <div className="space-y-6 mt-6">
              <Heart gradientRef={gradientRef} heartCount={gradient.heartCount} />
              <button
                type="button"
                className="w-full md:max-w-[200px] space-x-2 inline-flex items-center justify-center text-[#374151] font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-[#D1D5DB] transform hover:-translate-y-0.5 transition-all duration-150 md:flex"
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>

                <span>Copy</span>
              </button>
              <button
                type="button"
                className="w-full md:max-w-[200px] space-x-2 inline-flex items-center justify-center text-[#374151] font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-[#D1D5DB] transform hover:-translate-y-0.5 transition-all duration-150 md:flex"
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>

                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </AuthCheck>
  )
}
export default GradientPage

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
