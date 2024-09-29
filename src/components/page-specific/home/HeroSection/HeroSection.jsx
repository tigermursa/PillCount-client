import { Poppins } from "@next/font/google";

// Load the Poppins font with specific weights
const poppins = Poppins({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});

const HeroSection = () => {
  return (
    <div className="relative h-screen bg-hero-bg bg-cover bg-center flex flex-col justify-center items-center text-center">
      {/* Reusable Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 px-4">
        {/* Main Heading */}
        <h1
          className={`${poppins.className} text-gray-100 text-5xl md:text-6xl lg:text-7xl mb-4 font-bold leading-tight`}
        >
          Manage Your Development Tasks with Ease
        </h1>
        {/* Subheading */}
        <p
          className={`${poppins.className} text-gray-200 text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl leading-relaxed`}
        >
          Unlock the full potential of your startup with our tailored services designed to guide you through every stage of growth.
        </p>
        {/* CTA Buttons */}
        <div className="flex space-x-4">
          <button className="bg-green-400 hover:bg-green-500 text-white py-3 px-8 rounded-full text-lg md:text-xl transition-all duration-300">
            Start Free Trial
          </button>
          <button className="bg-transparent border border-white text-white py-3 px-8 rounded-full text-lg md:text-xl hover:bg-white hover:text-black transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
