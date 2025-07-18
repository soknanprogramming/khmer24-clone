import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../store/useUser";


const LoginPage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState(""); // assuming API expects phoneNumber
    const [password, setPassword] = useState("");
    const { login, loading, error, user, status } = useUser();
    const navigate = useNavigate();

    // If already logged in, redirect
    useEffect(() => {
        status(); // Check user status on mount
        if (user) {
            navigate("/"); // Redirect to homepage/dashboard
        }
    }, [user, navigate, status]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(phoneNumber, password); // Call Zustand login
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10 bg-gray-50">
            <div className="w-80 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                {error === "Request failed with status code 401" && (
                    <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-600 rounded">
                        Invalid phone number or password.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Phone Number */}
                    <div className="mb-4">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium mb-1"
                        >
                            Phone Number<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-1"
                        >
                            Password<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded text-white ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
