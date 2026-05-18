export default function AboutSection() {
  const pillars = [
    {
      title: 'Quality Applications',
      description: 'Delivering robust, secure, and intuitive applications'
    },
    {
      title: 'Accelerating Efficiency',
      description: 'Streamlining operations and improving business processes'
    },
    {
      title: 'Building Trust',
      description: 'Establishing trust-based relationships with clients'
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          About Us
        </h2>

        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Provide reliable end-to-end support and solutions by ensuring seamless operations and customer satisfaction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                {pillar.title}
              </h3>
              <p className="text-gray-600">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
