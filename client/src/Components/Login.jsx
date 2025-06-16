import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Config } from '../../URL/Config';
import { useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import api from '../../URL/CustomApi';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    const {setAuth,setUser, checkAuth} = useContext(AuthContext)

    const Submit = async (data) => {
        setErrors("");
        setIsLoading(true);
        try {
            const response = await api.post(Config.LOGINUrl, {
                email: data.email,
                password: data.password
            });
            if (response) {
                await checkAuth()
                navigate("/HomePage")
            }
        } catch (error) {
            setErrors(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (tokenResponse) => {
        try {
            setIsLoading(true);
            setErrors("");

            const userInfoResponse = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`
                    }
                }
            );

            const googleUser = userInfoResponse.data;
          
            const response = await api.post(Config.GoogleSignUpUrl, {
                email: googleUser.email,
                name: googleUser.name,
                googleId: googleUser.sub,
                picture: googleUser.picture
            });

            if (response.data) {
                await checkAuth()
                navigate("/HomePage")
            }
        } catch (error) {
            setErrors(error.response?.data?.message || "Failed to login with Google");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: (error) => {
            setErrors("Failed to login with Google");
        }
    });

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{
                backgroundImage: `url('/img4.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Very subtle overlay to enhance readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-purple-50/20 backdrop-blur-[1px]"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md z-10"
            >
                {/* Logo Section */}
                <motion.div 
                    className="mb-8 text-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 shadow-sm">
                            <img 
                                className="h-14 w-14 mx-auto" 
                                src="/logo.jpeg" 
                                alt="Logo" 
                            />
                        </div>
                    </div>
                    <motion.h1 
                        className="text-3xl font-bold text-gray-800 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Welcome Back!
                    </motion.h1>
                    <motion.p 
                        className="text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Please enter your details to sign in
                    </motion.p>
                </motion.div>

                {/* Semi-transparent Login Form */}
                <motion.form 
                    onSubmit={handleSubmit(Submit)} 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white p-6 space-y-6 shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.5)'
                    }}
                >
                    {/* Google Login Button */}
                    <motion.button
                        type="button"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium shadow-sm"
                        onClick={() => handleGoogleLogin()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <img
                            src="/google.jfif"
                            alt="Google logo"
                            className="w-6 h-6 rounded-full"
                        />
                        Sign in with Google
                    </motion.button>

                    <div className="relative flex py-3 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                {...register("email", {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className={`w-full px-4 py-3 rounded-xl bg-white/90 border ${
                                    errors.email ? 'border-rose-500' : 'border-gray-200'
                                } focus:outline-none focus:ring-2 focus:ring-purple-300/50 text-gray-800 placeholder-gray-400 transition-all duration-300`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-2 text-sm text-rose-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                {...register("password", {
                                    required: true,
                                    maxLength: 20
                                })}
                                className={`w-full px-4 py-3 rounded-xl bg-white/90 border ${
                                    errors.password ? 'border-rose-500' : 'border-gray-200'
                                } focus:outline-none focus:ring-2 focus:ring-purple-300/50 text-gray-800 placeholder-gray-400 transition-all duration-300`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                        {errors && (
                            <p className="mt-2 text-sm text-rose-500">{errors}</p>
                        )}
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <Link
                            to="/forgot-password"
                            className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-300"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl py-3.5 font-bold hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </motion.button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            to={"/register"}
                            className="font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                        >
                            Sign up
                        </Link>
                    </div>
                </motion.form>
            </motion.div>
            
            {/* Subtle decorative elements */}
            <motion.div 
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-200/20 blur-2xl"
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            <motion.div 
                className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-indigo-200/20 blur-2xl"
                animate={{
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                }}
            />
        </div>
    );
}

export default Login;