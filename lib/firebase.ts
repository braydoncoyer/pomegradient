import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDv92rgswyXlIbaiepYVxrDXfXgZ_QFn94',
  authDomain: 'pomegradient.firebaseapp.com',
  databaseURL: 'https://pomegradient-default-rtdb.firebaseio.com',
  projectId: 'pomegradient',
  storageBucket: 'pomegradient.appspot.com',
  messagingSenderId: '939388276514',
  appId: '1:939388276514:web:261e96c03c06d7c9269f7b',
  measurementId: 'G-BWLHQD4JRR',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Auth exports
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

// Firestore exports
export const firestore = firebase.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const fromMillis = firebase.firestore.Timestamp.fromMillis
export const increment = firebase.firestore.FieldValue.increment

// Storage exports
export const storage = firebase.storage()
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users')
  const query = usersRef.where('username', '==', username).limit(1)
  const userDoc = (await query.get()).docs[0]
  return userDoc
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data()
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  }
}

/**`
 * Gets a reference to a list of gradients passed in
 * @param  gradients
 */
export async function getGradientRefs(gradients) {
  const userDocs = gradients.map((doc) => {
    return getUserWithUsername(doc.username)
  })

  console.log('User Doc Array', userDocs)

  const gradientRefs = userDocs.map((user, index) => {
    return user.ref?.collection('gradients').doc(gradients[index].slug)
  })

  console.log('server refs', gradientRefs)

  return gradientRefs
}
