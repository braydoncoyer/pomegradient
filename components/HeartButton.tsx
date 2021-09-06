import { firestore, auth, increment } from '../lib/firebase'
import { useDocument } from 'react-firebase-hooks/firestore'

// Allows user to heart or like a gradient
export default function Heart({ gradientRef, heartCount }) {
  // Listen to heart document for currently logged in user
  const heartRef = gradientRef.collection('hearts').doc(auth.currentUser.uid)
  const [heartDoc] = useDocument(heartRef)

  // Create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser.uid
    const batch = firestore.batch()

    batch.update(gradientRef, { heartCount: increment(1) })
    batch.set(heartRef, { uid })

    await batch.commit()
  }

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = firestore.batch()

    batch.update(gradientRef, { heartCount: increment(-1) })
    batch.delete(heartRef)

    await batch.commit()
  }

  return heartDoc?.exists ? (
    <button
      className="w-full focus:outline-none md:max-w-[200px] space-x-2 inline-flex items-center justify-center text-[#374151] font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-[#D1D5DB] transform hover:-translate-y-0.5 transition-all duration-150 md:flex"
      onClick={removeHeart}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
      <span>{heartCount}</span>
    </button>
  ) : (
    <button
      className="w-full focus:outline-none md:max-w-[200px] space-x-2 inline-flex items-center justify-center text-[#374151] font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-[#D1D5DB] transform hover:-translate-y-0.5 transition-all duration-150 md:flex"
      onClick={addHeart}
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
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{heartCount}</span>
    </button>
  )
}
