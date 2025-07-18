import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { toSlug } from '../func/toSlug';
import { capitalizeFirst } from '../func/capitalizeFirst';

type LinkPageProps = {
    levelMainCategories : string
    levelSubCategories? : string | undefined
    levelBrandCategories? : string | undefined
}

const LinkHome = () => {
    return(
        <Link to="/" className='items-center text-blue-500'>
            <IoHomeOutline className='inline-block mr-1 mb-1.5'/>
            <span className='inline-block'>Home</span>
        </Link>
    )
}


const LinkPage: React.FC<LinkPageProps> = ({levelMainCategories, levelSubCategories, levelBrandCategories}) => {

    if(levelMainCategories && !levelSubCategories && !levelBrandCategories){
        return(
            <div>
                <LinkHome/>
                <span className='mx-2'>/</span>
                <span> {levelMainCategories} in Cambodia</span>
            </div>
        )
    }
    else if(levelMainCategories && levelSubCategories && !levelBrandCategories){
        return(
            <div>
                <LinkHome/>
                <span className='mx-2'>/</span>
                <Link to={`/${toSlug(levelMainCategories)}`} className='text-blue-500'>{levelMainCategories}</Link>
                <span className='mx-2'>/</span>
                <span>{levelSubCategories}  in Cambodia</span>
            </div>
        )
    }
    else if(levelMainCategories && levelSubCategories && levelBrandCategories){
        return(
            <div>
                <LinkHome/>
                <span className='mx-2'>/</span>
                <Link to={`/${toSlug(levelMainCategories)}`} className='text-blue-500'>{levelMainCategories}</Link>
                <span className='mx-2'>/</span>
                <Link to={`/${toSlug(levelMainCategories)}/${toSlug(levelSubCategories)}`}  className='text-blue-500'>{levelSubCategories}</Link>
                <span className='mx-2'>/</span>
                <span>{capitalizeFirst(levelBrandCategories)} in Cambodia</span>
            </div>
        )
    }
    else{
        return (
            <div>
                <h1 className='text-red-600'>Something Wrong</h1>
            </div>
        )
    }

};

export default LinkPage;