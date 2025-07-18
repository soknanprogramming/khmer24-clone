import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
            });

            if (response.status === 200) {
                navigate('/login');
            }
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response) {
                const { isNameExist, isPhoneNumberExist } = err.response.data;
                if (isNameExist) {
                    setError("First name already exists.");
                } else if (isPhoneNumberExist) {
                    setError("Phone number already exists.");
                } else {
                    setError("An unexpected error occurred.");
                }
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Register Page</h1>
            <form className="w-80" onSubmit={handleSubmit}>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="firstName">
                        First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                        Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="phoneNumber">
                        Phone Number<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="password">
                        Password<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">
                        Confirm Password<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </form>

            <p className="mt-4 text-sm">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-500 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;