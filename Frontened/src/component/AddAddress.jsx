import React, { useEffect, useState } from 'react';
import addressLogo from '../assets/add_address_image-BNaKxJCQ.svg';
import { useAppContext } from '../content/AppContext';
import toast from 'react-hot-toast';

// Reusable InputField component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={address[name] || ''} // prevent uncontrolled to controlled warning
    onChange={handleChange}
    required
    className='w-full px-3 py-2.5 border border-gray-500/30 rounded outline-none text-gray-600 focus:border-primary transition'
  />
);

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
    const emptyFields = requiredFields.filter((field) => !address[field]);

    if (emptyFields.length > 0) {
      toast.error(`Please fill in all required fields.`);
      return;
    }
    if (!user||!user._id) {
      toast.error('User is not authenticated.');
      navigate('/cart');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post('/api/address/add', {
        userId: user._id,
        address,
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/cart');
      } else {
        toast.error(data.message || 'Address not added');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding address');
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/cart');
    }
  }, [user, navigate]);

  return (
    <div className='mt-16 pb-16 px-4 sm:px-6 lg:px-8'>
      <p className='text-2xl md:text-3xl text-gray-600'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>

      <div className='flex flex-col-reverse md:flex-row justify-between items-center mt-10 gap-10'>
        <div className='w-full md:max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-4 mt-6 text-sm w-full'>
            <div className='flex flex-col sm:flex-row gap-3'>
              <InputField handleChange={handleChange} address={address} name='firstName' type='text' placeholder='First Name' />
              <InputField handleChange={handleChange} address={address} name='lastName' type='text' placeholder='Last Name' />
            </div>

            <InputField handleChange={handleChange} address={address} name='email' type='email' placeholder='Email' />
            <InputField handleChange={handleChange} address={address} name='phone' type='text' placeholder='Phone' />
            <InputField handleChange={handleChange} address={address} name='street' type='text' placeholder='Street Address' />

            <div className='flex flex-col sm:flex-row gap-3'>
              <InputField handleChange={handleChange} address={address} name='city' type='text' placeholder='City' />
              <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder='State' />
            </div>

            <div className='flex flex-col sm:flex-row gap-3'>
              <InputField handleChange={handleChange} address={address} name='zipcode' type='text' placeholder='Zip Code' />
              <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder='Country' />
            </div>

            <button
              type='submit'
              className={`w-full py-3 bg-primary text-white font-semibold rounded transition ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'}`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Address'}
            </button>
          </form>
        </div>

        <img
          src={addressLogo}
          alt='address logo'
          className='w-full max-w-xs md:max-w-sm object-contain'
        />
      </div>
    </div>
  );
};

export default AddAddress;
