import React from 'react';
import { BsPercent } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { AiOutlineAppstore } from "react-icons/ai";
import LocationDD from './btn/LocationDD';
import MoreFilters from './btn/MoreFilters';



const OptionalMenu: React.FC = () => {
    return (
        <div className='w-full px-4 py-3 bg-white mt-4 rounded-lg shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-xl font-bold text-gray-800'>Filters</h1>
                <div className='flex items-center space-x-4 text-gray-500'>
                    <BsPercent className='size-6 hover:text-primary cursor-pointer transition-colors' />
                    <FiTruck className='size-6 hover:text-primary cursor-pointer transition-colors' />
                    <AiOutlineAppstore className='size-6 hover:text-primary cursor-pointer transition-colors' />
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex-1 max-w-xs'>
                    <LocationDD classUtility='h-10 w-full'/>
                </div>
                <MoreFilters classUtility='h-10'/>
            </div>
        </div>
    );
};

export default OptionalMenu;