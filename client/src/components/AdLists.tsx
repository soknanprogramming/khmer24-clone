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

const AdLists: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchAds = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Ad[]>(`${apiUrl}/api/products/public`);
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
    }, [apiUrl]);

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