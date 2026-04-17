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
        <header className='bg-white z-80 sticky top-0 h-16 w-screen border-b border-gray-200 shadow-sm flex items-center justify-center'>
            <nav className='w-6xl h-full flex items-center justify-between px-4'>
                <div id='logo-and-lang' className='flex items-center space-x-4'>
                    <Link to="/" onClick={handleLogoClick}>
                        <img src="/img/khmer24.webp" alt="Khmer24 Logo" className='w-32'/>
                    </Link>
                    <div className='cursor-pointer hover:opacity-80 transition-opacity' onClick={changeLang}>
                        {lang === "km" ? (
                            <img src="/img/km-40x40.webp" alt="Khmer Language" className="size-6 rounded-full border border-gray-200" />
                        ) : (
                            <img src="/img/en-40x40.webp" alt="English Language" className='size-6 rounded-full border border-gray-200'/>
                        )}
                    </div>
                </div>
                
                <div id='search' className='w-md h-10 flex items-center bg-gray-100 rounded-md overflow-hidden border border-gray-300 focus-within:border-primary transition-colors'>
                    <button className='px-4 text-sm font-medium text-gray-600 hover:bg-gray-200 h-full border-r border-gray-300'>
                        All Categories
                    </button>
                    <input 
                        className='flex-1 px-3 py-1.5 bg-transparent outline-none text-gray-700' 
                        type="text" 
                        placeholder="What are you looking for?"
                    />
                    <button className='px-4 text-gray-500 hover:text-primary transition-colors'>
                        <IoMdSearch className='size-6'/>
                    </button>
                </div>

                <div id='last-menu' className='flex items-center space-x-6'>
                    <div id='auth' className='flex items-center space-x-3 text-sm font-semibold'>
                        {!user ? (
                            <>
                                <Link to="/login" className='text-gray-700 hover:text-primary'>Login</Link>
                                <span className='text-gray-300'>|</span>
                                <Link to="/register" className='text-gray-700 hover:text-primary'>Register</Link>
                            </>
                        ):(
                            <div className='flex items-center space-x-4'>
                                <Link to="" className='text-gray-600 hover:text-primary'>
                                    <FaBell className='size-5'/>
                                </Link>
                                <Link to="" className='text-gray-600 hover:text-primary'>
                                    <IoChatbubbleEllipses className='size-6'/>
                                </Link>
                                <ProfileDropdown className='size-8 border border-gray-200 rounded-full' />
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => navigate("/post")} 
                        className='bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-md font-bold flex items-center transition-colors shadow-sm'
                    >
                        <MdAddAPhoto className='mr-2'/>
                        <span>Sell</span>
                    </button>
                </div>
            </nav>
        </header>
    )
};

export default TopBar;