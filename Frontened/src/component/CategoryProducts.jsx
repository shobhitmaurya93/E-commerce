import React, { useEffect, useState } from 'react';
import { useAppContext } from '../content/AppContext';
import { useParams } from 'react-router-dom';
import Item from './Item';

const CategoryProducts = () => {
    const { category } = useParams();
    const { allProducts } = useAppContext();
    const [filterProducts, setFilterProducts] = useState([]);

    useEffect(() => {
        setFilterProducts(
            allProducts.filter((product)=>(
                product?.catName.toLowerCase() === category.toLowerCase())
            )
        );
    }, [category]); 

    return (
        <div>
            {filterProducts.length > 0 ? (
                <div className='w-full flex flex-col mt-16'>
                    <div className='flex flex-col items-end w-max'>
                        <p className='text-2xl font-medium capitalize text-gray-600'>
                            {filterProducts[0]?.catName}
                        </p>
                        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 overflow-hidden'>
                        {filterProducts.map(product => (
                            <Item key={product?.id} product={product} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="sm:text-2xl md:text-3xl text-gray-600 text-lg">
                    Products not found
                </div>
            )}
        </div>
    );
};

export default CategoryProducts;
