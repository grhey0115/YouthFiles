import { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    // Add scroll event to trigger animation
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 200) {
                setHasScrolled(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Head title="Sk Barangay Casay" />
            <div className="bg-white min-h-screen text-black flex flex-col items-center justify-center p-5 relative">
                {/* Background Emojis/Icons */}
                <div className="absolute inset-0 overflow-hidden">
                    <span className="text-6xl absolute top-10 left-16 text-yellow-500 opacity-20 ">🎉</span>
                    <span className="text-6xl absolute top-20 right-20 text-red-500 opacity-20 ">📢</span>
                    <span className="text-6xl absolute bottom-24 left-24 text-yellow-500 opacity-20 ">🎯</span>
                    <span className="text-6xl absolute bottom-12 right-32 text-red-500 opacity-20 ">🚀</span>

                    {/* Additional Emojis */}
                    <span className="text-6xl absolute top-1/2 left-1/3 text-yellow-500 opacity-10 animate-bounce">💡</span>
                    <span className="text-6xl absolute top-48 right-12 text-red-500 opacity-10 animate-bounce">🌟</span>
                    <span className="text-6xl absolute bottom-1/4 left-1/4 text-yellow-500 opacity-10 animate-bounce">🔥</span>
                    <span className="text-6xl absolute bottom-36 right-1/4 text-red-500 opacity-10 animate-bounce">🎈</span>

                    {/* More Emojis */}
                    <span className="text-6xl absolute top-5 left-5 text-red-500 opacity-15 ">⭐</span>
                    <span className="text-6xl absolute top-16 right-40 text-yellow-500 opacity-15 ">📅</span>
                    <span className="text-6xl absolute bottom-10 left-20 text-red-500 opacity-20 ">🏆</span>
                    <span className="text-6xl absolute bottom-16 right-5 text-yellow-500 opacity-15 ">🚩</span>

                    {/* More Emojis */}
                    <span className="text-6xl absolute top-32 left-10 text-red-500 opacity-10 ">👑</span>
                    <span className="text-6xl absolute top-20 left-48 text-yellow-500 opacity-20 ">🎓</span>
                    <span className="text-6xl absolute bottom-44 left-16 text-red-500 opacity-10 ">🎵</span>
                    <span className="text-6xl absolute bottom-10 right-10 text-red-500 opacity-20 ">📚</span>

                    {/* More Emojis */}
                    <span className="text-6xl absolute top-72 left-5 text-yellow-500 opacity-15 ">💬</span>
                    <span className="text-6xl absolute top-56 right-16 text-red-500 opacity-15 ">🏅</span>
                </div>

                {/* Top Navigation */}
                <div className="w-full p-3 flex justify-between items-center bg-white shadow-md fixed top-0 left-0 z-50">
                    <div className="flex items-center">
                        <img src="/logo11.png" alt="Logo" className="h-12" />
                        <h1 className="ml-2 text-2xl font-sans text-black">Sk Barangay Casay</h1>
                    </div>
                    <div className="hidden md:flex">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-red-600 hover:underline">
                                Home
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="mr-2 text-red-600 py-2 px-4 rounded-full hover:bg-red-100">
                                    Login
                                </Link>
                                <Link href={route('register')} className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600">
                                    Join Now
                                </Link>
                            </>
                        )}
                    </div>
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg rounded-lg p-4 absolute top-16 right-4 z-50">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="block text-red-600 hover:underline mb-2">
                                Home
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="block mb-2 bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600">
                                    Login
                                </Link>
                                <Link href={route('register')} className="block bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600">
                                    Join Now
                                </Link>
                            </>
                        )}
                    </div>
                )}

                {/* Content Section */}
                <div className="mt-24 text-center max-w-3xl">
                    <h2 className="text-6xl font-bold leading-tight">
                        Empowering the <span className="text-red-500">Youth</span> of Today for a <span className="text-yellow-500">Better Tomorrow</span>
                    </h2>
                    <p className="mt-6 text-xl text-gray-700">
                        Join the SK System to participate in events, access assistance, and showcase your talents.
                    </p>

                    {/* Call-to-Action Button */}
                    <Link
                        href={route('register')}
                        className="mt-8 inline-block bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
                        style={{
                            boxShadow: '4px 4px 0px black',
                        }}>
                        Join Us Now
                    </Link>
                </div>

                {/* Image Section */}
                <div className="mt-10 flex justify-center animate-fade-in-slow">
                    <img src="/youth5.png" alt="Youth Vector" className="-mt-24 w-screen h-auto transition-transform duration-300 ease-in-out hover:scale-105" />
                </div>

                {/* Programs Section */}
                <div className={`mt-16 w-full text-center transition-opacity duration-500 ease-in-out ${hasScrolled ? 'opacity-100' : 'opacity-0'}`}>
                    <h3 className="text-3xl font-semibold mb-8" style={{ color: '#FF5733' }}>Engage in Youth Programs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white shadow-md rounded-lg transition-transform duration-300 ease-in-out hover:scale-105" style={{ borderColor: '#18BC9C', borderWidth: '2px' }}>
                            <h4 className="text-xl font-bold mb-2" style={{ color: '#2C3E50' }}>Youth Leadership</h4>
                            <p style={{ color: '#333333' }}>Get involved in exciting youth-focused programs that promote personal growth, leadership, and community involvement.</p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg transition-transform duration-300 ease-in-out hover:scale-105" style={{ borderColor: '#18BC9C', borderWidth: '2px' }}>
                            <h4 className="text-xl font-bold mb-2" style={{ color: '#2C3E50' }}>Attend Exclusive Events</h4>
                            <p style={{ color: '#333333' }}>From skill-building workshops to fun community gatherings, SK events are designed to inspire and connect young leaders like you.</p>
                        </div>
                       

                        <div className="p-6 bg-white shadow-md rounded-lg transition-transform duration-300 ease-in-out hover:scale-105" style={{ borderColor: '#18BC9C', borderWidth: '2px' }}>
                            <h4 className="text-xl font-bold mb-2" style={{ color: '#2C3E50' }}>Access Assistance and Resources</h4>
                            <p style={{ color: '#333333' }}>Receive support and resources to help you thrive, whether you're working on personal projects or contributing to community initiatives.</p>
                        </div>
                    </div>
                </div>

                {/* Events Section */}
                <div className={`mt-16 w-full text-center transition-opacity duration-500 ease-in-out ${hasScrolled ? 'opacity-100' : 'opacity-0'}`}>
                    <h3 className="text-3xl font-semibold mb-8" style={{ color: '#FF5733' }}>Upcoming Events</h3>
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md animate-fade-in-slow">
                        <p className="text-lg" style={{ color: '#333333' }}>No events currently. Check back later for updates!</p>
                    </div>
                </div>

                <footer className="mt-auto p-5 text-center w-full bg-white fixed bottom-0 animate-fade-in-slow" style={{ backgroundColor: '#ffffff', opacity: .3, color: '#000000' }}>
                 
                </footer>
            </div>
        </>
    );
}
