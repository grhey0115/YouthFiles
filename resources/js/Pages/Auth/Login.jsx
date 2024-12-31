import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { 
    AiOutlineEye, 
    AiOutlineEyeInvisible, 
    AiOutlineMail,
    AiOutlineLock,
    AiOutlineLogin,
    AiOutlineTeam
} from 'react-icons/ai';

export default function Login({ status, error, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-red-100">
            <div className="flex flex-col lg:flex-row h-full">
                {/* Left Banner Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-400 via-blue-500 to-yellow-400 p-8 
                              lg:min-h-screen items-center justify-center relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-white"></div>
                            <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-4 border-white"></div>
                            <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full border-4 border-white"></div>
                        </div>
                    </div>
                    
                    <div className="relative text-white text-center z-10 space-y-8">
                        <Link href="/" className="block transform hover:scale-105 transition-transform duration-300">
                            <img src="/logo11.png" alt="SK Logo" className="h-40 w-auto mx-auto drop-shadow-2xl" />
                        </Link>
                        <div className="space-y-6 max-w-xl">
                            <h2 className="text-4xl font-bold leading-tight">
                                SANGGUNIANG KABATAAN PORTAL
                            </h2>
                            <h3 className="text-2xl font-semibold text-red-200">
                                Casay, Dalaguete Youth Council
                            </h3>
                            <p className="text-xl text-blue-100 leading-relaxed">
                                Empowering the youth through active participation, leadership, and community service.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Login Form Section */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex flex-col items-center gap-4 mb-8">
                            <Link href="/">
                                <img src="/logo11.png" alt="SK Logo" className="h-32 w-auto" />
                            </Link>
                            <h2 className="text-2xl font-bold text-center text-red-800">
                                SK Casay Youth Portal
                            </h2>
                        </div>

                        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-red-100">
                            <div className="flex flex-col items-center gap-3 mb-8">
                                <div className="bg-red-100 p-4 rounded-full">
                                    <AiOutlineTeam className="text-4xl text-red-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800">Member Login</h2>
                                <p className="text-gray-600 text-center">Access your SK member account</p>
                            </div>

                            {status && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-red-700 rounded-xl">
                                    {status}
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="email" value="Email Address" required />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <AiOutlineMail className="text-red-400" />
                                        </div>
                                        <TextInput
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            className="pl-10 w-full focus:ring-2 focus:ring-red-500 rounded-xl"
                                            autoComplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password" value="Password" required />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <AiOutlineLock className="text-red-400" />
                                        </div>
                                        <TextInput
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            className="pl-10 w-full focus:ring-2 focus:ring-red-500 rounded-xl"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            {showPassword ? (
                                                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500 hover:text-red-500" />
                                            ) : (
                                                <AiOutlineEye className="h-5 w-5 text-gray-500 hover:text-red-500" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="rounded border-gray-300 text-green-red focus:ring-red-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-red-600 hover:text-red-700 hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <PrimaryButton
                                        className="w-full px-8 py-4 bg-red-600 hover:bg-red-700 
                                                disabled:bg-red-700 transition-all duration-300 transform hover:scale-102
                                                rounded-xl flex items-center justify-center gap-2 text-lg"
                                        disabled={processing}
                                    >
                                        <AiOutlineLogin className="text-xl" />
                                        Sign In to Portal
                                    </PrimaryButton>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        Not a registered member?{' '}
                                        <Link
                                            href={route('register')}
                                            className="text-red-600 hover:underline font-medium"
                                        >
                                            Register here
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}