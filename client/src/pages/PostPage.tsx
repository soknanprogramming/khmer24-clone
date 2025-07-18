import ChooseACategory from "./post/ChooseACategory";
import ChooseSubCategory from "./post/ChooseSubCategory";
import ChooseOption from "./post/ChooseOption";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import useUser from '../store/useUser';

const PostPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, status } = useUser();
    const [subCategoriesId, setSubCategoriesId] = useState<number | null>(null);
    const [workspaceLocation, setWorkspaceLocation] = useState<"main" | "sub" | "choose">("main");

    useEffect(() => {
        const checkAuth = async () => {
            await status();
            if (!user) {
                navigate("/login");
            }
        };
        checkAuth();
    }, [user, navigate, status]);

    if (!user) {
        // Render a loading state or null while checking for authentication
        return <div>Loading...</div>;
    }

    if (workspaceLocation === "main"){
        return (
            <div className="flex justify-center">
                <div className='w-3xl bg-amber-100 mt-1.5'>
                    <ChooseOption/>
                </div>
            </div>
        )
    }
    else if (workspaceLocation === "sub") {
        if (subCategoriesId === null) throw new Error("RegisterPage: subCategoriesId is null");
        return (
            <div className="flex justify-center">
                <div className='w-3xl bg-amber-100 mt-1.5'>
                    <ChooseSubCategory subCategoriesId={subCategoriesId} setSubCategoriesId={setSubCategoriesId} setWorkspaceLocation={setWorkspaceLocation} />
                </div>
            </div>
        )
    }

    // Fallback for any other state
    return null;
}

export default PostPage;