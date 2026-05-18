import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-12">
        <article className="max-w-4xl mx-auto px-6">
          {/* Blog Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Securing Your IT Infrastructure: A Comprehensive Cybersecurity Guide
            </h1>
            <div className="flex gap-6 text-gray-600 text-sm">
              <span>📅 May 18, 2026</span>
              <span>⏱️ 8 min read</span>
              <span>✍️ By Toshi Consulting</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-12 flex items-center justify-center text-white text-3xl">
            🔒 Cybersecurity
          </div>

          {/* Meta Description Box */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded">
            <p className="text-lg text-gray-700 font-semibold">
              Learn essential cybersecurity practices to protect your business from evolving threats and vulnerabilities.
            </p>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              In today's digital landscape, cybersecurity is not just an IT concern—it's a critical business priority. Organizations of all sizes face increasing threats from cyberattacks, data breaches, and security vulnerabilities.
            </p>

            {/* Highlighted Tip */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8 rounded">
              <h4 className="font-semibold text-gray-900 mb-2">💡 Key Insight</h4>
              <p className="text-gray-700">
                According to recent studies, 60% of data breaches are caused by unpatched vulnerabilities. Keeping systems updated is one of the most effective security measures.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Best Practices for Cybersecurity</h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. Strong Password Management</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Implement strong, unique passwords and use password managers to securely store credentials. Multi-factor authentication adds an extra layer of protection.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. Regular System Updates</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Keep all systems, software, and firmware updated. Security patches address known vulnerabilities and should be applied promptly.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. Employee Training</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Human error is a leading cause of security breaches. Regular training on phishing awareness and security protocols is essential.
            </p>

            {/* Highlighted Warning */}
            <div className="bg-red-50 border-l-4 border-red-400 p-6 my-8 rounded">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ Important</h4>
              <p className="text-gray-700">
                Never share credentials via email or messaging platforms. Always use secure, encrypted communication channels for sensitive information.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">FAQ: Common Cybersecurity Questions</h2>

            <div className="space-y-6 my-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Q: How often should we conduct security audits?</h4>
                <p className="text-gray-700">
                  A: Organizations should conduct security audits at least quarterly, with additional audits after any significant system changes or potential incidents.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Q: What is the difference between encryption and hashing?</h4>
                <p className="text-gray-700">
                  A: Encryption is reversible and allows data to be decrypted with a key. Hashing is one-way and creates a fixed-size digest of data, used primarily for verification.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Q: How can we prepare for a potential breach?</h4>
                <p className="text-gray-700">
                  A: Develop an incident response plan, conduct regular backups, implement monitoring systems, and test your response procedures regularly.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Q: What role does cloud security play?</h4>
                <p className="text-gray-700">
                  A: Cloud security requires managing access controls, encryption, and compliance. Work with providers that offer robust security features.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Cybersecurity is an ongoing process that requires vigilance, planning, and continuous improvement. By implementing these best practices and staying informed about emerging threats, your organization can significantly reduce its risk profile.
            </p>
          </div>

          {/* Related Services */}
          <div className="bg-blue-50 p-8 rounded-lg mb-12 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Professional Help?</h3>
            <p className="text-gray-700 mb-4">
              Toshi Consulting specializes in comprehensive cybersecurity solutions tailored to your organization's needs.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              Get a Cybersecurity Consultation
            </button>
          </div>

          {/* Related Blogs */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 p-4 rounded-lg hover:shadow-lg transition">
                <div className="bg-gradient-to-br from-green-400 to-green-600 h-32 rounded mb-4"></div>
                <h4 className="font-semibold text-gray-900 mb-2">Cloud Security Best Practices</h4>
                <p className="text-gray-600 text-sm">Secure your cloud infrastructure effectively</p>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg hover:shadow-lg transition">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 h-32 rounded mb-4"></div>
                <h4 className="font-semibold text-gray-900 mb-2">AI in Security Operations</h4>
                <p className="text-gray-600 text-sm">Leverage AI for threat detection</p>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg hover:shadow-lg transition">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 h-32 rounded mb-4"></div>
                <h4 className="font-semibold text-gray-900 mb-2">DevOps Security Integration</h4>
                <p className="text-gray-600 text-sm">Implement security in your CI/CD pipeline</p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
