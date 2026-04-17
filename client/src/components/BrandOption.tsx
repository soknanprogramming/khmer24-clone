import React from 'react';
import GalleryBrand from './GalleryBrand';
import type { getBrand } from '../types/getBrand';

type BrandOptionProps = {
    brands: getBrand[]
}

const BrandOption: React.FC<BrandOptionProps> = ({brands}) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if(!brands || brands.length === 0) {
        brands = [];
    }

    return (
        <div className="w-full h-32 mt-4 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex overflow-x-auto scrollbar-hide">
                {
                    brands.map((brand) => (
                        <GalleryBrand key={brand.id} id={brand.id} title={brand.name} imgUrl={`${apiUrl}/uploads/${brand.icon}`} />
                    ))
                }
            </div>
        </div>
    );
}

export default BrandOption;