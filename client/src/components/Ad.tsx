import React from 'react';

const Ad: React.FC = () => {
    return (
        <div id='ad' className='bg-red-500 flex w-full justify-center py-3 overflow-auto'>
            <a href="https://www.ume.edu.kh/index.php" className='' target="_blank" rel="noopener noreferrer">
                <img src="/gif/ume.gif" alt="" className='flex-none max-w-5xl'/>
            </a>
        </div>
    );
};

export default Ad;