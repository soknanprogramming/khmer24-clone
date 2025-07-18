import React from "react";
import useCategories from "../../store/useCategories";
import type { Items } from "../../types/categoriesItems"

type ChooseACategoryProps = {
  setSubCategoriesId: (id: number | null) => void;
  setWorkspaceLocation: (location: "main" | "sub" | "choose") => void;
};

const ChooseACategory: React.FC<ChooseACategoryProps> = ({setSubCategoriesId, setWorkspaceLocation}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const categories = useCategories((state) => state.categories);

  const mainCategories: Items = categories.map((category) => ({
    imageURL: `${apiUrl}/uploads/${category.mainCategory.icon}`,
    title: category.mainCategory.name,
    id: category.mainCategory.id,
  }));

  return (
    <div className="w-full bg-gray-100 rounded-lg overflow-hidden shadow">
      <div className="bg-blue-600 text-white font-semibold text-lg p-4">
        Choose a Category
      </div>
      <div>
        {mainCategories.map((category, index) => (
          <div
            onClick={() => {
              if (!category.id) throw new Error("ChooserACategory: Category ID is undefined");
              setSubCategoriesId(category.id);
              setWorkspaceLocation("sub");
            }}
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

export default ChooseACategory;
