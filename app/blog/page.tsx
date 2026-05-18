import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Blog</h1>
            <p className="text-xl text-gray-600 mb-12">
              Insights, tips, and updates from our technology experts
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-2xl mb-2">☁️</div>
                <h3 className="text-lg font-semibold text-gray-900">Cloud</h3>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="text-lg font-semibold text-gray-900">AI</h3>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="text-lg font-semibold text-gray-900">DevOps</h3>
              </div>
            </div>

            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                New blogs are automatically published twice daily. Stay tuned for insights on cloud technology, AI innovations, and DevOps best practices.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
