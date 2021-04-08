import { Layout } from '../../components/Layout'
import { NextPage } from 'next'

const GradientDetailPage: NextPage = () => {
  return (
    <Layout>
      <div className="pb-8">
        <div className="w-full mx-auto px-6 md:px-0 ">
          <h1 className="sr-only">Page title</h1>
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  Section title
                </h2>
                <div className="rounded-lg bg-white overflow-hidden shadow h-96">
                  <div className="p-6"></div>
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="section-2-title">
                <h2 className="sr-only" id="section-2-title">
                  Section title
                </h2>
                <div className="rounded-lg bg-white overflow-hidden shadow h-96">
                  <div className="p-6"></div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default GradientDetailPage
