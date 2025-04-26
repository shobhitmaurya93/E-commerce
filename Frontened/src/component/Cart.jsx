import { useEffect, useState } from "react";
import { useAppContext } from "../content/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    navigate,
    allProducts,
    cart,
    removeFromCart,
    getCartCount,
    updateCartItem,
    getCartAmount,
    axios,
    user,
    setCart,
  } = useAppContext();

  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (let key in cart) {
      const product = allProducts.find((item) => item._id === key);
      if (product) {
        const productCopy = { ...product, quantity: cart[key] };
        tempArray.push(productCopy);
      }
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get(`/api/address/get/${user._id}`);
      if (data.success) {
        setAddress(data?.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data?.addresses[0]);
        }
        toast.success("Address fetched successfully");
      } else {
        toast.error("No Address Found");
      }
    } catch (error) {
      toast.error("Failed to fetch address");
    }
  };

  useEffect(() => {
    if (allProducts.length > 0 && cart) {
      getCart();
    }
  }, [cart, allProducts]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    try {
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data?.success) {
          toast.success(data?.message);
          setCart({});
          navigate("/my-orders");
        }
      } else if (paymentOption === "Online") {
        const { data } = await axios.post("/api/order/cod", {
            userId: user._id,
            items: cartArray.map((item) => ({
              product: item._id,
              quantity: item.quantity,
            })),
            address: selectedAddress._id,
          });
  
          if (data?.success) {
            toast.success(data?.message);
            setCart({});
            navigate("/my-orders");
          }

        navigate("/payment");
        scrollTo(0, 0);
      }
    } catch (error) {
      toast.error("Error placing order");
    }
  };

  return allProducts.length > 0 && cart ? (
    <div className="flex flex-col md:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-lg text-indigo-500">({getCartCount()}) items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`/products/${product.catName}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={
                    product?.images?.[0]
                      ? `https://api.spicezgold.com/download/${product.images[0]}`
                      : "https://via.placeholder.com/100"
                  }
                  alt={product?.name || "Product"}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">
                  {product?.name?.split(" ").slice(0, 5).join(" ") + "..."}
                </p>
                <div className="font-normal text-gray-500/70">
                  <p>Size: <span>{product.size || "N/A"}</span></p>
                  <div className="flex items-center">
                    <p>Qty: {product.quantity}</p>
                    <select
                      className="outline-none ml-1"
                      value={product.quantity}
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                    >
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">₹{product.price * product.quantity}</p>
            <button
              className="cursor-pointer mx-auto"
              onClick={() => removeFromCart(product._id)}
            >
              ❌
            </button>
          </div>
        ))}

        <button
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
        >
          ← Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6" onClick={(e) => e.stopPropagation()}>
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {address?.map((addr, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {addr.street}, {addr.city}, {addr.state}, {addr.country}
                  </p>
                ))}
                <p
                  onClick={() => {
                    navigate("/addAddress");
                    scrollTo(0, 0);
                  }}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>₹{getCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{(getCartAmount() * 0.02).toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>₹{(getCartAmount() * 1.02).toFixed(2)}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Pay"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
