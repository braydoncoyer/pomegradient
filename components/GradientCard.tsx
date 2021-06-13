import copy from 'copy-to-clipboard'
import Link from 'next/link'
import { useState } from 'react'
import { HeartIcon, InformationCircleIcon, ArrowNarrowRightIcon } from '@heroicons/react/outline'

function GradientCard({ item }) {
  // console.log('item', item)
  const handleCopyToClipBoard = () => {
    copy(`
    background: ${item.colors[0]};
    background: -webkit-linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]});  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `)
  }

  const [showDetails, setShowDetails] = useState(false)

  // const [userDoc, setUserDoc] = useState(null)
  // const [gradientRef, setGradientRef] = useState(null)

  // async function getGradientInformation() {
  //   setUserDoc(await getUserWithUsername(item.username))

  //   if (userDoc) {
  //     // console.log('here')
  //     setGradientRef(await userDoc.ref.collection('gradients').doc(item.slug))
  //   }
  // }
  // async function getGradientInformation() {
  //   console.log('here inside the thing')
  //   const userDoc = await getUserWithUsername(item.username)

  //   if (userDoc) {
  //     return await userDoc.ref.collection('gradients').doc(item.slug)
  //   }
  // }

  //

  // useEffect(() => {
  //   getGradientInformation()
  //   console.log('gradient ref single is', gradientRef)
  // }, [gradientRef])

  return (
    <li
      className="col-span-1 h-[332px] md:w-[265px] flex flex-col text-center rounded-2xl shadow divide-y divide-gray-200"
      style={{
        background: `linear-gradient(90deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`,
      }}
    >
      <div className="mt-auto">
        <div
          className={`bg-white rounded-2xl ${showDetails ? 'h-[161px]' : 'h-[83px]'}  w-full p-4`}
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-800 text-lg font-semibold">{item.name}</p>
            <button onClick={() => setShowDetails(!showDetails)}>
              <InformationCircleIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <Link href={`/${item.username}`}>
              <a className="text-md  cursor-pointer" rel="noreferrer">
                by {item.username}
              </a>
            </Link>
            <span className="flex items-center space-x-2">
              <p>{item.heartCount}</p>
              <HeartIcon className="w-5 h-5 text-gray-500" />
            </span>
          </div>
          {showDetails && (
            <div className="mt-4 space-y-4">
              {/* color palette */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex justify-between items-center space-x-2 text-gray-500">
                  <div
                    className="rounded-md h-7 w-7"
                    style={{
                      background: `${item.colors[0]}`,
                    }}
                  ></div>
                  <p>{item.colors[0]}</p>
                </div>
                <ArrowNarrowRightIcon className="h-5 w-5 text-gray-500" />
                <div className="flex justify-between items-center space-x-2 text-gray-500">
                  <p>{item.colors[1]}</p>
                  <div
                    className="rounded-md h-7 w-7"
                    style={{
                      background: `${item.colors[1]}`,
                    }}
                  ></div>
                </div>
              </div>

              {/* social share */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.31 18.25C14.7819 18.25 17.7744 13.4403 17.7744 9.26994C17.7744 9.03682 17.9396 8.83015 18.152 8.73398C18.8803 8.40413 19.8249 7.49943 18.8494 5.97828C18.2031 6.32576 17.6719 6.51562 16.9603 6.74448C15.834 5.47393 13.9495 5.41269 12.7514 6.60761C11.9785 7.37819 11.651 8.52686 11.8907 9.62304C9.49851 9.49618 7.27005 8.2975 5.75967 6.32575C4.97031 7.76816 5.37324 9.61305 6.68039 10.5399C6.20677 10.5249 5.74376 10.3892 5.33024 10.1449V10.1849C5.33024 11.6873 6.32871 12.981 7.71657 13.2784C7.27888 13.4053 6.81941 13.4241 6.37348 13.3328C6.76345 14.6184 7.87974 15.4989 9.15272 15.5245C8.09887 16.4026 6.79761 16.8795 5.45806 16.8782C5.22126 16.8776 4.98504 16.8626 4.75 16.8326C6.11076 17.7588 7.69359 18.25 9.31 18.2475V18.25Z"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <button>
                  <svg
                    className="w-6 h-6 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M12 14.25L12 4.75"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.75 10.75L12 14.25L15.25 10.75"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>

                <button onClick={handleCopyToClipBoard}>
                  <svg
                    className="w-6 h-6 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.75 10.75C8.75 9.64543 9.64543 8.75 10.75 8.75H17.25C18.3546 8.75 19.25 9.64543 19.25 10.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H10.75C9.64543 19.25 8.75 18.3546 8.75 17.25V10.75Z"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>

                {/* <DownloadIcon className="h-5 w-5 text-gray-500" /> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export { GradientCard }
