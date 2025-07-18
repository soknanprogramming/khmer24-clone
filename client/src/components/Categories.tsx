import React from 'react';
import GalleryItem from './GalleryItem';
import type { Items } from "../types/categoriesItems"

type CategoriesProp = {
    sizeItem?: 6 | 7 | 8 | 9 | 10 ,
    items : Items
}


const Categories: React.FC<CategoriesProp> = ({ sizeItem = 6, items = []}) => {
    let className = "";
    switch (sizeItem) {
        case 6:
            className = "grid-cols-6";
            break;
        case 7:
            className = "grid-cols-7";
            break;
        case 8:
            className = "grid-cols-8";
            break;
        case 9:
            className = "grid-cols-9";
            break;
        case 10:
            className = "grid-cols-10";
            break;
        default:
            className = "grid-cols-6";
    }
    return (
        <div className={`bg-amber-400 w-6xl grid gap-0 ${className}`}>
            {/* <GalleryItem sizeItem={sizeItem} imageURL='fake/computer-and-accessories.webp' tittle='Computers & Accessories' url='/subcategory'/> */}
            {
                items.map((item, index) => (
                    <GalleryItem
                        key={index}
                        sizeItem={sizeItem}
                        imageURL={item.imageURL}
                        tittle={item.title}
                        url={item.url}
                    />
                ))
            }
        </div>
    );
};

export default Categories;