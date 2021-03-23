import { FooterComponent } from './Footer'

function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="py-10">
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
        <FooterComponent />
      </div>
    </>
  )
}

export { Layout }
