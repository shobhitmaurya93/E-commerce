import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../content/AppContext';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useAppContext();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div key={index} className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">

            {/* Items */}
            <div className="flex flex-col gap-2">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 object-cover opacity-60"
                    src={
                      item?.product?.images?.[0]
                        ? `https://api.spicezgold.com/download/${item.product.images[0]}`
                        : "https://via.placeholder.com/50"
                    }
                    alt={item?.product?.name || "Product"}
                  />
                  <p className="font-medium">
                    {item?.product?.name || "Product Name"}
                    <span className={`text-indigo-500 ${item?.quantity < 2 ? "hidden" : ""}`}> x {item?.quantity}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="text-sm">
              {order?.address && (
                <>
                  <p className='font-medium mb-1'>{order?.address?.firstName} {order?.address?.lastName}</p>
                  <p>
                    {order?.address?.street}, {order?.address?.city}, {order?.address?.state}, {order?.address?.country}
                  </p>
                </>
              )}
            </div>

            {/* Amount */}
            <p className="font-medium text-base my-auto text-black/70">₹{order?.amount}</p>

            {/* Payment Info */}
            <div className="flex flex-col text-sm">
              <p>Method: {order?.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
