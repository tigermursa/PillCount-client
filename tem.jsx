'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Lottie from 'react-lottie';
import axios from 'axios'; // Import Axios
import lottieFile from '../../../Assets/lottie/stuff_reg&login.json';

const staffData = [
  {
    staff_id: 1,
    name: 'Michael Johnson',
    image: 'https://rafs.gr/wp-content/uploads/2022/03/829459_man_512x512.png',
  },
  {
    staff_id: 2,
    name: 'Sarah Williams',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqmLEM7M9WzpqFLYb7GhrP76gpZ4gFK1mdvJL2MGMDJBhxTD8tEB9fLoHaMN87fxYQbJs&usqp=CAU',
  },
  {
    staff_id: 3,
    name: 'David Smith',
    image: 'https://rafs.gr/wp-content/uploads/2022/03/829459_man_512x512.png',
  },
  {
    staff_id: 4,
    name: 'Jessica Brown',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqmLEM7M9WzpqFLYb7GhrP76gpZ4gFK1mdvJL2MGMDJBhxTD8tEB9fLoHaMN87fxYQbJs&usqp=CAU',
  },
  {
    staff_id: 5,
    name: 'Daniel Garcia',
    image: 'https://rafs.gr/wp-content/uploads/2022/03/829459_man_512x512.png',
  },
];

const StaffRegister = () => {
  const [selectedStaff, setSelectedStaff] = useState({
    name: '',
    image: '',
    staff_id: null, // Include staff_id in the state
  });
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to handle password visibility
  const [loading, setLoading] = useState(false); // For loading state

  // Lottie animation configuration
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieFile,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle staff selection
  const handleSelect = staff => {
    setSelectedStaff(staff);
    setIsOpen(false);
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); // Set loading state

    const postData = {
      username: selectedStaff.name,
      password: password,
      staff_id: selectedStaff.staff_id,
    };

    try {
      const response = await axios.post(
        'https://appointment.abroadportals.com/api/v1/create-staff-account/',
        postData
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating staff account:', error.response || error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      {/* Left Side: Lottie Animation */}
      <div className='flex justify-center items-center'>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>

      {/* Right Side: Staff Registration Form */}
      <div className='w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg'>
        <h2 className='text-2xl font-bold text-gray-800 text-center'>
          Staff Registration
        </h2>
        <form className='space-y-4' onSubmit={handleSubmit}>
          {/* Custom Dropdown to select staff */}
          <div className='relative'>
            <label
              htmlFor='staff'
              className='block text-gray-700 font-semibold'
            >
              Select Staff:
            </label>
            <div
              className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-md bg-white cursor-pointer'
              onClick={toggleDropdown}
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              {selectedStaff.name ? (
                <div className='flex items-center'>
                  <Image
                    src={selectedStaff.image}
                    alt={selectedStaff.name}
                    width={24}
                    height={24}
                    className='w-6 h-6 rounded-full mr-2'
                  />
                  <span>{selectedStaff.name}</span>
                </div>
              ) : (
                <span>Select a staff</span>
              )}
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className='absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10'>
                {staffData.map((staff, index) => (
                  <div
                    key={index}
                    className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => handleSelect(staff)}
                  >
                    <Image
                      src={staff.image}
                      alt={staff.name}
                      width={24}
                      height={24}
                      className='w-6 h-6 rounded-full mr-2'
                    />
                    <span>{staff.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Name Input Field */}
          <div>
            <label htmlFor='name' className='block text-gray-700 font-semibold'>
              Username
            </label>
            <input
              id='name'
              type='text'
              className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Enter your name'
              value={selectedStaff.name} // Auto-fills the selected staff name
              onChange={e =>
                setSelectedStaff(prev => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          {/* Password Input Field */}
          <div className='relative'>
            <label
              htmlFor='password'
              className='block text-gray-700 font-semibold'
            >
              Password:
            </label>
            <div className='flex items-center border border-gray-300 rounded-md px-3 py-2 relative'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Your Password'
                className='w-full border-none focus:outline-none'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-3 focus:outline-none'
              >
                {showPassword ? (
                  <FaEyeSlash className='text-gray-400' />
                ) : (
                  <FaEye className='text-gray-400' />
                )}
              </button>
            </div>
          </div>

          <button
            type='submit'
            className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors'
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffRegister;
