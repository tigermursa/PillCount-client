import Link from "next/link";
import { HomeOutlined, LockOutlined, MessageOutlined } from "@ant-design/icons";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Error 404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, We Misplaced That Page
      </p>
      <p className="text-sm text-gray-500 mb-10">
        Our digital librarian seems to have misplaced the page you requested.
        Stay with us, and we&apos;ll help you rediscover it.
      </p>
      <p className="text-md text-gray-500 mb-6">
        Here, instead, you&apos;ll find some useful links:
      </p>

      {/* Links */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        {/* Home Page */}
        <Link href="/" passHref>
          <p className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition">
            <HomeOutlined className="text-3xl text-black mb-2" />
            <span className="text-sm font-semibold text-gray-800">
              Home Page
            </span>
          </p>
        </Link>

        {/* Products */}
        <Link href="/products" passHref>
          <p className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition">
            <LockOutlined className="text-3xl text-black mb-2" />
            <span className="text-sm font-semibold text-gray-800">
              Products
            </span>
          </p>
        </Link>

        {/* Contact Us */}
        <Link href="/contact" passHref>
          <p className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition">
            <MessageOutlined className="text-3xl text-black mb-2" />
            <span className="text-sm font-semibold text-gray-800">
              Contact Us
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
