import { HeaderComponent } from './Header'
import Link from 'next/link'

function Hero() {
  return (
    <div className="w-full bg-gradient-to-r from-purple-700 to-pink-600 px-4 sm:px-6 lg:px-16">
      <HeaderComponent />
      <div className="max-w-7xl mx-auto pt-12 pb-16">
        <div className="lg:flex lg:justify-between lg:items-center my-12 space-y-6">
          <h1 className="text-left font-display text-white text-3xl leading-9 font-semibold sm:text-4xl sm:leading-10">
            {' '}
            Beautiful hand-crafted gradients,{' '}
            <span className="sm:block text-purple-300">curated by the community.</span>
          </h1>
          <div className="md:flex md:justify-center lg:justify-end md:items-center md:space-x-4 md:flex-1 md:space-y-0">
            <Link href="/new">
              <a className="w-full mb-6 md:mb-0 md:max-w-[200px] space-x-2 inline-flex items-center justify-center text-pink-600 hover:text-[#831843] font-medium bg-white rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-white border-opacity-10 transform hover:-translate-y-0.5 transition-all duration-150 md:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>

                <span>Add Gradient</span>
              </a>
            </Link>
            <a
              href="https://github.com/braydoncoyer/pomegradient/tree/main"
              target="_blank"
              rel="noreferrer"
            >
              <button
                type="button"
                className="w-full md:max-w-[200px] space-x-2 inline-flex items-center justify-center text-white font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-white border-opacity-10 transform hover:-translate-y-0.5 transition-all duration-150 md:flex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>

                <span>View on GitHub</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Hero }
