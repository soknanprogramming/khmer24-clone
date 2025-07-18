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
        <div onClick={() => addQueryParam("ad_field", toSlug(title))} className='bg-yellow-400 min-w-28 size-28 flex flex-col justify-center items-center text-center'>
            <div id='image'>
                <img src={imgUrl} alt="" className='size-15'/>
            </div>
            <div>
                <p>{title}</p>
            </div>
        </div>
    );
};

export default GalleryBrand;