import React from 'react'
import toast from 'react-hot-toast';

const Payment = () => {
  return (
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Payment Information</h2>
    <form onSubmit={(e)=>{e.preventDefault();
    toast.success("payment successfully");
    }
    }>
      <div class="mb-4">
        <label class="block text-gray-700 mb-1">Cardholder Name</label>
        <input type="text" placeholder="John Doe" class="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"  required/>
      </div>
  
      <div class="mb-4">
        <label class="block text-gray-700 mb-1">Card Number</label>
        <input type="text" placeholder="1234 5678 9012 3456" class="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"   required/>
      </div>
  
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          <label class="block text-gray-700 mb-1">Expiry Date</label>
          <input type="text" placeholder="MM/YY" class="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"  required/>
        </div>
        <div class="flex-1">
          <label class="block text-gray-700 mb-1">CVV</label>
          <input type="password" placeholder="•••" class="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-200"  required/>
        </div>
      </div>
  
      <button type="submit" class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-200">
        Pay Now
      </button>
    </form>
  </div>
  
  )
}

export default Payment;