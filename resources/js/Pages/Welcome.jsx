import { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button, Card, Carousel } from 'antd';
import { 
    ArrowRightOutlined, 
    CalendarOutlined, 
    TeamOutlined, 
    TrophyOutlined,
    RocketOutlined 
} from '@ant-design/icons';

export default function Welcome({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: <CalendarOutlined className="text-4xl text-red-500" />,
            title: "Exciting Events",
            description: "Join various youth-focused activities and programs"
        },
        {
            icon: <TeamOutlined className="text-4xl text-blue-500" />,
            title: "Community",
            description: "Connect with fellow youth members in your barangay"
        },
        {
            icon: <TrophyOutlined className="text-4xl text-yellow-500" />,
            title: "Rewards",
            description: "Earn points and redeem exciting rewards"
        }
    ];

    const carouselImages = [
        '/youth1.jpg',
        '/youth2.jpg',
        '/youth3.jpg',
        '/youth4.jpg',
        '/youth5.jpg',
        // Add more images as needed
    ];

    return (
        <>
            <Head title="SK Barangay Casay" />
            
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${
                hasScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img 
                                src="/logo11.png" 
                                alt="Logo" 
                                className="h-12 w-auto" 
                            />
                            <h1 className="ml-3 text-2xl font-bold text-gray-800">
                                SK Barangay Casay
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            {auth.user ? (
                                <Link 
                                    href={route('dashboard')}
                                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link 
                                        href={route('login')}
                                        className="text-gray-600 hover:text-red-500 transition-colors duration-300"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        href={route('register')}
                                        className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                                    >
                                        Join Now
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white shadow-lg rounded-lg mx-4 mt-2 p-4"
                    >
                        {auth.user ? (
                            <Link 
                                href={route('dashboard')}
                                className="block text-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    href={route('login')}
                                    className="block text-center text-gray-600 hover:text-red-500 mb-2"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href={route('register')}
                                    className="block text-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                                >
                                    Join Now
                                </Link>
                            </>
                        )}
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                                Empowering the{' '}
                                <span className="text-red-500">Youth</span> of Today for a{' '}
                                <span className="text-yellow-500">Better Tomorrow</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Join the SK System to participate in events, access assistance, 
                                and showcase your talents while earning rewards.
                            </p>
                            <Link href={route('register')}>
                                <Button 
                                    type="primary" 
                                    size="large"
                                    icon={<RocketOutlined />}
                                    className="bg-red-500 hover:bg-red-600 border-none h-12 px-8 rounded-full"
                                >
                                    Get Started
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <Carousel autoplay effect="fade">
                                {carouselImages.map((image, index) => (
                                    <div key={index} className="h-[400px]">
                                        <img
                                            src={image}
                                            alt={`Youth Activity ${index + 1}`}
                                            className="w-full h-full object-cover rounded-lg shadow-xl"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">Why Join Us?</h2>
                        <p className="text-xl text-gray-600">
                            Discover the benefits of being part of our youth community
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card 
                                    className="h-full hover:shadow-lg transition-shadow duration-300"
                                    bordered={false}
                                >
                                    <div className="text-center">
                                        {feature.icon}
                                        <h3 className="text-xl font-semibold mt-4 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
                    <p>© 2024 SK Barangay Casay. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}