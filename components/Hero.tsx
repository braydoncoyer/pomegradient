import { HeaderComponent } from './Header'
import { SignupForm } from './Signup'

function Hero() {
  return (
    <div className="w-full bg-gradient-to-r from-purple-700 to-pink-600 px-4 sm:px-6 lg:px-16">
      <div className="max-w-10xl mx-auto">
        <HeaderComponent />
        <div className="mt-12">
          <div>
            <h1 className="text-center md:text-left font-display text-white text-3xl leading-9 font-semibold sm:text-4xl sm:leading-10">
              {' '}
              Beautiful hand-crafted gradients,{' '}
              <span className="sm:block text-purple-300">curated by the community.</span>
            </h1>
          </div>
          <div className="w-full md:max-w-2xl">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Hero }
