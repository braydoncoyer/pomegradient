import { GetServerSideProps, NextPage } from 'next'
import AuthCheck from '../../components/AuthCheck'
import { GradientCardList } from '../../components/GradientCardList'
import { Layout } from '../../components/Layout'
import { getUserWithUsername, postToJSON } from '../../lib/firebase'

const UserPage: NextPage<any> = ({ user, gradients }) => {
  return (
    <AuthCheck>
      <Layout>
        <div className="flex flex-col justify-center items-center space-y-4 mb-8">
          <img className="w-24 h-24 rounded-full" src={user.photoURL} alt="profile" />
          <p className="text-2xl text-gray-900 font-semibold">{user.username}</p>
        </div>

        {gradients.length ? (
          <div>
            <div className="border-b pb-5 mb-7 border-gray-200 mb-8">
              <div className="sm:flex sm:items-baseline">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Gradients by {user.username}
                </h3>
              </div>
            </div>
            <GradientCardList gradients={gradients} />
          </div>
        ) : (
          <p>This user has no gradients created.</p>
        )}
      </Layout>
    </AuthCheck>
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
