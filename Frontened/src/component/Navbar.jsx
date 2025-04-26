import { useContext, useState } from "react";
import logo from "../assets/logo.jpg";
import { FaSearch } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useAppContext } from "../content/AppContext";
import { FaShoppingCart } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";


const Navbar = () => {
  const [open, setOpen ]= useState(false);
  const{query,setQuery}=useAppContext();
  const { user, setUser,navigate,setShowUserLogin,getCartCount,axios} = useAppContext();
  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout", {
        withCredentials: true,
      });
      if (data?.success) {
        toast.success("Logout successful");
        setUser(null);
        navigate("/");
      } else {
        toast.error("Error in logout");
      }
    } catch (error) {
      toast.error("Error in logout");
    }
  };
  return (
    <nav
      className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all"
    >
      <NavLink to="/" onClick={()=>setOpen(false)}>
        <img className="h-9" src={logo} alt="logo" />
      </NavLink>
      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input onChange={(e)=>{setQuery(e.target.value);
            navigate("/products");
            scrollTo(0,0);
          }}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            value={query}
          />
          <FaSearch className="w-4 h-4 text-gray-600" />
        </div>

        <div  onClick={()=>{navigate('/cart');
          scrollTo(0,0);
        }
        } className="relative cursor-pointer group">
         <FaShoppingCart className="w-6 opacity-80 text-gray-600 bg-white"/> 
          <button 
          className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
           {getCartCount()}
          </button>
        </div>
        { !user ? (<button  onClick={()=>{
            setShowUserLogin(true);
        }} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
          Login
        </button>):
        (
       <div className="relative group">
        <CgProfile className="text-4xl text-gray-500"/>
        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 rounded-md py-2.5 w-30 text-sm z-40">
            <li className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer" onClick={()=>navigate("/my-orders")}>My Orders</li>
            <li className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"  onClick={logout} >logout</li>
        </ul>

       </div>  
        )
}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <BiMenuAltRight className="h-8 w-8 text-gray-500 opacity-80"/>
      </button>
      {/* Mobile Menu */}
      {open&&(
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}
      >
        <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
        {user && <Link to="/my-orders" onClick={()=>setOpen(false)}>My Orders</Link>}
        <Link to="/contact" onClick={()=>setOpen(false)}>Contact</Link>
        <Link to="/products" onClick={()=>setOpen(false)}>All Products</Link>
        { !user ? (<button onClick={()=>{
        setOpen(false);
        setShowUserLogin(true);
        }
     } className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Login
          </button>):
          (<button  onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Logout
          </button>)
        }
      </div>)
}
    </nav>
  );
};
export default Navbar;
