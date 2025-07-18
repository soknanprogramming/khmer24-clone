import React from 'react';
import { BsThreeDotsVertical, BsHeart } from 'react-icons/bs';

interface AdCardProps {
    imgUrl : string,
    title : string,
    createdDate?: string,
    location?: string,
    Price? : number | string
}

const AdCard : React.FC<AdCardProps> = ({imgUrl, title, createdDate, location, Price}) => {
    
    // Function to format date like "Jul 08"
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    };

    return (
        <div className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col'>
            <div className='relative h-48'>
                <img src={imgUrl} className='w-full h-full object-cover' alt={title} />
                <button className="absolute top-2 right-2 bg-black bg-opacity-30 text-white p-1.5 rounded-full hover:bg-opacity-50 transition-colors">
                    <BsThreeDotsVertical size={16} />
                </button>
            </div>
            <div className='p-3 flex flex-col flex-grow'>
                <h2 className='font-semibold text-gray-800 mb-2 truncate' title={title}>{title}</h2>
                <div className='text-xs text-gray-500 mb-3'>
                    <span>{formatDate(createdDate)}</span>
                    {location && <span> &bull; {location}</span>}
                </div>
                <div className='mt-auto flex justify-between items-center'>
                    <p className='text-red-600 font-bold text-lg'>
                        {typeof Price === 'number' ? `$${Price.toLocaleString()}` : Price}
                    </p>
                    <button className="text-gray-400 hover:text-red-500">
                        <BsHeart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdCard;