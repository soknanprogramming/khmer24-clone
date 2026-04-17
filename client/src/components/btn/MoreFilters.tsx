import React from 'react';

type MoreFilters = {
    classUtility : string
}

const MoreFilters: React.FC<MoreFilters> = ({classUtility}) => {
    return (
        <button type="button" className={`bg-secondary text-white font-semibold px-4 py-2 rounded-md text-sm text-center inline-flex items-center hover:bg-blue-700 transition-colors shadow-sm ${classUtility}`}>
            More Filters
        </button>
    );
};

export default MoreFilters;