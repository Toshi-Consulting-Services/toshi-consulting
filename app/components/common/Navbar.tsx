import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur z-50 border-b border-gray-200">
      {/* Header with contact info */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-2 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="text-gray-700">📞 +91-9915718004</span>
            <span className="text-gray-700">⏰ Monday–Saturday, 9:00–18:00</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Toshi Consulting
        </Link>

        {/* Menu items */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">About</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">Services</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">Blog</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
        </div>

        {/* Get Quote button */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
          Get Quote
        </button>
      </div>
    </nav>
  );
}
