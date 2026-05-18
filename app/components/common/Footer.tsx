export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-2">Toshi Consulting</h3>
            <p className="text-gray-400">Technology solutions partner committed to helping businesses improve efficiency and innovate with confidence.</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Services</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">📞 +91-9915718004</p>
            <p className="text-gray-400 mb-2">✉️ hr@toshiconsulting.com</p>
            <p className="text-gray-400">⏰ Monday–Saturday, 9:00–18:00</p>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <p className="text-gray-400">Plot 7, Twin Tower, Office 6<br/>IT Park Panchkula<br/>Haryana 134116</p>
          </div>
        </div>

        {/* Social links */}
        <div className="border-t border-gray-700 pt-8 flex justify-between items-center">
          <p className="text-gray-400">&copy; 2026 Toshi Consulting. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
