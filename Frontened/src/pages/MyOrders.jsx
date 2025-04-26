import React, { useEffect, useState } from 'react';
import { useAppContext } from '../content/AppContext';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get(`/api/order/user/${user._id}`);
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    if (user) fetchMyOrders();
  }, [user]);

  return (
    <div className='mt-16 pb-20 px-4 md:px-10 '>
      <div className='mb-10'>
        <h1 className="text-3xl font-semibold text-gray-800">My Orders</h1>
        <div className='w-20 h-1 bg-primary mt-1 rounded-full'></div>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={order._id || index}
          className='bg-white border border-gray-200 rounded-xl shadow-sm mb-10 p-5 space-y-5'
        >
          {/* Order Summary */}
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gray-600'>
            <span><span className='font-medium'>Order ID:</span> {order._id}</span>
            <span><span className='font-medium'>Payment:</span> {order.paymentType}</span>
            <span><span className='font-medium'>Status:</span> <span className={`font-semibold ${order.status === "Delivered" ? "text-green-600" : order.status === "Processing" ? "text-yellow-600" : "text-red-500"}`}>{order.status}</span></span>
            <span><span className='font-medium'>Total:</span> ₹{order.amount}</span>
            <span><span className='font-medium'>Date:</span> {new Date(order.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Ordered Items */}
          <div className='divide-y divide-gray-200'>
            {order.items.map((item, idx) => (
              <div key={idx} className='flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-4'>
                <div className='flex items-start gap-4'>
                  <div className='bg-gray-100 p-2 rounded-lg w-20 h-20 flex items-center justify-center'>
                    <img
                      src={"https://api.spicezgold.com/download/" + item?.product?.images?.[0]}
                      alt={item?.product?.name}
                      className='w-full h-full object-contain'
                    />
                  </div>
                  <div>
                    <h2 className='text-lg font-semibold text-gray-800'>{item?.product?.name.split(" ").slice(0,5).join(" ")+"..."}</h2>
                    <p className='text-sm text-gray-500'>Category: {item?.product?.category}</p>
                    <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                  </div>
                </div>

                <p className='text-base font-semibold text-primary mt-2 md:mt-0'>₹{item.quantity * item?.product?.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
