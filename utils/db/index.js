import admin from 'firebase-admin'
import serviceAccount from './serviceAccountKey.json'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import firebase from 'firebase/app'

export const auth = firebase.auth();
export const firestore = firebase.firestore();

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://pomegradient-default-rtdb.firebaseio.com',
    })
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack)
  }
}
export default admin.firestore()



