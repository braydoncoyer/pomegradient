function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="py-10">
          <main>
            <div className="max-w-7xl mx-auto px-4 md:px-0">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}

export { Layout }
