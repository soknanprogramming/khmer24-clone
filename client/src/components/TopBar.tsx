import React, {useEffect} from 'react';
import useLang from "../store/lang"
import { IoMdSearch } from "react-icons/io";
import { MdAddAPhoto } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import useUser from '../store/useUser';
import { FaBell } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from './btn/ProfileDropdown';

const TopBar: React.FC = () => {
    const { lang, changeLang } = useLang();
    const { user, status } = useUser();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check user status when component mounts
        status();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (location.pathname === "/") {
            // Prevent React Router navigation
            e.preventDefault();
            // Force full page reload
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        // Otherwise, React Router will navigate normally
    };

    return(
        <header className='bg-white sticky top-0 h-14 w-screen border-b-2 border-gray-300 shadow-sm border-solid flex items-center justify-center'>
            <nav className='bg-amber-200 w-6xl h-11 flex items-center justify-between px-4'>
                <div id='logo-and-lang' className='w-48 h-8 bg-amber-50 flex items-center'>
                    <Link to="/" onClick={handleLogoClick}>
                        <img src="/img/khmer24.webp" alt="Khmer24 Logo" className='w-36'/>
                    </Link>
                    <div className='m-3 cursor-pointer' onClick={changeLang}>
                        {/* Corrected Logic: Show the flag for the current language */}
                        {lang === "km" ? (
                            <img src="/img/km-40x40.webp" alt="Khmer Language" className="size-6" />
                        ) : (
                            <img src="/img/en-40x40.webp" alt="English Language" className='size-6'/>
                        )}
                    </div>
                </div>
                <div id='search' className='w-md h-10 relative'>
                    <div className='w-full flex absolute top-1/2 -translate-y-1/2'>
                        <button className='bg-blue-400 cursor-pointer py-1.5 border-2 border-r-[1px] w-36 flex-none'>All Category</button>
                        <input className='bg-blue-400 px-2 py-1.5 border-2 border-l-[1px] flex-1' type="text" />
                    </div>
                    <button className='right-2 cursor-pointer absolute top-1/2 -translate-y-1/2'>
                        <IoMdSearch className='size-6'/>
                    </button>
                </div>
                <div id='last-menu' className='w-2xs flex justify-between items-center bg-amber-100'>
                    <div id='login' className='flex flex-1 justify-between px-6 bg-blue-200'>
                        {!user ? (
                            <>
                                <b><Link to="/login" className='mx-1'>Login</Link></b>
                                <div className='mx-1'><b>Or</b></div>
                                <b><Link to="/register" className='mx-1'>Register</Link></b>
                            </>
                        ):(
                            <div className='flex justify-between items-center w-full'>
                                <Link to="">
                                    <FaBell className='size-6 '/>
                                </Link>
                                <Link to="">
                                    <IoChatbubbleEllipses className='size-6'/>
                                </Link>
                                <div>
                                    <ProfileDropdown className='size-8' />
                                    {/* <ProfileStyle classUtilities='border-1 border-blue-950 size-8' /> */}
                                </div>
                            </div>
                        )}
                    </div>
                    <div id='sell' className='bg-red-400 rounded-lg'>
                        <button onClick={() => navigate("/post")} className='flex items-center p-2 cursor-pointer'>
                            <MdAddAPhoto className='mx-0.5'/>
                            <b><span className='mx-0.5'>Sell</span></b>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
};

export default TopBar;