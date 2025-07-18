import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import LinkPage from '../components/LinkPage';
import useCategories from "../store/useCategories";
import { toSlug } from '../func/toSlug';
import OptionMenu from '../components/OptionalMenu';
import BrandOption from '../components/BrandOption';
import type { getBrand } from '../types/getBrand';
import axios from "axios";
import { useLocation } from "react-router-dom";


const BrandCategoryPage: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const location = useLocation();
    // Create URLSearchParams object
    const queryParams = new URLSearchParams(location.search);

    const AdField = queryParams.get("ad_field");

    // --- All hooks are called at the top level ---
    const { categories, fetchCategories, loading } = useCategories();
    const { subCategoriesName, brandName } = useParams<{subCategoriesName: string, brandName: string}>();
    const [brands, setBrands] = useState<getBrand[]>([]);

    // --- Data derivation is done before conditional returns ---
    const thisCategories = categories.find((cat) => toSlug(cat.mainCategory.name) === subCategoriesName);
    const thisSubCategories = thisCategories?.subCategories.find((cat) => toSlug(cat.name) === brandName);

    // Effect to fetch initial categories
    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
            console.log("Fetching categories...");
        }
    }, [categories.length, fetchCategories]);

    // Effect to fetch brands for the selected sub-category
    useEffect(() => {
        const fetchBrands = async () => {
            // The conditional logic is now safely *inside* the hook
            if (thisSubCategories?.id) {
                try {
                    const response = await axios.get<getBrand[]>(`${apiUrl}/api/productCategory/${thisSubCategories.id}`);
                    setBrands(response.data);
                } catch (error) {
                    console.error("Error fetching brands:", error);
                }
            }
        };

        // Only fetch brands if categories have loaded and a sub-category is found
        if (categories.length > 0 && thisSubCategories) {
            fetchBrands();
        }
    }, [thisSubCategories, categories.length, apiUrl]); // Dependencies are correct

    // --- Conditional returns (early exits) are now after all hooks ---
    if (loading || categories.length === 0) {
        return <div>Loading categories...</div>;
    }

    if (!thisCategories || !thisSubCategories) {
        return <div>Category or Brand not found.</div>;
    }

    // --- Render JSX ---

    console.log("Brand is", brands);

    return (
        <div className="flex justify-center">
            <div className="w-6xl bg-amber-100 mt-1.5">
                {
                    !AdField ? (<LinkPage levelMainCategories={thisCategories.mainCategory.name} levelSubCategories={thisSubCategories.name}/>) : (
                        <LinkPage levelMainCategories={thisCategories.mainCategory.name} levelSubCategories={thisSubCategories.name} levelBrandCategories={AdField}/>)
                }
                
                <OptionMenu/>
                { (brands.length !== 0 && !AdField) && <BrandOption brands={brands} />}
                <h1>BrandCategory Page</h1>
            </div>
        </div>
    );
};

export default BrandCategoryPage;