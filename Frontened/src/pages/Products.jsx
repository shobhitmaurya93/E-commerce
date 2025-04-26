import React, { useEffect, useState } from 'react'
import { useAppContext } from '../content/AppContext'
import Item from '../component/Item';
import FBanner from '../component/FBanner';
const Products = () => {
    const {allProducts,query}=useAppContext();
    const [filterProducts,setFilterProducts]=useState([]);
    useEffect(()=>{
        if(query.length>0){
            setFilterProducts(allProducts?.filter(product=>product?.catName?.toLowerCase()?.includes(query.toLowerCase())))
            }
            else{
                setFilterProducts(allProducts);
            }
        }
    )
  return (
    <div>
    <div className='w-full flex flex-col mt-16'>
        <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium capitalize text-gray-600  '>{query.length>0?filterProducts[0]?.catName:"All Products"}</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 overflow-hidden'>
        {filterProducts.map((product)=>(<Item key={product?.id} product={product}></Item>))}
        </div>
    </div>
    <FBanner></FBanner>
    </div>
  )
}

export default Products 