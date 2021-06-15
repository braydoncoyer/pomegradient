function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="py-10">
          <main>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}

export { Layout }
