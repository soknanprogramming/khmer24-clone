import ChooseACategory from "./post/ChooseACategory";
import ChooseSubCategory from "./post/ChooseSubCategory";
import ChooseOption from "./post/ChooseOption";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import useUser from '../store/useUser';




const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, status } = useUser();
    const [subCategoriesId, setSubCategoriesId] = useState<number | null>(null);
    const [workspaceLocation, setWorkspaceLocation] = useState<"main" | "sub" | "choose">("main");
    useEffect( () => {
        (async () => {
            await status();
            if (!user) {
                navigate("/login");
            }
            console.log("PostPage: user", user);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, status]);
    if (workspaceLocation === "main"){
        return (
            <div className="flex justify-center">
                <div className='w-3xl bg-amber-100 mt-1.5'>
                    {/* <ChooseACategory setSubCategoriesId={setSubCategoriesId} setWorkspaceLocation={setWorkspaceLocation}/> */}
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
}

export default RegisterPage;