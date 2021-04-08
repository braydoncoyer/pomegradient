/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Layout } from '../../components/Layout'
import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useAuth } from '../../lib/auth'
import { useRouter } from 'next/router'
import axios from 'axios'

const NewGradientPage: NextPage = () => {
  const { auth, loading } = useAuth()

  const router = useRouter()

  useEffect(() => {
    console.table(auth)
    if (!auth) {
      router.push('/')
    }
  }, [auth, loading])

  const [values, setValues] = useState({
    gradientName: '',
    color1: '',
    color2: '',
  })

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

  async function handleCreateGradient(): Promise<any> {
    const { gradientName, color1, color2 } = values
    await axios.post('/api/gradients', { gradientName, colors: [color1, color2] })
  }

  function canCreateGradient(): boolean {
    return false
  }

  return (
    <Layout>
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
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
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
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
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
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
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
                  <button
                    disabled={canCreateGradient()}
                    onClick={handleCreateGradient}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Gradient
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NewGradientPage
