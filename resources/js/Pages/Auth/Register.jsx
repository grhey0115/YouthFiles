import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
   AiOutlineEye, 
   AiOutlineEyeInvisible, 
   AiOutlineCheckCircle, 
   AiOutlineCloseCircle,
   AiOutlineUser,
   AiOutlineMail,
   AiOutlinePhone,
   AiOutlineLock,
   AiOutlineIdcard,
   AiOutlineUserAdd,
   AiOutlineLogin,
   AiOutlineTeam
} from 'react-icons/ai';

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
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    useEffect(() => {
        setPasswordStrength({
            length: data.password.length >= 8,
            uppercase: /[A-Z]/.test(data.password),
            lowercase: /[a-z]/.test(data.password),
            number: /[0-9]/.test(data.password),
            special: /[!@#$%^&*]/.test(data.password),
        });
    }, [data.password]);

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setData('phone_number', value.length === 10 ? `+63${value}` : value);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const isPasswordStrong = Object.values(passwordStrength).every(Boolean);
        if (!isPasswordStrong) {
            alert('Please ensure your password meets all requirements.');
            return;
        }
        post(route('register'));
    };

    const PasswordStrengthIndicator = ({ criteria, met }) => (
        <div className="flex items-center gap-2 text-sm">
            {met ? (
                <AiOutlineCheckCircle className="text-red-500" />
            ) : (
                <AiOutlineCloseCircle className="text-red-500" />
            )}
            <span className={met ? 'text-red-600' : 'text-gray-600'}>{criteria}</span>
        </div>
    );

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
                                Join our community of empowered youth leaders and make a difference in Casay, Dalaguete.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Registration Form Section */}
                <div className="flex-1 py-8 px-4 lg:px-8">
                    <div className="max-w-2xl mx-auto">
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
                                <h2 className="text-3xl font-bold text-gray-800">Youth Member Registration</h2>
                                <p className="text-gray-600 text-center">Join the Sangguniang Kabataan community</p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="relative">
                                        <InputLabel htmlFor="first_name" value="First Name" required />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <AiOutlineUser className="text-red-400" />
                                            </div>
                                            <TextInput
                                                id="first_name"
                                                value={data.first_name}
                                                onChange={e => setData('first_name', e.target.value)}
                                                className="pl-10 w-full focus:ring-2 focus:ring-red-500 rounded-xl"
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.first_name} />
                                    </div>

                                    <div className="relative">
                                        <InputLabel htmlFor="middle_name" value="Middle Name" />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <AiOutlineIdcard className="text-red-400" />
                                            </div>
                                            <TextInput
                                                id="middle_name"
                                                value={data.middle_name}
                                                onChange={e => setData('middle_name', e.target.value)}
                                                className="pl-10 w-full focus:ring-2 focus:ring-red-500 rounded-xl"
                                            />
                                        </div>
                                        <InputError message={errors.middle_name} />
                                    </div>

                                    <div className="relative">
                                        <InputLabel htmlFor="last_name" value="Last Name" required />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <AiOutlineUser className="text-red-400" />
                                            </div>
                                            <TextInput
                                                id="last_name"
                                                value={data.last_name}
                                                onChange={e => setData('last_name', e.target.value)}
                                                className="pl-10 w-full focus:ring-2 focus:ring-red-500 rounded-xl"
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.last_name} />
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="phone_number" value="Phone Number" required />
                                        <div className="relative flex">
                                            <span className="inline-flex items-center px-3 bg-red-50 border border-r-0 border-green-200 rounded-l-xl">
                                                <AiOutlinePhone className="text-red-400" />
                                                +63
                                            </span>
                                            <TextInput
                                                id="phone_number"
                                                type="tel"
                                                value={data.phone_number.replace('+63', '')}
                                                onChange={handlePhoneNumberChange}
                                                className="rounded-l-none rounded-r-xl w-full focus:ring-2 focus:ring-red-500"
                                                placeholder="9123456789"
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.phone_number} />
                                    </div>

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
                                                onChange={e => setData('email', e.target.value)}
                                                className="pl-10 w-full focus:ring-2 focus:ring-red-500 rounded-xl"
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>
                                </div>

                                {/* Password Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                onChange={e => setData('password', e.target.value)}
                                                className="pl-10 w-full focus:ring-2 focus:ring-red-500 rounded-xl"
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

                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" required />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <AiOutlineLock className="text-red-400" />
                                            </div>
                                            <TextInput
                                                id="password_confirmation"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={data.password_confirmation}
                                                onChange={e => setData('password_confirmation', e.target.value)}
                                                className="pl-10 w-full focus:ring-2 focus:ring-red-500 rounded-xl"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                            >
                                                {showConfirmPassword ? (
                                                    <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500 hover:text-red-500" />
                                                ) : (
                                                    <AiOutlineEye className="h-5 w-5 text-gray-500 hover:text-red-500" />
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>

                                {/* Password Requirements */}
                                <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                                    <h3 className="text-sm font-medium text-red-800 mb-3">Password Requirements:</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <PasswordStrengthIndicator criteria="At least 8 characters" met={passwordStrength.length} />
                                        <PasswordStrengthIndicator criteria="One uppercase letter" met={passwordStrength.uppercase} />
                                        <PasswordStrengthIndicator criteria="One lowercase letter" met={passwordStrength.lowercase} />
                                        <PasswordStrengthIndicator criteria="One number" met={passwordStrength.number} />
                                        <PasswordStrengthIndicator criteria="One special character" met={passwordStrength.special} />
                                    </div>
                                </div>

                                {/* Submit Button and Login Link */}
                                <div className="flex flex-col items-center gap-4">
                                    <PrimaryButton
                                        className="w-full md:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 
                                                 disabled:bg-red-300 transition-all duration-300 transform hover:scale-102
                                                 rounded-xl flex items-center justify-center gap-2 text-lg"
                                        disabled={processing}
                                    >
                                        <AiOutlineUserAdd className="text-xl" />
                                        Register as SK Member
                                    </PrimaryButton>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <AiOutlineLogin className="text-red-600" />
                                        Already a member?{' '}
                                        <Link href={route('login')} className="text-red-600 hover:underline font-medium">
                                            Sign in to your account
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
