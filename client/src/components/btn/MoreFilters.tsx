import React from 'react';

type MoreFilters = {
    classUtility : string
}

const MoreFilters: React.FC<MoreFilters> = ({classUtility}) => {
    return (
        <button type="button" className={`bg-yellow-400 p-2 rounded-lg text-sm text-center inline-flex items-center ${classUtility}`}>
            More Filters
        </button>
    );
};

export default MoreFilters;