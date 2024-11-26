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
    HomeOutlined,
    BellOutlined,
    LoadingOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react'; // Import route
import axios from 'axios';

const { Header, Content } = Layout;

export default function Authenticated({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user || {};
    const [notifications, setNotifications] = useState([]);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
    const [loadingNotifications, setLoadingNotifications] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [showAllNotifications, setShowAllNotifications] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoadingNotifications(true);
            try {
                const response = await axios.get(route('notifications.index'));
                console.log("Notifications response:", response.data); // Log the response
                setNotifications(response.data.data || []);
                setUnreadNotificationsCount((response.data.data || []).filter(n => !n.read_at).length);
            } catch (error) {
                console.error("Error fetching notifications:", error);
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
                        <Dropdown 
                            overlay={
                                <Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {notificationMenuItems.map(item => item.label)} {/* Render valid React nodes */}
                                </Menu>
                            }
                            placement="bottomRight" 
                            trigger={['click']}
                        >
                            <Badge count={unreadNotificationsCount} offset={[10, 0]}>
                                <BellOutlined style={{ fontSize: '20px' }} />
                            </Badge>
                        </Dropdown>

                        <Dropdown menu={userMenu} placement="bottomRight" trigger={['click']}>
                            <div className="flex items-center cursor-pointer">
                                <Avatar
                                    src={user.avatar_url}
                                    size="large"
                                    icon={<UserOutlined />}
                                />
                                {user.is_verified && ( // Change to is_verified or another boolean field
                                    <CheckCircleOutlined 
                                        style={{ 
                                            color: '#1877F2', // Facebook blue
                                            marginLeft: '5px',
                                            fontSize: '16px' 
                                        }} 
                                    />
                                )}
                            </div>
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