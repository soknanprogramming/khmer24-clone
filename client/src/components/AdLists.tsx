import React, { useState, useEffect } from 'react';
import SellingCard from './SellingCard';
import AdCard from './AdCard';
import axios from 'axios';

interface Ad {
  ID: number;
  Name: string;
  Price: string;
  imageUrl: string | null;
  CreatedDate: string;
  location: string;
}

interface AdListsProps {
    mainCategoryId?: number;
    subCategoryId?: number;
    brandId?: number;
}

const AdLists: React.FC<AdListsProps> = ({ mainCategoryId, subCategoryId, brandId }) => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchAds = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (brandId) params.append('brandId', String(brandId));
                if (subCategoryId) params.append('subCategoryId', String(subCategoryId));
                if (mainCategoryId) params.append('mainCategoryId', String(mainCategoryId));
                
                const response = await axios.get<Ad[]>(`${apiUrl}/api/products/public`, { params });
                setAds(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch ads. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAds();
    }, [apiUrl, mainCategoryId, subCategoryId, brandId]);

    if (loading) {
        return <div className="text-center p-10">Loading ads...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">{error}</div>;
    }

    return (
        <div className='pt-5 flex justify-center pb-3'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
                <SellingCard />
                {ads.map((ad) => (
                    <AdCard
                        key={ad.ID}
                        ID={ad.ID}
                        imgUrl={ad.imageUrl ? `${apiUrl}/uploads/products/${ad.imageUrl}` : '/profile/user-icon.webp'}
                        title={ad.Name}
                        Price={Number(ad.Price)}
                        createdDate={ad.CreatedDate}
                        location={ad.location}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdLists;