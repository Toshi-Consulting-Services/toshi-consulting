import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';

const services = [
  {
    title: 'Blockchain Solutions',
    description: 'Enterprise blockchain development for secure, transparent, and scalable systems.',
    icon: '⛓️',
  },
  {
    title: 'Artificial Intelligence',
    description: 'AI-powered solutions to automate processes and drive intelligent business decisions.',
    icon: '🤖',
  },
  {
    title: 'DevOps',
    description: 'Streamlined deployment pipelines and infrastructure automation for faster delivery.',
    icon: '🚀',
  },
  {
    title: 'Cloud Services',
    description: 'Secure, scalable cloud infrastructure tailored to your business needs.',
    icon: '☁️',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">Our Services</h1>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Comprehensive technology solutions designed to transform your business
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg hover:shadow-lg transition"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {service.description}
                  </p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700">
                    Learn More →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
