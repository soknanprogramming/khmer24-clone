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
import AdLists from '../components/AdLists';

const BrandCategoryPage: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const AdField = queryParams.get("ad_field");
    const { categories, fetchCategories, loading } = useCategories();
    const { subCategoriesName, brandName } = useParams<{subCategoriesName: string, brandName: string}>();
    const [brands, setBrands] = useState<getBrand[]>([]);

    const thisCategories = categories.find((cat) => toSlug(cat.mainCategory.name) === subCategoriesName);
    const thisSubCategories = thisCategories?.subCategories.find((cat) => toSlug(cat.name) === brandName);
    const selectedBrand = brands.find(brand => toSlug(brand.name) === AdField);

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
    }, [categories.length, fetchCategories]);

    useEffect(() => {
        const fetchBrands = async () => {
            if (thisSubCategories?.id) {
                try {
                    const response = await axios.get<getBrand[]>(`${apiUrl}/api/productCategory/${thisSubCategories.id}`);
                    setBrands(response.data);
                } catch (error) {
                    console.error("Error fetching brands:", error);
                }
            }
        };

        if (categories.length > 0 && thisSubCategories) {
            fetchBrands();
        }
    }, [thisSubCategories, categories.length, apiUrl]); 

    if (loading || categories.length === 0) {
        return <div>Loading categories...</div>;
    }

    if (!thisCategories || !thisSubCategories) {
        return <div>Category or Brand not found.</div>;
    }

    return (
        <div className="flex justify-center">
            <div className="w-6xl bg-amber-100 mt-1.5">
                <LinkPage levelMainCategories={thisCategories.mainCategory.name} levelSubCategories={thisSubCategories.name} levelBrandCategories={AdField ? selectedBrand?.name : undefined}/>
                
                <OptionMenu/>
                { (brands.length !== 0 && !AdField) && <BrandOption brands={brands} />}
                
                <AdLists subCategoryId={thisSubCategories.id} brandId={selectedBrand?.id} />
            </div>
        </div>
    );
};

export default BrandCategoryPage;