import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="flex min-h-screen bg-gray-100"style={{ paddingTop: '-40px' }}>
            <div className="hidden lg:block w-1/3 bg-gradient-to-r from-rose-400 to-red-500 text-white p-8">
                <div className="flex flex-col justify-center h-full items-center">
                    <Link href="/" >
                    <img src="/logo11.png" alt="Logo" className="h-44 w-auto"  />
                    </Link>
                    <h2 className="text-3xl font-bold text-center">GET THE LATEST NEWS AND EVENTS FOR THE YOUTH</h2>
                    <p className="mt-4 text-lg text-center">"Unveiling the Power of Casay, Dalaguete's Youth: Your Ultimate Destination for SK Federation Updates and Engagements!"</p>
                </div>
            </div>
            <div className="flex flex-col justify-center w-full lg:w-1/2 pl-2 pr-2 ">
                <GuestLayout>
                    <Head title="Create Your Account" />
                    <h2 className="text-2xl font-bold mb-6"> CREATE YOUR ACCOUNT</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="mb-4">
                            <InputLabel htmlFor="first_name" value="First Name" />
                            <TextInput
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                className="mt-1 block w-full"
                                onChange={e => setData('first_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.first_name} className="mt-2" />
                        </div>

                        <div className="flex mb-4 -mx-2">
                            <div className="px-2 w-1/2">
                                <InputLabel htmlFor="middle_name" value="Middle Name" />
                                <TextInput
                                    id="middle_name"
                                    type="text"
                                    name="middle_name"
                                    value={data.middle_name}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('middle_name', e.target.value)}
                                />
                                <InputError message={errors.middle_name} className="mt-2" />
                            </div>
                            <div className="px-2 w-1/2">
                                <InputLabel htmlFor="last_name" value="Last Name" />
                                <TextInput
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('last_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.last_name} className="mt-2" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="phone_number" value="Phone Number" />
                            <TextInput
                                id="phone_number"
                                type="tel"
                                name="phone_number"
                                value={data.phone_number}
                                className="mt-1 block w-full"
                                onChange={e => setData('phone_number', e.target.value)}
                                required
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="email" value="E-Mail Address" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={e => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full pr-10"
                                    autoComplete="new-password"
                                    onChange={e => setData('password', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
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

                        <div className="mb-6">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                            <div className="relative">
                                <TextInput
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full pr-10"
                                    autoComplete="new-password"
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible className="h-5 w-5 text-gray-600" />
                                    ) : (
                                        <AiOutlineEye className="h-5 w-5 text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <PrimaryButton className=" bg-blue-600 text-white hover:bg-blue-500 disabled:bg-red-300" disabled={processing}>  
                                Register
                            </PrimaryButton>
                            
                        </div>
                        <div className="mt-6 text-center">
                    <span className="text-sm text-gray-600">
                        Already Registered?{' '}
                        <Link
                            href={route('login')}
                            className="text-blue-600 hover:underline"
                        >
                            Log In here
                        </Link>
                    </span>
                </div>
                    </form>
                </GuestLayout>
            </div>
        </div>
    );
}