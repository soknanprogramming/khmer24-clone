import React, { useEffect, useState } from "react";
import Popup from "../../../components/Popup";
import useCategories from "../../../store/useCategories";
import type { getBrand } from "../../../types/getBrand";
import axios from "axios";

type BrandProp = {
    subCategoriesId: number
    setBrandId: React.Dispatch<React.SetStateAction<number | null>>
}

const BrandPopup: React.FC<BrandProp> = ({ subCategoriesId, setBrandId}) => {
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
    const [brands, setBrands] = useState<getBrand[]>([]);
    const [brandName, setBrandName] = useState<string>("")
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchCategories = useCategories((state) => state.fetchCategories);

    const handleClick = (brandId: number, brandName: string) => {
        setPopupOpen(false)
        setBrandId(brandId)
        setBrandName(brandName)
    }

    useEffect(() => {
        fetchCategories;
    }, []);
    

    useEffect(() => {
        const fetchBrands = async () => {
            // The conditional logic is now safely *inside* the hook
            if (subCategoriesId) {
                try {
                    const response = await axios.get<getBrand[]>(`${apiUrl}/api/productCategory/${subCategoriesId}`);
                    setBrands(response.data);
                } catch (error) {
                    console.error("Error fetching brands:", error);
                }
            }
        };

        fetchBrands();

    }, [apiUrl]); // Dependencies are correct


    return (
        <div className="w-full">
            <div onClick={() => { setPopupOpen(true) }} className="cursor-pointer flex items-center h-full">
                <input type="text" value={brandName} className="w-full h-11 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3" readOnly />
            </div>
            <Popup isOpen={isPopupOpen} className="h-4/5 w-xl border-2 border-green-600 !p-0 overflow-x-auto bg-amber-200" onClose={() => setPopupOpen(false)}>
                <div>
                    <div className="w-full bg-gray-100 rounded-lg overflow-hidden shadow">
                        <div>
                            {brands.map((brand, index) => (
                                <div
                                    onClick={() => handleClick(brand.id, brand.name)}
                                    key={index}
                                    className="flex items-center justify-between p-4 border-b hover:bg-gray-50 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`${apiUrl}/uploads/${brand.icon}`}
                                            alt={brand.name}
                                            className="w-10 h-10 object-contain"
                                        />
                                        <span className="text-gray-800 font-medium">{brand.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default BrandPopup;
