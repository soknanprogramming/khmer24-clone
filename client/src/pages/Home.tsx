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
    const categories = useCategories((state) => state.categories);

    const mainCategories: Items = (!categories || []).map((category : mainAndSubCategories) => ({
        imageURL: `${apiUrl}/uploads/${category.mainCategory.icon}`,
        title: category.mainCategory.name,
        url: `/${toSlug(category.mainCategory.name)}`
    }));

    return(
        <div className='flex justify-center'>
            <div className='w-6xl bg-amber-100 mt-1.5'>
                <Ad />
                <h1 className='tracking-wider my-2 '><b>Welcome to ume24.com, the biggest online market in Cambodia.</b></h1>
                <Categories items={mainCategories} sizeItem={6} />
                <AdLists />
            </div>
        </div>
    );
}

export default Home;
