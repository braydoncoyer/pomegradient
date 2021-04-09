import { GetServerSideProps, NextPage } from 'next'
import AuthCheck from '../../components/AuthCheck'
import { GradientCardList } from '../../components/GradientCardList'
import { Layout } from '../../components/Layout'
import { getUserWithUsername, postToJSON } from '../../lib/firebase'
import { Fragment } from 'react'

const options = [
  { name: 'Most recent', selected: true },
  { name: 'Most popular', selected: false },
]

const UserPage: NextPage<any> = ({ user, gradients }) => {
  return (
    <Layout>
      <AuthCheck>
        <div className="flex flex-col justify-center items-center space-y-4 mb-8">
          <img className="w-24 h-24 rounded-full" src={user.photoURL} alt="profile" />
          <p className="text-2xl text-gray-900 font-semibold">{user.username}</p>
        </div>

        {gradients.length ? (
          <div>
            <div className="border-b border-gray-200 mb-8">
              <div className="sm:flex sm:items-baseline">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Gradients</h3>
                <div className="mt-4 sm:mt-0 sm:ml-10">
                  <nav className="-mb-px flex space-x-8">
                    {options.map((option) =>
                      option.selected ? (
                        <Fragment key={option.name}>
                          {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                          <a
                            href="#"
                            className="border-indigo-500 text-indigo-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                            aria-current="page"
                          >
                            {option.name}
                          </a>
                        </Fragment>
                      ) : (
                        <a
                          key={option.name}
                          href="#"
                          className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                        >
                          {option.name}
                        </a>
                      )
                    )}
                  </nav>
                </div>
              </div>
            </div>
            <GradientCardList gradients={gradients} />
          </div>
        ) : (
          <p>This user has no gradients created.</p>
        )}
      </AuthCheck>
    </Layout>
  )
}
export default UserPage

export const getServerSideProps: GetServerSideProps<any> = async ({ query }) => {
  const { username } = query

  const userDoc = await getUserWithUsername(username)

  let user = null
  let gradients = null

  if (userDoc) {
    user = userDoc.data()
    const gradientQuery = userDoc.ref.collection('gradients').orderBy('createdAt', 'desc')

    gradients = (await gradientQuery.get()).docs.map(postToJSON)
  }
  return {
    props: {
      user,
      gradients,
    },
  }
}
