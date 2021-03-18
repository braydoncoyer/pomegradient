import { GetServerSideProps, NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/client'
import Image from 'next/image'

interface Props {
  launch: {
    mission: string
    site: string
    timestamp: number
    rocket: string
  }
}
const IndexPage: NextPage<Props> = ({ launch }) => {
  const [session] = useSession()
  const date = new Date(launch.timestamp)
  const handleSignin = (e) => {
    e.preventDefault()
    signIn('github')
  }
  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }
  return (
    <main className="bg-red-500">
      <h1 className="text-3xl">Next SpaceX Launch: {launch.mission}</h1>
      <p>
        {launch.rocket} will take off from {launch.site} on {date.toDateString()}
      </p>
      {session && (
        <a href="#" onClick={handleSignout} className="btn-signin">
          Sign out
        </a>
      )}
      {session && (
        <>
          {' '}
          <p style={{ marginBottom: '10px' }}>
            {' '}
            Welcome, {session.user.name ?? session.user.email}
          </p>{' '}
          <br />
          <Image
            className="rounded"
            src={session.user.image}
            alt="Picture of the author"
            width={40}
            height={40}
          />
        </>
      )}
      {!session && (
        <>
          <a href="#" onClick={handleSignin} className="text-2xl">
            Sign In with GitHub
          </a>
        </>
      )}
    </main>
  )
}
export default IndexPage

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetch('https://api.spacexdata.com/v3/launches/next')
  const nextLaunch = await response.json()
  return {
    props: {
      launch: {
        mission: nextLaunch.mission_name,
        site: nextLaunch.launch_site.site_name_long,
        timestamp: nextLaunch.launch_date_unix * 1000,
        rocket: nextLaunch.rocket.rocket_name,
      },
    },
  }
}
