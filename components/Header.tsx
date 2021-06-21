import { auth, googleAuthProvider } from '../lib/firebase'
import { useContext } from 'react'
import { UserContext } from '../lib/context'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function HeaderComponent() {
  const { user, username } = useContext(UserContext)
  return (
    // <div className="max-w-7xl mx-auto py-6 flex items-center text-sm leading-5 border-b border-white border-opacity-20">
    //   <div className="flex items-center flex-start">
    //     <p className="text-xl leading-8 font-bold text-[#D8B4FE]">Pomegradient</p>
    //     <div className="ml-2 flex justify-center items-center text-xs text-white font-semibold w-28 h-6 bg-white bg-opacity-30 rounded-md uppercase">
    //       coming soon!
    //     </div>
    //   </div>
    //   {user ? null : <SignInButton />}
    // </div>
    <Disclosure as="nav" className="bg-transparent">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <p className="text-xl leading-8 font-bold text-[#D8B4FE]">Pomegradient</p>
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  {/* Desktop Profile dropdown */}
                  {user ? (
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-transparent flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-500 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user.photoURL}
                                alt="User"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    <Link href={`/${username}`}>
                                      <button className="w-full text-left">Your Profile</button>
                                    </Link>
                                  </div>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => auth.signOut()}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'w-full text-left block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Sign out
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  ) : (
                    <SignInButton />
                  )}
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <a
                href="#"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-10 transform transition-all duration-150 text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Explore
              </a>
            </div>
            {user ? (
              <div className="pt-4 pb-3 border-t border-white border-opacity-50">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.photoURL} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user.displayName}</div>
                    <div className="text-sm font-medium text-gray-300">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link href={`/${username}`}>
                    <a className="bg-white bg-opacity-0 hover:bg-opacity-30 block px-3 py-2 rounded-md text-base font-medium text-white border border-white border-opacity-20 transform transition-all duration-150">
                      Your Profile
                    </a>
                  </Link>

                  <button
                    onClick={() => auth.signOut()}
                    className="w-full text-left bg-white bg-opacity-0 hover:bg-opacity-30 block px-3 py-2 rounded-md text-base font-medium text-white  border border-white border-opacity-20 transform transition-all duration-150"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <SignInButton />
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }

  return (
    <button
      onClick={signInWithGoogle}
      type="button"
      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <img className="-ml-1 mr-3 h-5 w-5" src="/google_logo.png" alt="google" />
      Sign in with Google
    </button>
  )
}

export { HeaderComponent }
