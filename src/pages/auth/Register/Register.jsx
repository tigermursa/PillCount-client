import React from 'react';

const Register = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side image */}
      <div
        className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://deih43ym53wif.cloudfront.net/museum-island-boat-spree-river-tv-tower-berlin-germany-shutterstock_380924152_c5da34906d.jpeg')",
        }}
      >
        {/* Optionally, you can add some content or text on the image */}
      </div>

      {/* Right side registration form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-0">
        <div className="w-full max-w-md p-6 md:p-8 space-y-4 bg-white rounded-md shadow-lg">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <form className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your company name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your location"
              />
            </div>

            {/* Register Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Register
              </button>
            </div>
          </form>

          <div className="text-center">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
