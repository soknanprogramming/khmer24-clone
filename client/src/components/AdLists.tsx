import React from 'react';
import SellingCard from './SellingCard';
import AdCard from './AdCard';

const AdLists: React.FC = () => {
    return (
        <div className='pt-5 flex justify-center'>
            <div className='grid grid-cols-4 gap-5 '>
                <SellingCard />
                {Array.from({ length: 18 }).map((_, idx) => (
                <AdCard
                    key={idx}
                    imgUrl='https://images.khmer24.co/25-06-11/s-oppo-find-x--151874174962325941869652-b.jpg'
                    title='Oppo Find X'
                />
                ))}
            </div>
        </div>
    );
};

export default AdLists;