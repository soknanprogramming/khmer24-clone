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
        <div className="w-6xl grid gap-0 h-32">
            <div className="w-6xl flex bg-green-600 overflow-x-auto">
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