export default function MetricsSection() {
  const metrics = [
    { number: '100%', label: 'Delivery Commitment' },
    { number: '99%', label: 'Project Success Rate' },
    { number: '24/7', label: 'Round-the-Clock Support' },
    { number: '10+', label: 'Years of Expertise' },
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-center hover:shadow-lg transition"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {metric.number}
              </div>
              <p className="text-gray-700 font-semibold">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
