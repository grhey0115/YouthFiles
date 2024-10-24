import { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Badge, Typography, Space, Drawer, Button, Modal, Avatar } from 'antd';
import {
    MenuOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    CalendarOutlined,
    QuestionCircleOutlined,
    FundOutlined,
    HomeOutlined,
    BellOutlined,
} from '@ant-design/icons';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import Echo from 'laravel-echo';

const { Header, Content } = Layout;

export default function Authenticated({ header, children }) {
    const { auth, notifications: initialNotifications } = usePage().props;
    const user = auth.user || {}; // Default to an empty object to avoid errors

    const [notifications, setNotifications] = useState(initialNotifications || []);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(user.unread_notifications_count || 0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setUnreadNotificationsCount(notifications.filter(n => !n.read_at).length);
    }, [notifications]);

    useEffect(() => {
        // Set up Laravel Echo for real-time notifications
        window.Echo = new Echo({
            broadcaster: 'reverb',  // Since Reverb works like Pusher, use 'pusher'
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST || 'localhost',
            wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
            forceTLS: false,  // Use non-SSL WebSocket for local development
            enabledTransports: ['ws'],  // Disable fallback transports like polling
            disableStats: true,
        });
    
        // Listen for the 'NewAnnouncementCreated' event on the 'announcements' channel
        window.Echo.channel('announcements')
            .listen('NewAnnouncementCreated', (e) => {
                const newNotification = {
                    id: Math.random().toString(36).substr(2, 9),  // Generate a unique ID for the notification
                    data: {
                        title: e.title,
                        message: e.message,
                    },
                    created_at: new Date().toISOString(),
                    read_at: null,
                };
    
                // Update the notifications list and unread count
                setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
                setUnreadNotificationsCount((prevCount) => prevCount + 1);
            });
    
        return () => {
            // Clean up the Echo channel when the component is unmounted
            window.Echo.leaveChannel('announcements');
        };
    }, []);

    const fullName = `${user.first_name || ''} ${user.middle_name ? user.middle_name + ' ' : ''}${user.last_name || ''}`.trim();
   

    const notificationMenu = (
        <Menu className="notification-menu">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <Menu.Item key={notification.id} onClick={() => openNotificationModal(notification)}>
                        <div className="notification-item">
                            <Typography.Text className="notification-title" strong={!notification.read_at}>
                                {notification.data.title}
                            </Typography.Text>
                            <Typography.Paragraph className="notification-message">
                                {notification.data.message}
                            </Typography.Paragraph>
                            <Typography.Text className="notification-date">
                                {new Date(notification.created_at).toLocaleString()}
                            </Typography.Text>
                        </div>
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item key="no-notifications">No new notifications</Menu.Item>
            )}
        </Menu>
    );

    const notificationMenuItems = (notifications || []).length > 0 
    ? notifications.map((notification) => ({
        key: notification.id,
        label: (
            <div className="notification-item" onClick={() => openNotificationModal(notification)}>
                <Typography.Text className="notification-title" strong={!notification.read_at}>
                    {notification.data.title}
                </Typography.Text>
                <Typography.Paragraph className="notification-message">
                    {notification.data.message}
                </Typography.Paragraph>
                <Typography.Text className="notification-date">
                    {new Date(notification.created_at).toLocaleString()}
                </Typography.Text>
            </div>
        ),
    }))
    : [{ key: 'no-notifications', label: 'No new notifications' }];


    const userRoles = user.roles ? user.roles.map(role => role.name) : [];
    const isAdmin = userRoles.includes('super_admin') || userRoles.includes('panel_user');
    const userMenu = {
        items: [
            { key: 'profile', icon: <UserOutlined />, label: <Link href={route('profile.view')}>Profile</Link> },
            { key: 'Manage', icon: <SettingOutlined />, label: <Link href={route('profile.edit')}>Manage Account</Link> },
            { key: 'logout', icon: <LogoutOutlined />, label: <Link href={route('logout')} method="post" as="button">Log Out</Link> },
            ...(isAdmin ? [
                { key: 'admin', icon: <UserOutlined />, label: <Link href={route('admin.dashboard')}>Admin</Link> },
            ] : []),
        ]
    };

    const menuItems = [
        { key: 'dashboard', icon: <CalendarOutlined />, label: 'Join Events', routeName: 'dashboard' },
        { key: 'ayuda', icon: <FundOutlined />, label: 'Assistance', routeName: 'ayuda.index' },
        { key: 'projects', icon: <HomeOutlined />, label: 'SK-Projects', routeName: 'projects.index' },
        { key: 'help-center', icon: <QuestionCircleOutlined />, label: 'Help Center', routeName: 'help-center' },
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

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{
                backgroundColor: '#fff',
                padding: '0 24px',
                boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                position: 'fixed',
                top: 0,
                zIndex: 1000,
                borderBottom: '1px solid #f0f0f0',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    <Link href={route('dashboard')} style={{ marginRight: 'auto' }}>
                        <ApplicationLogo className="block h-8 w-auto" />
                    </Link>
                    <Typography.Title level={5} style={{ margin: '0 24px' }}>
                        SK - Barangay Casay
                    </Typography.Title>
                    {!isMobile && renderMenuItems('horizontal')}
                    <Space size="large" style={{ marginLeft: 'auto' }}>
                   <Dropdown menu={{ items: notificationMenuItems }} placement="bottomRight" trigger={['click']}>
                        <Badge count={unreadNotificationsCount} offset={[10, 0]}>
                            <BellOutlined style={{ fontSize: '20px' }} />
                        </Badge>
                    </Dropdown>
                        <Dropdown menu={userMenu} placement="bottomRight" trigger={['click']}>
                            <Avatar
                                src={user.avatar_url || '/default_avatar1.png'}
                                size="large"
                                icon={<UserOutlined />}
                                style={{ cursor: 'pointer' }}
                            />
                        </Dropdown>
                    </Space>
                </div>

                {isMobile && (
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setDrawerOpen(true)}
                    />
                )}
            </Header>

            <Drawer
                title="Menu"
                placement="right"
                closable={true}
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
            >
                {renderMenuItems('inline')}
            </Drawer>
            

            {header && (
                <div style={{ backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)', padding: '16px 24px' }}>
                    {header}
                </div>
            )}

            <Content style={{ padding: '24px', backgroundColor: '#f3f4f6', marginTop: '64px' }}>
                {children}
            </Content>

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
