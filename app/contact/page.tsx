import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">Contact Us</h1>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Get in touch with us for any inquiries or to discuss your project requirements
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">📞 Phone</h3>
                    <p className="text-gray-700">+91-9915718004</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">✉️ Email</h3>
                    <p className="text-gray-700">hr@toshiconsulting.com</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">📍 Address</h3>
                    <p className="text-gray-700">
                      Plot 7, Twin Tower, Office 6<br/>
                      IT Park Panchkula<br/>
                      Haryana 134116, India
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">⏰ Business Hours</h3>
                    <p className="text-gray-700">Monday–Saturday, 9:00 AM–6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="Your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="Your message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
