// components/Navbar.js
export default function Navbar() {
    return (
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <nav className="flex space-x-4">
            <a href="#" className="text-green-500 font-semibold">Home</a>
            <a href="#" className="text-gray-600">Blog</a>
            <a href="#" className="text-gray-600">FAQ</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-phone-alt text-white bg-blue-500 p-2 rounded-full"></i>
              <div>
                <span className="text-gray-500 text-sm">CALL US</span>
                <span className="text-gray-800 font-semibold">2334 5666 667</span>
              </div>
            </div>
            <a href="#" className="bg-green-500 text-white px-4 py-2 rounded-md">Contact us</a>
          </div>
        </div>
      </header>
    );
  }
  