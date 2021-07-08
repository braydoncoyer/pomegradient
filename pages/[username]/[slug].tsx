import { NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Heart from '../../components/HeartButton'
import AuthCheck from '../../components/AuthCheck'
import Link from 'next/link'
import Highlight, { defaultProps } from 'prism-react-renderer'
import React from 'react'
import { GradientCardList } from '../../components/GradientCardList'
import { HeaderComponent } from '../../components/Header'

const GradientPage: NextPage<any> = (props) => {
  const gradientRef = firestore.doc(props.path)
  const { moreGradients } = props
  const [realtimeGradient] = useDocumentData(gradientRef)

  const gradient = realtimeGradient || props.gradient

  const cssCode = `
    background: ${gradient.colors[0]};

    background: -webkit-linear-gradient(to right, ${gradient.colors[0]}, ${gradient.colors[1]});  /* Chrome 10-25, Safari 5.1-6 */
    
    background: linear-gradient(to right, ${gradient.colors[0]}, ${gradient.colors[1]}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `

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
        <HeaderComponent />

        <div className="grid grid-col-1 md:grid-cols-6 gap-2 md:gap-16">
          <div
            className="w-full md:col-span-2 h-80 md:h-96 rounded-xl"
            style={{
              background: `linear-gradient(90deg, ${gradient.colors[0]} 0%, ${gradient.colors[1]} 100%)`,
            }}
          ></div>
          <div className="md:col-span-4 content-start">
            <div className="md:flex md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl text-[#374151] font-extrabold">{gradient.name}</h1>
                <p className="text-base text-[#9CA3AF]">By {gradient.username}</p>
              </div>
              <div className="space-y-6 mt-6 md:space-x-4 md:space-y-0 md:flex md:justify-center md:items-center">
                <Heart gradientRef={gradientRef} heartCount={gradient.heartCount} />
                <button
                  type="button"
                  className="w-full md:max-w-[200px] space-x-2 inline-flex gradients-center justify-center text-[#374151] font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-[#D1D5DB] transform hover:-translate-y-0.5 transition-all duration-150 md:flex"
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
                  className="w-full md:max-w-[200px] space-x-2 inline-flex gradients-center justify-center text-[#374151] font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-[#D1D5DB] transform hover:-translate-y-0.5 transition-all duration-150 md:flex"
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
            <div className="mt-6">
              <ul className="flex justify-start space-x-6">
                <li className="w-36 h-48 shadow-xl overflow-hidden rounded-lg flex flex-col">
                  <div
                    className="flex-1"
                    style={{
                      background: `${gradient.colors[0]}`,
                    }}
                  ></div>
                  <div className="h-12 px-3 pt-1 bg-white">
                    <p className="text-sm text-[#374151] font-bold">{gradient.colors[0]}</p>
                    <p className="text-xs text-[#9CA3AF] uppercase">color stop 1</p>
                  </div>
                </li>
                <li className="w-36 h-48 shadow-xl overflow-hidden rounded-lg flex flex-col">
                  <div
                    className="flex-1"
                    style={{
                      background: `${gradient.colors[1]}`,
                    }}
                  ></div>
                  <div className="h-12 px-3 pt-1 bg-white">
                    <p className="text-sm text-[#374151] font-bold">{gradient.colors[1]}</p>
                    <p className="text-xs text-[#9CA3AF] uppercase">color stop 2</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <Highlight {...defaultProps} code={cssCode} language="css">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`${className} rounded-lg mt-6`} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key, index) => (
                          <span key="key" {...getTokenProps({ token, key, index })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
              {/* <SyntaxHighlighter language="css" style={docco} wrapLongLines>
              {cssCode}
            </SyntaxHighlighter> */}
            </div>
          </div>
        </div>
        <div className="space-y-6 mt-12">
          <h1 className="text-xl text-[#374151] font-extrabold">More by this creator</h1>
          <GradientCardList gradients={moreGradients} />
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
  let moreGradients

  if (userDoc) {
    const gradientRef = userDoc.ref.collection('gradients').doc(slug)
    gradient = postToJSON(await gradientRef.get())

    const gradientQuery = userDoc.ref.collection('gradients').orderBy('createdAt', 'desc')

    moreGradients = (await gradientQuery.get()).docs
      .map(postToJSON)
      .filter((x) => x.name !== gradient.name)
      .splice(0, 4)

    path = gradientRef.path
  }

  return {
    props: { gradient, path, moreGradients },
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
