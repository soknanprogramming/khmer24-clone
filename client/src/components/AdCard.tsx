import React from 'react';

interface AdCardProps {
    imgUrl : string,
    title : string,
    time? : number,
    isNew? : boolean,
    Price? : number
}

const AdCard : React.FC<AdCardProps> = ({imgUrl, title, time, isNew, Price}) => (
    <div className='w-64 h-87 bg-red-500 rounded-lg'>
        <div className='h-60 w-full overflow-hidden'>
        <img src={imgUrl} className='rounded-lg' alt="" />
        </div>
        <h1>{title}</h1>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
    </div>
);

export default AdCard;