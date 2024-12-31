import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { motion } from 'framer-motion';

export default function PendingApproval() {
    return (
        <GuestLayout>
            <Head title="Pending Approval" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-center">
                            {/* Animated Clock */}
                            <div className="mb-8">
                                <motion.div
                                    animate={{
                                        rotate: 360
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="mx-auto w-16 h-16"
                                >
                                    <svg 
                                        className="text-yellow-400 w-full h-full" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <circle 
                                            className="opacity-25" 
                                            cx="12" 
                                            cy="12" 
                                            r="10" 
                                            strokeWidth="4"
                                        />
                                        <path 
                                            className="opacity-75" 
                                            d="M12 6v6l4 2"
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="4"
                                        />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Status Badge */}
                            <div className="mb-6">
                                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    Pending Review
                                </span>
                            </div>

                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Account Pending Approval
                            </h2>

                            {/* Progress Steps */}
                            <div className="mb-8">
                                <div className="flex justify-center items-center space-x-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm mt-2 text-gray-600">Registration</span>
                                    </div>
                                    <div className="w-16 h-0.5 bg-gray-200">
                                        <div className="w-full h-full bg-green-500"></div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm mt-2 text-gray-600">Profile</span>
                                    </div>
                                    <div className="w-16 h-0.5 bg-gray-200">
                                        <div className="w-full h-full bg-yellow-400"></div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm mt-2 text-gray-600">Approval</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    Thank you for completing your profile! Your account is currently pending approval from our administrators.
                                </p>
                                <p className="text-gray-600">
                                    We will notify you via email once your account has been approved. Please check your email regularly.
                                </p>

                                {/* Estimated Time */}
                                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm text-blue-700">
                                            Estimated approval time: 24-48 hours
                                        </span>
                                    </div>
                                </div>

                                {/* Contact Support */}
                                <div className="mt-6 border-t pt-6">
                                    <p className="text-sm text-gray-500">
                                        Need help? Contact support at{' '}
                                        <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-800">
                                            skbrgycasay@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
} 