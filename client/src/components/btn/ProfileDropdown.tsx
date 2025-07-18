import React, { useState, useRef, useEffect } from "react";
import useUser from "../../store/useUser";

type ProfileDropdownProps = {
    className?: string;
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({className}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { logout } = useUser();

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative inline-block text-left top-1`} ref={dropdownRef}>
            {/* Profile Image */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`${className}  rounded-full border-2 border-blue-500 cursor-pointer overflow-hidden`}
            >
                <img
                    src="/profile/user-icon.webp"
                    alt="User"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <a
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Profile
                        </a>
                        <a
                            href="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Settings
                        </a>
                        <button
                            onClick={logout}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
