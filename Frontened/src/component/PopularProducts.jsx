import React from 'react';
import { useState } from 'react'
import { useAppContext } from '../content/AppContext'
import Item from './Item';
const PopularProducts = () => {
    const {products,Category, setCategory} = useAppContext();
    return (
        <div className='mt-11 relative overflow-hidden'>
            <div className='w-full flex flex-col md:flex-row gap-y-5 overflow-hidden justify-between'>
                <p className='text-2xl md:text-3xl font-medium text-gray-600 '>Popular Products</p>
                <div className="flex gap-x-4 text-gray-600 md:text-lg flex-wrap overflow-hidden">
                    {["Fashion", "Electronics", "Bags", "Footwear", "Groceries", "Beauty", "Wellness", "Jewellery"].map((cat) => (
                        <button key={cat} onClick={() => setCategory(cat)} className="hover:scale-110 hover:font-medium hover:text-gray-700">
                            {cat}

                        </button>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 overflow-hidden'>
                {products.map(product=><Item key={product.id} product={product}></Item>)}
            </div>
        </div>
    );
};

export default PopularProducts;
