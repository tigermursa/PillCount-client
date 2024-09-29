const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Plugin UI</h2>
            <p className="text-gray-400">
              Plugin UI is your go-to solution <br></br> for building efficient
              and beautiful user interfaces.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Useful Links</h3>
            <ul>
              <li className="mb-2">
                <a href="/" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="/docs" className="hover:text-gray-300">
                  Documentation
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              Email:{" "}
              <a
                href="mailto:support@pluginui.com"
                className="hover:text-gray-300"
              >
                support@pluginui.com
              </a>
            </p>
            <p className="text-gray-400">
              Phone:{" "}
              <a href="tel:+123456789" className="hover:text-gray-300">
                +123-456-789
              </a>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Plugin UI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
