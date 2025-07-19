import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPhone, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

// Define the type for the detailed ad data
interface AdDetails {
    product: {
        ID: number;
        Name: string;
        Price: string;
        Description: string;
        CreatedDate: string;
        ConditionID: number;
    };
    brand: { Name: string } | null;
    subCategory: { Name: string } | null;
    mainCategory: { Name: string } | null;
    condition: { Name: string } | null;
    city: { Name: string } | null;
    contactDetails: {
        Username: string;
        PhoneNumber: string;
        PhoneNumber2: string | null;
        PhoneNumber3: string | null;
    } | null;
    images: { ID: number, Photo: string }[];
}

const AdDetailPage: React.FC = () => {
    const { adId } = useParams<{ adId: string }>();
    const [ad, setAd] = useState<AdDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mainImage, setMainImage] = useState<string>('');
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/api/products/public/${adId}`);
                setAd(response.data);
                if (response.data.images && response.data.images.length > 0) {
                    setMainImage(`${apiUrl}/uploads/products/${response.data.images[0].Photo}`);
                }
            } catch (err) {
                setError("Failed to fetch ad details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (adId) {
            fetchAdDetails();
        }
    }, [adId, apiUrl]);

    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!ad) return <div className="text-center p-10">Ad not found.</div>;

    const { product, brand, subCategory, mainCategory, condition, city, contactDetails, images } = ad;

    const getConditionName = () => {
      if (condition) {
        return condition.Name;
      }
      if (product.ConditionID === 1) {
        return 'Used';
      }
      if (product.ConditionID === 2) {
        return 'New';
      }
      return 'N/A';
    };

    return (
        <div className="flex justify-center bg-gray-100 py-4">
            <div className="w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Images and Details */}
                <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
                    {/* Image Gallery */}
                    <div>
                        <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden mb-2">
                            <img src={mainImage} alt={product.Name} className="object-contain h-full w-full"/>
                        </div>
                        <div className="flex space-x-2">
                            {images.map(img => (
                                <div key={img.ID} className="w-20 h-20 border-2 border-transparent hover:border-blue-500 cursor-pointer rounded overflow-hidden" onClick={() => setMainImage(`${apiUrl}/uploads/products/${img.Photo}`)}>
                                    <img src={`${apiUrl}/uploads/products/${img.Photo}`} alt="thumbnail" className="w-full h-full object-cover"/>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-800 mt-4">{product.Name}</h1>
                    <p className="text-3xl font-bold text-red-600 my-2">${Number(product.Price).toLocaleString()}</p>

                    <div className="text-sm text-gray-500 mb-4">
                        <span>AD ID: {product.ID}</span> &bull; 
                        <span> {city?.Name}</span> &bull; 
                        <span> Posted: {new Date(product.CreatedDate).toLocaleDateString()}</span>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-2">Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>Main Category:</strong> {mainCategory?.Name}</p>
                            <p><strong>Category:</strong> {subCategory?.Name}</p>
                            <p><strong>Brand:</strong> {brand?.Name}</p>
                            <p><strong>Condition:</strong> {getConditionName()}</p>
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{product.Description}</p>
                    </div>
                </div>

                {/* Right Column: Seller Info */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                         <h3 className="font-bold text-lg mb-2">{contactDetails?.Username || 'Seller'}</h3>
                         <p className="text-sm text-gray-500 mb-4">Member since Oct, 2014</p>
                         <button className="w-full bg-green-500 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600">
                             <FaPhone />
                             <span>{contactDetails?.PhoneNumber}</span>
                         </button>
                         <div className="text-sm text-gray-600 mt-4 flex items-start">
                             <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0"/>
                             <span>{city?.Name}</span>
                         </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
                        <h3 className="font-bold text-lg mb-2 flex items-center"><FaShieldAlt className="text-red-500 mr-2"/> Safety Tips for Buyers</h3>
                        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                            <li>Do note send money before receiving the goods</li>
                            <li>Check the item before you buy</li>
                            <li>Payment offer receiving the goods</li>
                            <li>Meet the seller at a safe location</li>
                        </ol>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdDetailPage;