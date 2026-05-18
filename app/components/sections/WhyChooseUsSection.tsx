export default function WhyChooseUsSection() {
  const reasons = [
    {
      title: 'Business Discovery Sessions',
      description: 'We start by understanding your unique business challenges and goals'
    },
    {
      title: 'Tailored Solutions',
      description: 'Custom-built solutions designed specifically for your business needs'
    },
    {
      title: 'Security-Focused Delivery',
      description: 'Robust, secure, and scalable applications with enterprise-grade security'
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Why Choose Us
        </h2>

        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We don't just build solutions—we partner with you to drive real business value
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="border-2 border-blue-200 p-8 rounded-lg hover:border-blue-600 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4 text-blue-600">
                {index === 0 ? '🔍' : index === 1 ? '🎯' : '🔒'}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
