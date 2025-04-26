import React from "react";
import { categoryList } from "../data/Category";
import { useAppContext } from "../content/AppContext";
const Categories = () => {
  const { navigate } = useAppContext();
  return (
    <div className="mt-16 relative overflow-x-scroll">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <div className="grid  mt-6 gap-6 grid-row-1 grid-flow-col">
        {categoryList.map((category, index) => {
          return (
            <div
              key={category.id}
              onClick={() => {
                navigate(`/products/${category?.name}`);
                scrollTo(0,0)
              }}
              className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
              style={{ backgroundColor: category.color}}
            >
              <img
                src={`https://api.spicezgold.com/download/${category?.images[0]}`}
                className="group-hover:scale-108 transition max-w-28 rounded-full"
              />
              <p className="text-sm font-medium">{category?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
