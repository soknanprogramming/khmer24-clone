import React from "react";
import { Link } from "react-router-dom";

const AuthPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Welcome</h1>
            <p className="text-gray-600 mb-8">You'r need to login to sell or buy</p>

            <div className="flex flex-col gap-4 w-64">
                <Link
                    to="/login"
                    className="w-full text-center bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="w-full text-center bg-green-500 text-white py-3 rounded-lg shadow hover:bg-green-600 transition"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default AuthPage;
