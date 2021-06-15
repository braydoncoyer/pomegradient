/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Layout } from '../components/Layout'
import { NextPage } from 'next'
import { useContext, useState } from 'react'
import AuthCheck from '../components/AuthCheck'
import { useRouter } from 'next/dist/client/router'
import { UserContext } from '../lib/context'

import kebabCase from 'lodash.kebabcase'
import { auth, firestore, serverTimestamp } from '../lib/firebase'
import { Button } from '../components/Button'
import { determineIsProfane } from '../lib/badWords'
import { toast } from 'react-toastify'

const NewGradientPage: NextPage = () => {
  const router = useRouter()
  const { username } = useContext(UserContext)

  const [values, setValues] = useState({
    gradientName: '',
    color1: '',
    color2: '',
  })

  const slug = encodeURI(kebabCase(values.gradientName))

  const isValid =
    values.gradientName.length >= 3 &&
    values.gradientName.length < 100 &&
    values.color1.length !== 0 &&
    values.color2.length !== 0

  function handleGradientNameInputChange(event): void {
    event.persist()
    setValues((values) => ({
      ...values,
      gradientName: event.target.value,
    }))
  }

  function handleColor1InputChange(event): void {
    event.persist()
    setValues((values) => ({
      ...values,
      color1: event.target.value,
    }))
  }

  function handleColor2InputChange(event): void {
    event.persist()
    setValues((values) => ({
      ...values,
      color2: event.target.value,
    }))
  }

  // Create a new post in firestore
  const createGradient = async (e) => {
    e.preventDefault()
    const uid = auth.currentUser.uid
    const ref = firestore.collection('users').doc(uid).collection('gradients').doc(slug)

    // Tip: give all fields a default value here
    const data = {
      name: values.gradientName,
      colors: [values.color1, values.color2],
      slug,
      uid,
      username,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    }

    const isDirtyContent =
      determineIsProfane(values.gradientName) ||
      determineIsProfane(values.color1) ||
      determineIsProfane(values.color1)

    if (!isDirtyContent) {
      await ref.set(data)
      toast('Gradient created!')

      // Imperative navigation after doc is set
      router.push(`/`)
    } else {
      toast.error('Please avoid using swear words.')
    }
  }

  return (
    <Layout>
      <AuthCheck>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">New Gradient</h3>
              <p className="mt-1 text-sm text-gray-600">
                Please supply the following information to create a new gradient.
              </p>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="shadow rounded-md overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="gradient_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Gradient Name
                        </label>
                        <input
                          type="text"
                          name="gradient_name"
                          id="gradient_name"
                          className="focus:ring-orange-400 focus:border-orange-400 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                          placeholder="Grassy Green"
                          value={values.gradientName}
                          onChange={handleGradientNameInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="hex1" className="block text-sm font-medium text-gray-700">
                          Hex Value 1
                        </label>
                        <input
                          type="text"
                          name="hex1"
                          id="hex1"
                          className="focus:ring-orange-400 focus:border-orange-400 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                          placeholder="#000000"
                          value={values.color1}
                          onChange={handleColor1InputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="hex1" className="block text-sm font-medium text-gray-700">
                          Hex Value 2
                        </label>
                        <input
                          type="text"
                          name="hex2"
                          id="hex2"
                          className="focus:ring-orange-400 focus:border-orange-400 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                          placeholder="#000000"
                          value={values.color2}
                          onChange={handleColor2InputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preview</label>
                      <div
                        className="mt-1 flex justify-center px-6 pt-24 pb-6 b rounded-md"
                        style={{
                          background: `linear-gradient(135deg, ${values.color1} 0%, ${values.color2} 100%)`,
                        }}
                      >
                        {values.color1.length === 6 && values.color2.length == 6 ? (
                          <p>Preview of Gradient goes here</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <Button handleButtonClick={createGradient} isDisabled={!isValid}>
                      Create Gradient
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AuthCheck>
    </Layout>
  )
}

export default NewGradientPage
