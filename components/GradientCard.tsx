import copy from 'copy-to-clipboard'
import Link from 'next/link'

function GradientCard({ item }) {
  const { author } = item

  const handleCopyToClipBoard = () => {
    copy(`
    background: ${item.colors[0]};
    background: -webkit-linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]});  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `)
  }

  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-4">
        <Link href={`/gradients/${item.gradientName.toLowerCase()}`}>
          <div
            className={`w-full h-80 md:h-64 flex-shrink-0 mx-auto rounded cursor-pointer`}
            style={{
              background: `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`,
            }}
          ></div>
        </Link>
        <div className="flex justify-between mt-6">
          <Link href={`/gradients/${item.gradientName.toLowerCase()}`}>
            <h3 className="cursor-pointer text-gray-900 text-md md:text-sm font-medium">
              {item.gradientName}
            </h3>
          </Link>
          <svg
            onClick={handleCopyToClipBoard}
            className="w-6 h-6 md:w-5 md:h-5 cursor-pointer text-gray-500 hover:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </div>
        <div className="flex justify-between mt-1">
          <a
            className="text-gray-500 text-md md:text-sm cursor-pointer"
            href={`https://github.com/${author.name.split(' ').join('')}`}
            target="_blank"
            rel="noreferrer"
          >
            by {author.name}
          </a>
          <svg
            className="w-6 h-6 md:w-5 md:h-5 cursor-pointer text-gray-500 hover:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
    </li>
  )
}

export { GradientCard }
