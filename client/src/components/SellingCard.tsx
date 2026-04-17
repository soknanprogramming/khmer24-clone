import React from 'react';
import { Link } from 'react-router-dom';
import { MdAddAPhoto } from "react-icons/md";

const SellingCard: React.FC = () => (
    <div className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-lg transition-shadow duration-300'>
        <div className='relative h-48 bg-orange-50 flex items-center justify-center'>
            <div className='text-center text-primary'>
                <MdAddAPhoto className='mx-auto text-4xl mb-2'/>
                <p className='font-semibold'>Want to see your ad here?</p>
            </div>
        </div>
        <div className='p-3 flex flex-col flex-grow'>
            <h2 className='font-semibold text-gray-800 mb-2 truncate'>Make some extra cash</h2>
            <div className='text-xs text-gray-500 mb-3'>
                <p>Go on, it's quick and easy.</p>
            </div>
            <div className='mt-auto'>
                <Link to="/post" className="block w-full text-center bg-primary text-white py-2 rounded font-bold hover:bg-primary-hover transition shadow-sm">
                    Start Selling
                </Link>
            </div>
        </div>
    </div>
);

export default SellingCard;