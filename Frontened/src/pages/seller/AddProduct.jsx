import React, { useActionState, useState } from 'react';
import { useAppContext } from '../../content/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [file, setFile] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState(""); // ✅ fixed
    const [catName, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [oldPrice, setOfferPrice] = useState("");
    const{axios}=useAppContext();

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const productData={
                name,
                description,
                catName,
                oldPrice,
                price, 
            }
            const formData=new FormData();
            formData.append('productData',JSON.stringify(productData));
            for(let i=0;i<file.length;i++){
                formData.append('images',file[i]);
            }
            const {data}=await axios.post("/api/product/add",formData);
            if(data.success){
                toast.success(data.message);
                setName("");
                setDescription("");
                setCategory("");
                setPrice("");
                setOfferPrice("");
                setFile([]);
            }
            else{
                toast.error(data.message)
            }

            
        } catch (error) {
            toast.error(error.message)
            
        }
        event.preventDefault();

    };

    return (
        <div className="no-scrollbar flex-1 h-[95vh] flex-col">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input
                                    onChange={(e) => {
                                        const updatedFiles = [...file];
                                        updatedFiles[index] = e.target.files[0]; // ✅ fixed
                                        setFile(updatedFiles);
                                    }}
                                    accept="image/*"
                                    type="file"
                                    id={`image${index}`}
                                    hidden
                                />
                                <img
                                    className="max-w-24 cursor-pointer"
                                    src={
                                        file[index]
                                            ? URL.createObjectURL(file[index])
                                            : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                                    }
                                    alt="uploadArea"
                                    width={100}
                                    height={100}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input
                        id="product-name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder="Type here"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea
                        id="product-description"
                        rows={4}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                        placeholder="Type here"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select
                        id="category"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        onChange={(e) => setCategory(e.target.value)}
                        value={catName}
                    >
                        <option value="">Select Category</option>
                        {[
                            { name: 'Electronics' },
                            { name: 'Clothing' },
                            { name: 'Accessories' },
                            { name: 'Fashion' }, // ✅ fixed
                            { name: 'Jewellery' },
                            { name: 'Bag' }
                        ].map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            id="product-price"
                            type="number"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            required
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input
                            onChange={(e) => setOfferPrice(e.target.value)}
                            value={oldPrice}
                            id="offer-price"
                            type="number"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            required
                        />
                    </div>
                </div>

                <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded cursor-pointer">ADD</button>
            </form>
        </div>
    );
};

export default AddProduct;
