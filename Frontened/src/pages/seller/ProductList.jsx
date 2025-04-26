import React from 'react';
import { useAppContext } from '../../content/AppContext';
import toast from 'react-hot-toast';

const ProductList = () => {
  const { allProducts,axios,fetchProduct } = useAppContext();
  const toggleStock=async(id,inStock)=>{
    try {
      const {data}=await axios.post("/api/product/stock",{id,inStock});
      console.log(data);
      if(data.success){
        fetchProduct();
        toast.success(data.message); 
      }
      else{
        toast.error("error in else bvlock")
      }
      
    } catch (error) {
      toast.error("error in catch block")
      
    }
  }
  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {allProducts?.length > 0 ? (
                allProducts.map((product) => (
                  <tr key={product?.id} className="border-t border-gray-500/20 hover:bg-gray-50">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-gray-300 rounded p-2">
                        <img
                          src={product.images?.[0] ? `https://api.spicezgold.com/download/${product.images[0]}` : "/placeholder.png"}
                          alt={product.name || "Product"}
                          className="w-16"
                        />
                      </div>
                      <span className="truncate max-sm:hidden w-full" title={product.name}>
                        {product.name?.split(" ").slice(0, 5).join(" ") + '...'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{product.catName}</td>
                    <td className="px-4 py-3 max-sm:hidden">₹ {product.price}</td>
                    <td className="px-4 py-3">
                      <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                        <input onClick={()=>toggleStock(product.id,!product.inStock)}
                          type="checkbox"
                          checked={product.inStock}
                          className="sr-only peer"
                          defaultChecked={product.countInStock}
                        />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
