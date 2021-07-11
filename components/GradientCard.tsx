import copy from 'copy-to-clipboard'
import Link from 'next/link'
import { toast } from 'react-toastify'

function GradientCard({ item }) {
  const handleCopyToClipBoard = () => {
    copy(`
    background: ${item.colors[0]};
    background: -webkit-linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]});  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `)

    toast('CSS copied!')
  }

  return (
    <li className="md:w-[234px] shadow-xl overflow-hidden h-[288px] rounded-lg flex flex-col hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-150">
      <div
        className="flex-1"
        style={{
          background: `linear-gradient(90deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`,
        }}
      ></div>
      <div className="h-[70px] p-[9px] bg-white">
        <div className="flex justify-between items-center">
          <Link href={`/${item.username}/${item.slug}`}>
            <a
              className={`text-lg font-extrabold leading-none`}
              style={{
                color: item.colors[0],
              }}
            >
              {item.name}
            </a>
          </Link>

          {/* <Link href={`/gradient/${item.name}`}>
            <a
              className={`text-lg font-extrabold leading-none`}
              style={{
                color: item.colors[0],
              }}
            >
              {item.name}
            </a>
          </Link> */}

          <button className="focus:outline-none" onClick={handleCopyToClipBoard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#9CA3AF] hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
        <Link href={`/${item.username}`}>
          <a className="font-medium text-[#9CA3AF] cursor-pointer">by {item.username}</a>
        </Link>
      </div>
    </li>
  )
}

export { GradientCard }
