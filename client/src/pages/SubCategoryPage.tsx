import React from "react";
import { useParams } from "react-router-dom";
import LinkPage from "../components/LinkPage";
import OptionMenu from "../components/OptionMenu";
import Categories from "../components/Categories";
import type { Items } from "../types/categoriesItems";
import useCategories from "../store/useCategories";
import { toSlug } from '../func/toSlug';


const SubCategoryPage: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const categories = useCategories((state) => state.categories);

  const { subCategoriesName } = useParams<{ subCategoriesName: string }>();
  
  // Find the category that matches the subCategoriesName
  const thisCategories = categories.find((cat) =>{
    return toSlug(cat.mainCategory.name) === subCategoriesName;
  })

  if(thisCategories === undefined) {
    return (
      <div>
        SubCategoryPage is Error
      </div>
    )
  }

  const subCategories : Items = thisCategories.subCategories.map((subCategory) => ({
    imageURL: `${apiUrl}/uploads/${subCategory.icon}`,
    title: subCategory.name,
    url: `/${toSlug(thisCategories.mainCategory.name)}/${toSlug(subCategory.name)}`,
  }));
  return (
    <div className="flex justify-center">
      <div className="w-6xl bg-amber-100 mt-1.5">
        <LinkPage levelMainCategories={thisCategories.mainCategory.name}/>
        <OptionMenu />
        <Categories sizeItem={7} items={subCategories} />
        <h1>SubCategory Page</h1>
      </div>
    </div>
  );
};

export default SubCategoryPage;
