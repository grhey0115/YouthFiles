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
   const [phoneNumberError, setPhoneNumberError] = useState(null);  
   const [phoneError, setPhoneError] = useState('');  
  
   useEffect(() => {  
      return () => {  
        reset('password', 'password_confirmation');  
      };  
   }, []);  

   const handlePhoneNumberChange = (e) => {  
    const value = e.target.value;  
    // Only allow numbers and limit to 9 digits  
    if (/^\d{0,10}$/.test(value)) {  
       setData('phone_number', `+639${value}`);  
        
       if (value.length < 10) {  
         setPhoneError('Please enter 9 digits after +639');  
       } else {  
         setPhoneError('');  
       }  
    }  
 };  
  
   const validatePhoneNumber = (phoneNumber) => {  
      const phoneNumberRegex = /^(\+639)\d{11}$/;  
      if (!phoneNumberRegex.test(phoneNumber)) {  
        setPhoneNumberError('Invalid phone number. Please use the format +639xxxxxxxxx.');  
      } else {  
        setPhoneNumberError(null);  
      }  
   };  
  
  
   const submit = (e) => {  
      e.preventDefault();  
      if (phoneNumberError) {  
        alert('Please fix the phone number error before submitting.');  
        return;  
      }  
      post(route('register'));  
   };  
  
   return (  
      <div className="flex min-h-screen bg-gray-100"style={{ paddingTop: '-40px' }}>  
        <div className="hidden lg:block w-1/3 bg-gradient-to-br from-red-400 via-blue-500 to-yellow-400 text-white p-8">  
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
                <div className="flex items-center">  
                    <span className="bg-gray-100 px-3 py-2 border border-r-0 rounded-l">+63</span>  
                    <TextInput  
                        id="phone_number"  
                        type="tel"  
                        name="phone_number"  
                        value={data.phone_number.substring(4)} // Remove prefix for display  
                        className="mt-0 rounded-l-none w-full"  
                        onChange={handlePhoneNumberChange}  
                        maxLength={11}  
                        placeholder="123456789"  
                        required  
                    />  
                </div>  
                {phoneError && <InputError message={phoneError} className="mt-2" />}  
                <span className="text-gray-500 text-sm mt-1">Enter 9 digits after +63</span>  
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
