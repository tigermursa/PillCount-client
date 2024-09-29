import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side image */}
      <div
        className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://deih43ym53wif.cloudfront.net/museum-island-boat-spree-river-tv-tower-berlin-germany-shutterstock_380924152_c5da34906d.jpeg')" }}
      >
        {/* Optional content on the image */}
      </div>

      {/* Right side login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-0">
        <div className="w-full max-w-md p-6 md:p-8 space-y-4 bg-white rounded-md shadow-lg">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center">
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="text-center">
            <p>
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
