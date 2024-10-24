import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // State to manage password visibility
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
        <div className="flex min-h-screen bg-gray-100">
            <div className="hidden lg:block w-1/3 bg-gradient-to-r from-rose-400 to-red-500 text-white p-8">
                <div className="flex flex-col justify-center h-full items-center">
                    
                    <Link href="/" >
                        <img src="/logo11.png" alt="Logo" className="h-44 w-auto mb-6" />
                    </Link>
                    <h2 className="text-3xl font-bold text-center">GET THE LATEST NEWS AND EVENTS FOR THE YOUTH</h2>
                    <p className="mt-4 text-lg text-center">"Unveiling the Power of Casay,Dalaguete's Youth: Your Ultimate Destination for SK Updates and Engagements!"</p>
                </div>
            </div>
            <div className="flex flex-col justify-center w-full lg:w-1/2 pl-4 pr-4">
                <GuestLayout>
                    <Head title="Log in" />

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit} className="max-w-md mx-auto space-y-6 ">
                        <h2 className="text-2xl font-bold text-center">LOG IN</h2>
                        <div>
                            <InputLabel htmlFor="email" value="E-Mail Address" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible className="h-5 w-5 text-gray-600" />
                                    ) : (
                                        <AiOutlineEye className="h-5 w-5 text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <PrimaryButton className="ml-4 bg-blue-600 text-white hover:bg-blue-500 disabled:bg-red-300"  disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                        <div className="mt-6 text-center">
                    <span className="text-sm text-gray-600">
                        No Account?{' '}
                        <Link
                            href={route('register')}
                            className="text-blue-600 hover:underline"
                        >
                            Sign up here
                        </Link>
                    </span>
                </div>
                    </form>
                </GuestLayout>
            </div>
        </div>
    );
}
