import React from "react";
import useCategories from "../../store/useCategories";
import type { Items } from "../../types/categoriesItems"
import { BiChevronLeft } from "react-icons/bi";


type ChooseACategoryProps = {
    subCategoriesId : number;
    setSubCategoriesId: (id: number | null) => void;
    setWorkspaceLocation: (location: "main" | "sub" | "choose") => void;
};


const ChooseSubCategory : React.FC<ChooseACategoryProps> = ({subCategoriesId, setSubCategoriesId, setWorkspaceLocation}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const categories = useCategories((state) => state.categories);

    const thisCategories = categories.find((cat) =>{
      return cat.mainCategory.id === subCategoriesId;
    })

      if(thisCategories === undefined) {
    return (
      <div>
        SubCategoryPage is Error
      </div>
    )
  }

  const subCategories: Items = thisCategories?.subCategories.map((SubCategory) => ({
    imageURL: `${apiUrl}/uploads/${SubCategory.icon}`,
    title: SubCategory.name,
    id: SubCategory.id,
  }));

  return (
    <div className="w-full bg-gray-100 rounded-lg overflow-hidden shadow">
      <div className="bg-blue-600 text-white flex items-center font-semibold text-lg p-4">
        <button onClick={() => {
                setWorkspaceLocation("main");
                setSubCategoriesId(null);
        }}>
            <BiChevronLeft className="size-8 cursor-pointer"/>
        </button>
        Choose a Category
      </div>
      <div>
        {subCategories.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <img
                src={category.imageURL}
                alt={category.title}
                className="w-10 h-10 object-contain"
              />
              <span className="text-gray-800 font-medium">{category.title}</span>
            </div>
            <span className="text-gray-400">&gt;</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseSubCategory;
