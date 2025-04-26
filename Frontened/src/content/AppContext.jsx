import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// Axios configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKENED_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [Category, setCategory] = useState("Fashion");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const didMountRef = useRef(false);

  // Seller authentication
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data?.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  // User authentication
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data?.success && data?.user) {
        setUser(data.user);
        setCart(data.user.cart || {});
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  // Fetch product listings
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("/api/product/List");
      if (data.success) {
        setAllProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Initial loading of auth and products
  useEffect(() => {
    fetchSeller();
    fetchUser();
    fetchProduct();
  }, []);

  // Cart synchronization
  useEffect(() => {
    if (!user?._id) return;

    const timeout = setTimeout(async () => {
      try {
        const { data } = await axios.put("/api/cart/update", {
          id: user._id,
          cart,
        });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [cart]);

  // Filter products by category and stock
  useEffect(() => {
    const filtered = allProducts
      .filter((item) => item.inStock && item.catName === Category)
      .slice(0, 8);
    setProducts(filtered);
  }, [Category, allProducts]);

  // Add item to cart
  const addToCart = (item_id) => {
    const cartData = structuredClone(cart);
    if (cartData[item_id]) {
      cartData[item_id] += 1;
    } else {
      cartData[item_id] = 1;
    }
    setCart(cartData);
    toast.success("Item added to cart");
  };

  // Update item quantity in cart
  const updateCartItem = (item_id, quantity) => {
    const cartData = structuredClone(cart);
    cartData[item_id] = quantity;
    setCart(cartData);
    toast.success("Cart updated");
  };

  // Remove item from cart
  const removeFromCart = (item_id) => {
    const cartData = structuredClone(cart);
    if (cartData[item_id]) {
      cartData[item_id] -= 1;
      if (cartData[item_id] === 0) {
        delete cartData[item_id];
      }
    }
    setCart(cartData);
    toast.success("Removed from cart");
  };

  // Compute total number of items in cart
  const getCartCount = () => {
    return Object.values(cart).reduce((acc, curr) => acc + curr, 0);
  };

  // Compute total price of items in cart
  const getCartAmount = () => {
    let total = 0;
    for (let item in cart) {
      const product = allProducts.find((p) => String(p.id) === String(item));
      if (product) {
        total += product.price * cart[item];
      }
    }
    return Math.floor(total * 100) / 100;
  };

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    cart,
    setCart,
    Category,
    setCategory,
    addToCart,
    removeFromCart,
    updateCartItem,
    query,
    setQuery,
    allProducts,
    getCartAmount,
    getCartCount,
    axios,
    fetchProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
