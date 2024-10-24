import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

const NotificationBell = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Fetch notifications
        Inertia.get('/notifications')
            .then((response) => {
                const notificationsData = response.props?.data ?? [];
                setNotifications(notificationsData);
                setUnreadCount(notificationsData.filter(notification => !notification.read_at).length);
            })
            .catch((error) => {
                console.error('Error fetching notifications:', error);
            });

        // Optionally, set up real-time notification with Laravel Echo
        if (window.Echo) {
            window.Echo.private(`App.Models.User.${userId}`).notification((notification) => {
                setNotifications((prev) => [notification, ...prev]);
                setUnreadCount((prevCount) => prevCount + 1);
            });
        }
    }, [userId]);

    return (
        <Badge badgeContent={unreadCount} color="primary">
            <NotificationsIcon fontSize="large" />
        </Badge>
    );
};

export default NotificationBell;
