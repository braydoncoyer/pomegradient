import { firestore, auth, increment } from '../lib/firebase'
import { useDocument } from 'react-firebase-hooks/firestore'

// Allows user to heart or like a gradient
export default function Heart({ gradientRef }) {
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
    <button onClick={removeHeart}>
      <span role="img" aria-label="unheart gradient">
        💔
      </span>{' '}
      Unheart
    </button>
  ) : (
    <button onClick={addHeart}>
      <span role="img" aria-label="heart gradient">
        💗
      </span>{' '}
      Heart
    </button>
  )
}
