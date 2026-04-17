import React from 'react';
import Categories from '../components/Categories';
import Ad from '../components/Ad';
import AdLists from '../components/AdLists';
import type { Items } from "../types/categoriesItems"
import useCategories from "../store/useCategories";
import type { mainAndSubCategories } from "../store/useCategories";
import { toSlug } from '../func/toSlug';


const Home: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    // const categories = useCategories((state) => state.categories);
    const { categories } = useCategories();

    const mainCategories: Items = (Array.isArray(categories) ? categories : []).map((category : mainAndSubCategories) => ({        imageURL: `${apiUrl}/uploads/${category.mainCategory.icon}`,
        title: category.mainCategory.name,
        url: `/${toSlug(category.mainCategory.name)}`
    }));

    return(
        <div className='flex justify-center'>
            <div className='w-6xl mt-4'>
                <Ad />
                <h1 className='text-xl font-bold text-gray-800 my-6'>Welcome to ume24.com, the biggest online market in Cambodia.</h1>
                <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100'>
                    <Categories items={mainCategories} sizeItem={6} />
                </div>
                <AdLists />
            </div>
        </div>
    );
}

export default Home;
