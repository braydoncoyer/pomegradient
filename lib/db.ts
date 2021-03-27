import firebase from '../lib/firebase'

const firestore = firebase.firestore()

export function updateUser(uid: string, data: any) {
  return firestore.collection('users').doc(uid).update(data)
}

export function createUser(uid: string, data: any) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}
