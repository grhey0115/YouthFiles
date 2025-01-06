import { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Badge, Typography, Space, Drawer, Button, Modal, Avatar, List, Empty, Spin } from 'antd';
import {
    MenuOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    CalendarOutlined,
    QuestionCircleOutlined,
    FundOutlined,
    CalendarFilled,
    HeartFilled,
    AppstoreFilled,
    CustomerServiceFilled,
    HomeOutlined,
    BellOutlined,
    LoadingOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react'; // Import route
import axios from 'axios';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const { Header, Content } = Layout;

export default function Authenticated({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user || {};
    const [notifications, setNotifications] = useState([]);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
    const [loadingNotifications, setLoadingNotifications] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [showAllNotifications, setShowAllNotifications] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoadingNotifications(true);
            try {
                const response = await axios.get(route('notifications.index'));
              
                setNotifications(response.data.data || []);
                setUnreadNotificationsCount((response.data.data || []).filter(n => !n.read_at).length);
            } catch (error) {
                
                setNotifications([]);
            } finally {
                setLoadingNotifications(false);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setUnreadNotificationsCount(notifications.filter(n => !n.read_at).length);
    }, [notifications]);


    useEffect(() => {
        // Set initial mobile state
        setIsMobile(window.innerWidth < 768);
        
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const fullName = `${user.first_name || ''} ${user.middle_name ? user.middle_name + ' ' : ''}${user.last_name || ''}`.trim();

    const notificationMenuItems = loadingNotifications ? (
        [{ key: 'loading', label: <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> }]
    ) : (
        notifications.length > 0 ? notifications.map(notification => ({
            key: notification.id,
            label: (
                <Menu.Item onClick={() => openNotificationModal(notification)} style={{ padding: '8px 12px' }}>
                    <List.Item.Meta
                        title={<Typography.Text strong={!notification.read_at} style={{ fontSize: isMobile ? '12px' : '14px' }}>{notification.data.title}</Typography.Text>}
                        description={
                            <>
                                <Typography.Paragraph 
                                    className="notification-message" 
                                    style={{ 
                                        margin: 0, 
                                        fontSize: isMobile ? '10px' : '12px', 
                                        maxWidth: '300px', // Set max width for notification message
                                        overflowWrap: 'break-word', // Ensure long words break
                                        wordWrap: 'break-word', // For older browsers
                                    }}
                                >
                                    {notification.data.message}
                                </Typography.Paragraph>
                                <Typography.Text type="secondary" style={{ fontSize: '10px' }}>{new Date(notification.created_at).toLocaleString()}</Typography.Text>
                            </>
                        }
                    />
                </Menu.Item>
            )
        })) : [{ key: 'empty', label: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No new notifications" /> }]
    );

    // Add this function near the top of your component, with your other functions
const getNotificationIcon = (type) => {
    const iconProps = { className: "text-lg" };
    
    switch (type) {
        case 'event':
            return <CalendarOutlined {...iconProps} style={{ color: '#1890ff' }} />;
        case 'ayuda':
            return <HeartFilled {...iconProps} style={{ color: '#f5222d' }} />;
        case 'project':
            return <AppstoreFilled {...iconProps} style={{ color: '#52c41a' }} />;
        case 'success':
            return <CheckCircleOutlined {...iconProps} style={{ color: '#52c41a' }} />;
        case 'warning':
            return <ExclamationCircleOutlined {...iconProps} style={{ color: '#faad14' }} />;
        case 'error':
            return <CloseCircleOutlined {...iconProps} style={{ color: '#ff4d4f' }} />;
        case 'info':
            return <InfoCircleOutlined {...iconProps} style={{ color: '#1890ff' }} />;
        default:
            return <BellOutlined {...iconProps} style={{ color: '#8c8c8c' }} />;
    }
};

    const userRoles = user.roles ? user.roles.map(role => role.name) : [];
    const isAdmin = userRoles.includes('super_admin') || userRoles.includes('panel_user');

    const userMenu = {  
        items: [  
          {  
             key: 'profile',  
             icon: <UserOutlined />,  
             label: <Link href={route('profile.view')}>Profile</Link>  
          },  
          {  
             key: 'Manage',  
             icon: <SettingOutlined />,  
             label: <Link href={route('profile.edit')}>Manage Account</Link>  
          },  
          {  
             key: 'logout',  
             icon: <LogoutOutlined />,  
             label: <Link href={route('logout')} method="post" as="button">Log Out</Link>  
          },  
          ...(isAdmin ? [  
             {  
                key: 'admin',  
                icon: <UserOutlined />,  
                label: <Link href={route('admin.dashboard')}>Admin</Link>  
             },  
          ] : []),  
        ]  
     };  

    const menuItems = [
        { 
            key: 'dashboard', 
            icon: <CalendarFilled className="text-xl" />, 
            label: 'Join Events', 
            routeName: 'dashboard',
            mobileLabel: 'Events',
        },
        { 
            key: 'ayuda', 
            icon: <HeartFilled className="text-xl" />, 
            label: 'Assistance', 
            routeName: 'ayuda.index',
            mobileLabel: 'Aid',
        },
        { 
            key: 'projects', 
            icon: <AppstoreFilled className="text-xl" />, 
            label: 'SK-Projects', 
            routeName: 'projects.index',
            mobileLabel: 'Projects',
           
        },
        { 
            key: 'help-center', 
            icon: <CustomerServiceFilled className="text-xl" />, 
            label: 'Help Center', 
            routeName: 'help-center',
            mobileLabel: 'Help',
        },
    ];

    const renderMenuItems = (mode) => (
        <Menu
            items={menuItems.map(item => ({
                key: item.key,
                icon: item.icon,
                label: <Link href={route(item.routeName)}>{item.label}</Link>,
            }))}
            mode={mode}
            selectedKeys={menuItems.filter(item => route().current(item.routeName)).map(item => item.key)}
            style={{ flex: 1, justifyContent: 'center' }}
        />
    );

    const openNotificationModal = async (notification) => {
        setSelectedNotification(notification);
        setIsModalOpen(true);

        if (!notification.read_at) {
            try {
                await markNotificationAsRead([notification.id]);
                const updatedNotifications = notifications.map((n) =>
                    n.id === notification.id ? { ...n, read_at: new Date().toISOString() } : n
                );
                setNotifications(updatedNotifications);
                setUnreadNotificationsCount(updatedNotifications.filter(n => !n.read_at).length);
            } catch (error) {
                console.error('Failed to mark notification as read:', error);
            }
        }
    };

    const markNotificationAsRead = async (notificationIds) => {
        const response = await fetch(route('notifications.markAsRead'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({ notificationIds }),
        });

        if (!response.ok) {
            throw new Error('Failed to mark notification as read');
        }
    };

    const closeNotificationModal = () => {
        setIsModalOpen(false);
        setSelectedNotification(null);
    };

    const LogoSection = () => (
        <div className="flex items-center gap-3">
            <Link href={route('dashboard')} className="shrink-0">
                <ApplicationLogo className="block h-8 w-auto" />
            </Link>
            <div className={`border-l pl-3 ${isMobile ? 'hidden' : 'block'}`}>
                <h1 className="text-lg font-semibold text-gray-900">SK Brgy. Casay</h1>
                <p className="text-xs text-gray-500">Youth Information System</p>
            </div>
        </div>
    );

    const markAllAsRead = async () => {
        try {
            await markNotificationAsRead(notifications.map(notification => notification.id));
            const updatedNotifications = notifications.map(notification => ({ ...notification, read_at: new Date().toISOString() }));
            setNotifications(updatedNotifications);
            setUnreadNotificationsCount(0);
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {isMobile ? (
                // Mobile Header with fixed notification overlap
                <Header 
                    className="fixed w-full z-50"
                    style={{
                        padding: 0,
                        background: '#fff',
                        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
                        height: '60px',
                    }}
                >
                    <div className="flex items-center justify-between px-4 h-full">
                        <div className="flex items-center gap-2 flex-1">
                            <Link href={route('dashboard')} className="shrink-0">
                                <ApplicationLogo className="block h-7 w-auto" />
                            </Link>
                            <div className="border-l pl-2">
                                <h1 className="font-semibold text-gray-900 text-[13px] leading-tight">
                                    SK Brgy. Casay
                                </h1>
                                <p className="text-gray-500 text-[9px] leading-tight">
                                    Youth Information System
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 ml-2">
                            <Dropdown
                                menu={{
                                    items: loadingNotifications ? [
                                        {
                                            key: 'loading',
                                            label: (
                                                <div className="flex justify-center p-2">
                                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                                                </div>
                                            )
                                        }
                                    ] : notifications.length > 0 ? [
                                        {
                                            key: 'header',
                                            label: (
                                                <div className="p-2 border-b">
                                                    <div className="flex justify-between items-center">
                                                        <Typography.Text strong>Notifications</Typography.Text>
                                                        <Button 
                                                            type="link" 
                                                            size="small"
                                                            onClick={() => markAllAsRead()}
                                                        >
                                                            Mark all as read
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        ...notifications.map(notification => ({
                                            key: notification.id,
                                            label: (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    className={`
                                                        p-2 border-b cursor-pointer transition-colors
                                                        ${!notification.read_at ? 'bg-blue-50' : 'hover:bg-gray-50'}
                                                    `}
                                                    onClick={() => openNotificationModal(notification)}
                                                >
                                                    <div className="flex gap-2">
                                                        <div className="flex-shrink-0 pt-1">
                                                            {getNotificationIcon(notification.type)}
                                                        </div>
                                                        <div className="flex-grow min-w-0">
                                                            <Typography.Text 
                                                                strong={!notification.read_at}
                                                                className="block text-xs"
                                                                style={{ marginBottom: 2 }}
                                                            >
                                                                {notification.data.title}
                                                            </Typography.Text>
                                                            <Typography.Paragraph 
                                                                className="m-0 text-gray-500"
                                                                style={{ 
                                                                    fontSize: '0.75rem',
                                                                    lineHeight: '1.2',
                                                                    marginBottom: 2
                                                                }}
                                                                ellipsis={{ rows: 2 }}
                                                            >
                                                                {notification.data.message}
                                                            </Typography.Paragraph>
                                                            <Typography.Text 
                                                                type="secondary" 
                                                                style={{ 
                                                                    fontSize: '0.7rem',
                                                                }}
                                                            >
                                                                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                                            </Typography.Text>
                                                        </div>
                                                        {!notification.read_at && (
                                                            <div className="flex-shrink-0">
                                                                <Badge status="processing" size="small" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )
                                        })),
                                        {
                                            key: 'footer',
                                            label: (
                                                <div className="p-2 border-t">
                                                    <Button type="link" size="small" block>
                                                        View All Notifications
                                                    </Button>
                                                </div>
                                            )
                                        }
                                    ] : [
                                        {
                                            key: 'empty',
                                            label: (
                                                <Empty 
                                                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                                                    description={
                                                        <Typography.Text className="text-xs">
                                                            No new notifications
                                                        </Typography.Text>
                                                    }
                                                    className="py-4" 
                                                />
                                            )
                                        }
                                    ]
                                }}
                                placement="bottomRight"
                                trigger={['click']}
                                overlayStyle={{ 
                                    width: 300, // Reduced width
                                    maxWidth: '90vw',
                                }}
                            >
                                <div className="cursor-pointer p-2 rounded-full hover:bg-gray-50 transition-colors">
                                    <Badge count={unreadNotificationsCount} size="small" offset={[8, 0]}>
                                        <BellOutlined className="text-lg text-gray-600" />
                                    </Badge>
                                </div>
                            </Dropdown>

                            <Dropdown 
                                menu={userMenu} 
                                placement="bottomRight" 
                                trigger={['click']}
                                overlayStyle={{ 
                                    width: '200px',
                                    maxWidth: '90vw'
                                }}
                            >
                                <div className="p-2">
                                    <Avatar 
                                        src={user.avatar_url} 
                                        icon={<UserOutlined />} 
                                        size="small"
                                    />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
            ) : (
                // Desktop Header
                <Header 
                    className="fixed w-full z-50"
                    style={{
                        padding: 0,
                        background: '#fff',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        height: '72px',
                        borderBottom: '1px solid #f0f0f0',
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                        <div className="flex items-center gap-12">
                            <LogoSection />

                            <nav className="hidden md:flex space-x-1">
                                {menuItems.map(item => (
                                    <Link
                                        key={item.key}
                                        href={route(item.routeName)}
                                        className={`
                                            px-4 py-2 rounded-md text-sm font-medium transition-colors
                                            ${route().current(item.routeName)
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }
                                        `}
                                    >
                                        <span className="flex items-center gap-2">
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </span>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="flex items-center gap-6">
                            <Dropdown
                                menu={{
                                    items: loadingNotifications ? [
                                        {
                                            key: 'loading',
                                            label: (
                                                <div className="flex justify-center p-2">
                                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                                                </div>
                                            )
                                        }
                                    ] : notifications.length > 0 ? [
                                        {
                                            key: 'header',
                                            label: (
                                                <div className="p-2 border-b">
                                                    <div className="flex justify-between items-center">
                                                        <Typography.Text strong>Notifications</Typography.Text>
                                                        <Button 
                                                            type="link" 
                                                            size="small"
                                                            onClick={() => markAllAsRead()}
                                                        >
                                                            Mark all as read
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        ...notifications.map(notification => ({
                                            key: notification.id,
                                            label: (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    className={`
                                                        p-2 border-b cursor-pointer transition-colors
                                                        ${!notification.read_at ? 'bg-blue-50' : 'hover:bg-gray-50'}
                                                    `}
                                                    onClick={() => openNotificationModal(notification)}
                                                >
                                                    <div className="flex gap-2">
                                                        <div className="flex-shrink-0 pt-1">
                                                            {getNotificationIcon(notification.type)}
                                                        </div>
                                                        <div className="flex-grow min-w-0">
                                                            <Typography.Text 
                                                                strong={!notification.read_at}
                                                                className="block text-xs"
                                                                style={{ marginBottom: 2 }}
                                                            >
                                                                {notification.data.title}
                                                            </Typography.Text>
                                                            <Typography.Paragraph 
                                                                className="m-0 text-gray-500"
                                                                style={{ 
                                                                    fontSize: '0.75rem',
                                                                    lineHeight: '1.2',
                                                                    marginBottom: 2
                                                                }}
                                                                ellipsis={{ rows: 2 }}
                                                            >
                                                                {notification.data.message}
                                                            </Typography.Paragraph>
                                                            <Typography.Text 
                                                                type="secondary" 
                                                                style={{ 
                                                                    fontSize: '0.7rem',
                                                                }}
                                                            >
                                                                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                                            </Typography.Text>
                                                        </div>
                                                        {!notification.read_at && (
                                                            <div className="flex-shrink-0">
                                                                <Badge status="processing" size="small" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )
                                        })),
                                        {
                                            key: 'footer',
                                            label: (
                                                <div className="p-2 border-t">
                                                    <Button type="link" size="small" block>
                                                        View All Notifications
                                                    </Button>
                                                </div>
                                            )
                                        }
                                    ] : [
                                        {
                                            key: 'empty',
                                            label: (
                                                <Empty 
                                                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                                                    description={
                                                        <Typography.Text className="text-xs">
                                                            No new notifications
                                                        </Typography.Text>
                                                    }
                                                    className="py-4" 
                                                />
                                            )
                                        }
                                    ]
                                }}
                                placement="bottomRight"
                                trigger={['click']}
                                overlayStyle={{ 
                                    width: 300, // Reduced width
                                    maxWidth: '90vw',
                                }}
                            >
                                <div className="cursor-pointer p-2 rounded-full hover:bg-gray-50 transition-colors">
                                    <Badge count={unreadNotificationsCount} size="small" offset={[8, 0]}>
                                        <BellOutlined className="text-lg text-gray-600" />
                                    </Badge>
                                </div>
                            </Dropdown>

                            <div className="h-8 w-px bg-gray-200" />

                            <Dropdown menu={userMenu} placement="bottomRight" trigger={['click']}>
                                <div className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-colors">
                                    <Avatar 
                                        src={user.avatar_url} 
                                        icon={<UserOutlined />}
                                        size="default"
                                    />
                                    <div className="hidden md:block">
                                        <div className="text-sm font-medium text-gray-700">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {user.email}
                                        </div>
                                    </div>
                                    {user.is_verified && (
                                        <CheckCircleOutlined 
                                            className="text-blue-600"
                                            style={{ fontSize: '16px' }}
                                        />
                                    )}
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
            )}

            {/* Main Content - Adjusted padding for mobile */}
            <Content style={{ 
                marginTop: isMobile ? '60px' : '72px', // Adjusted margin
                padding: isMobile ? '16px' : '24px',
                backgroundColor: '#f3f4f6',
                marginBottom: isMobile ? '56px' : '0', // Add bottom margin for mobile to account for fixed navigation
            }}>
                {header && (
                    <div className="mb-4 bg-white shadow rounded-lg p-4">
                        {header}
                    </div>
                )}
                {children}
            </Content>

            {/* Mobile Navigation - Fixed to bottom */}
            {isMobile && (
                <div className="flex justify-around items-center h-14 border-t border-gray-200 bg-white fixed bottom-0 left-0 right-0 z-50">
                    {menuItems.map(item => (
                        <Link 
                            key={item.key} 
                            href={route(item.routeName)}
                            className="flex flex-col items-center justify-center w-full h-full"
                        >
                            <span 
                                className={`text-xl mb-1 ${
                                    route().current(item.routeName) 
                                        ? 'text-blue-500' 
                                        : 'text-gray-600'
                                }`}
                            >
                                {item.icon}
                            </span>
                            <span 
                                className={`text-[11px] font-medium ${
                                    route().current(item.routeName) 
                                        ? 'text-blue-500' 
                                        : 'text-gray-600'
                                }`}
                                style={{ marginTop: '-2px' }}
                            >
                                {item.mobileLabel}
                            </span>
                        </Link>
                    ))}
                </div>
            )}

            <Modal
                title={selectedNotification?.data?.title}
                open={isModalOpen}
                onCancel={closeNotificationModal}
                footer={[
                    <Button key="close" onClick={closeNotificationModal}>
                        Close
                    </Button>,
                ]}
            >
                <p>{selectedNotification?.data?.message}</p>
                <p>
                    <a href={selectedNotification?.data?.action_url} target="_blank" rel="noopener noreferrer">
                        {selectedNotification?.data?.description}
                    </a>
                </p>
                <small>{selectedNotification && new Date(selectedNotification.created_at).toLocaleString()}</small>
            </Modal>
        </Layout>
    );
}