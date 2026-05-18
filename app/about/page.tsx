import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About Toshi Consulting</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To provide reliable end-to-end support and solutions by ensuring seamless operations and customer satisfaction. We are committed to delivering quality applications, accelerating efficiency, and building trust-based relationships with our clients.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To become a trusted global technology partner empowering businesses with innovative, scalable, and future-ready digital solutions. We aim to be the go-to technology partner for organizations seeking excellence and transformation.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-12 rounded-lg mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">10+ Years of Expertise</h2>
              <p className="text-center text-gray-700 text-lg">
                With over a decade of experience, we have successfully delivered innovative technology solutions to clients across various industries. Our deep expertise and commitment to excellence drive every project we undertake.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                <p className="text-gray-700">Delivery Commitment</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
                <p className="text-gray-700">Project Success Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <p className="text-gray-700">Round-the-Clock Support</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
