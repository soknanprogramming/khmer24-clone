import React from 'react';
import { BsPercent } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { AiOutlineAppstore } from "react-icons/ai";
import LocationDD from './btn/LocationDD';
import MoreFilters from './btn/MoreFilters';



const OptionalMenu: React.FC = () => {
    return (
        <div className='w-full px-2 py-1 h-24 bg-red-500 mt-3'>
            <div className='flex h-10 justify-between'>
                <h1 className='text-2xl'>Example</h1>
                <div className='flex items-center'>
                    <BsPercent className='size-8' />
                    <FiTruck className='size-8 ml-3' />
                    <AiOutlineAppstore className='size-8 ml-3' />
                </div>
            </div>
            <div className='h-10 flex justify-between mt-2'>
                <div>
                    <LocationDD classUtility='h-9'/>
                </div>
                <MoreFilters classUtility='h-9'/>
            </div>
        </div>
    );
};

export default OptionalMenu;