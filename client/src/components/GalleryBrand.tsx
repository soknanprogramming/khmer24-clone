import React from 'react';
import { useNavigate } from "react-router-dom";
import { toSlug } from '../func/toSlug';
import { useLocation } from "react-router-dom";


type GalleryBrandProps = {
    id?: number
    title: string
    imgUrl: string
};

const GalleryBrand: React.FC<GalleryBrandProps> = ({title, imgUrl}) => {
      const location = useLocation();
  const navigate = useNavigate();

  const addQueryParam = (key: string, value: string) => {
    // Create URLSearchParams from current location
    const params = new URLSearchParams(location.search);

    // Set new param
    params.set(key, value);

    // Update the URL without reloading
    navigate(`${location.pathname}?${params.toString()}`);
  };

    return (
        <div 
            onClick={() => addQueryParam("ad_field", toSlug(title))} 
            className='bg-white min-w-28 h-28 flex flex-col justify-center items-center text-center cursor-pointer border-r border-b border-gray-100 hover:bg-gray-50 transition-colors group'
        >
            <div id='image' className='mb-2 transition-transform group-hover:scale-110'>
                <img src={imgUrl} alt={title} className='size-12 object-contain'/>
            </div>
            <div>
                <p className='text-xs font-medium text-gray-700 group-hover:text-primary'>{title}</p>
            </div>
        </div>
    );
};

export default GalleryBrand;