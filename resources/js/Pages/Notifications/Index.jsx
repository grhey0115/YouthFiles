import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { Card, Button, Typography, Modal } from 'antd';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const { Text, Paragraph } = Typography;

const NotificationsIndex = () => {
    const { notifications } = usePage().props;
    const [selectedNotification, setSelectedNotification] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const markAsRead = (notificationIds) => {
        Inertia.post('/notifications/mark-as-read', {
            notificationIds,
        });
    };

    const openNotificationModal = (notification) => {
        setSelectedNotification(notification);
        setIsModalOpen(true);
    };

    const closeNotificationModal = () => {
        setIsModalOpen(false);
        setSelectedNotification(null);
    };

    return (
        <AuthenticatedLayout>
            <div className="container">
                <h1>Your Notifications</h1>

                {notifications.length === 0 && (
                    <p>You have no new notifications.</p>
                )}

                {/* Map through notifications */}
                {notifications.map((notification) => (
                    <Card
                        key={notification.id}
                        className="mb-3"
                        hoverable
                        style={{ marginBottom: '16px' }}
                        title={
                            <Link href={`/announcements/${notification.data.announcement_id}`}>
                                {notification.data.title}
                            </Link>
                        }
                        extra={
                            <Button
                                size="small"
                                type="primary"
                                onClick={() => markAsRead([notification.id])}
                            >
                                Mark as Read
                            </Button>
                        }
                        onClick={() => openNotificationModal(notification)}
                    >
                        <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                            {notification.data.message}
                        </Paragraph>
                        <Text type="secondary">
                            {new Date(notification.created_at).toLocaleString()}
                        </Text>
                    </Card>
                ))}

                {/* Modal for viewing more details */}
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
                    <a href={selectedNotification?.data?.action_url} target="_blank" rel="noopener noreferrer">
                        {selectedNotification?.data?.description}
                    </a>
                    <small>{selectedNotification && new Date(selectedNotification.created_at).toLocaleString()}</small>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
};

export default NotificationsIndex;
