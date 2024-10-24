import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button, Modal, Input, Upload, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const EventShow = () => {
    const { event, auth, isFull, flash = {}, hasJoined, paymentStatus: initialPaymentStatus } = usePage().props;
    const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus);
    const [userId, setUserId] = useState(null);
    const [joined, setJoined] = useState(hasJoined || false);
    const [eventEnded, setEventEnded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [receipt, setReceipt] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (auth && auth.id) {
            setUserId(auth.id);
        }

        const now = new Date();
        const eventEndTime = new Date(event.end_time);
        if (now > eventEndTime) {
            setEventEnded(true);
        }
    }, [auth, event.end_time]);

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
            placement: 'topRight',
            duration: 5,
        });
    };

    useEffect(() => {
        if (flash && flash.success) {
            openNotification('success', flash.success);
        }
        if (flash && flash.error) {
            openNotification('error', flash.error);
        }
    }, [flash]);

    const handleJoin = () => {
        if (event.registration_fee > 0) {
            setIsModalVisible(true);
        } else {
            router.post(route('events.join', event.id), {}, {
                onSuccess: () => {
                    setJoined(true);
                    openNotification('success', 'You have successfully joined the event!');
                },
                onError: () => {
                    openNotification('error', 'Failed to join the event.');
                }
            });
        }
    };

    const handleCancel = () => {
        router.post(route('events.cancel', event.id), {}, {
            onSuccess: () => {
                setJoined(false);
                setPaymentStatus(null);
                openNotification('info', 'You have successfully canceled your participation.');
            },
            onError: () => {
                openNotification('error', 'Failed to cancel your participation.');
            }
        });
    };

    const handlePayment = async () => {
        if (!referenceNumber) {
            openNotification('error', 'Please provide a reference number.');
            return;
        }
    
        setIsSubmitting(true);
    
        try {
            // Directly submit the payment details
            submitPaymentDetails();
        } catch (error) {
            console.error('Payment error:', error);
            openNotification('error', 'An unexpected error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };
    

    const submitPaymentDetails = () => {
        const formData = new FormData();
        formData.append('event_id', event.id);
        formData.append('user_id', auth.id);
        formData.append('reference_number', referenceNumber);
        formData.append('amount', event.registration_fee);
        formData.append('status', 'pending'); // Set the status to 'pending'
    
        if (receipt) {
            formData.append('receipt', receipt);
        }
    
        // Log form data for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    
        router.post(route('events.payment', event.id), formData, {
            preserveScroll: true,
            onSuccess: () => {
                // Immediately set the paymentStatus to 'pending'
                setPaymentStatus('pending');
                setJoined(true);
                setIsModalVisible(false);
                openNotification('success', 'Payment submitted successfully! Waiting for approval.');
                resetForm();
            },
            onError: (errors) => {
                console.error('Payment submission error:', errors);
                openNotification('error', 'Failed to submit payment details. Please try again.');
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    const resetForm = () => {
        setReferenceNumber('');
        setReceipt(null);
        setFileList([]);
    };


    const handleReceiptChange = ({ fileList }) => {
        setFileList(fileList);
        const file = fileList[0];
        if (file) {
            setReceipt(file.originFileObj);
        } else {
            setReceipt(null);
        }
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const renderActionButton = () => {
        const daysUntilEvent = Math.ceil((new Date(event.start_time) - new Date()) / (1000 * 60 * 60 * 24));
        
        const cancellationDaysBefore = event.cancellation_days_before;
    
        if (eventEnded) {
            return <Button type="primary" disabled>Event Ended</Button>;
        }
    
        // Allow cancellation even if the event is full
        if (joined) {
            if (daysUntilEvent < cancellationDaysBefore) {
                return <Button type="default" disabled>Cancellation Not Allowed</Button>;
            }
            return <Button type="primary" danger onClick={handleCancel}>Cancel</Button>;
        }
    
        // Only disable join if the event is full
        if (isFull) {
            return <Button type="default" disabled>Event is Full</Button>;
        }
    
        if (paymentStatus === 'pending') {
            return <Button type="default" disabled>Payment Pending Approval</Button>;
        }
    
        return (
            <Button type="primary" onClick={handleJoin}>
                {event.registration_fee > 0 ? `Pay ₱${event.registration_fee}` : 'Register'}
            </Button>
        );
    };
    
    
    

    return (
        <AuthenticatedLayout user={auth}>
            <Head title={event.name} />
            
            <div className="container mx-auto p-4">
                {/* Event Banner */}
                <div className="relative mb-6">
                    <img
                        src={`/storage/${event.header_image}`}
                        alt="Event Banner"
                        className="w-full h-64 object-cover"
                    />
                </div>

                {/* Event Details */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Event Information */}
                        <div className="col-span-2">
                            <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
                            <div className="flex items-center text-gray-600 mb-4">
                                <p className="mr-4">
                                    <strong>Date:</strong> {new Date(event.start_time).toLocaleDateString()}
                                </p>
                                <p className="mr-4">
                                    <strong>Time:</strong> {new Date(event.start_time).toLocaleTimeString()} - {new Date(event.end_time).toLocaleTimeString()}
                                </p>
                                <p><strong>Points:</strong> {event.youth_points} Youth Points</p>
                                {event.registration_fee > 0 && (
                                    <p className="mr-4"><strong>Registration Fee:</strong> ₱{event.registration_fee}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <p><strong>Location:</strong> {event.location}</p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex flex-col items-center justify-center">
                            {userId !== null && renderActionButton()}
                        </div>
                    </div>

                    {/* Event Overview */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">Event Overview</h2>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <Modal
                title="Pay Registration Fee"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handlePayment}
                        loading={isSubmitting}
                        disabled={!referenceNumber || isSubmitting}
                    >
                        Confirm Payment
                    </Button>,
                ]}
            >
                <div className="text-center mb-6">
                    {event.qr_code_image && (
                        <img
                            src={`/storage/${event.qr_code_image}`}
                            alt="GCash QR Code"
                            className="w-64 h-64 mx-auto object-contain mb-4"
                        />
                    )}
                    <p className="text-gray-600">Scan the QR code to make your payment via GCash.</p>
                </div>
                
                <Input
                    placeholder="Enter GCash Reference Number"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    className="mb-4"
                />
                
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleReceiptChange}
                    onPreview={handlePreview}
                    beforeUpload={() => false}
                >
                    {fileList.length >= 1 ? null : (
                        <div>
                            <PlusOutlined />
                            <div className="mt-2">Upload Receipt</div>
                        </div>
                    )}
                </Upload>
            </Modal>

            {/* Preview Modal */}
            <Modal
                open={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
            >
                <img alt="Receipt Preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </AuthenticatedLayout>
    );
};

export default EventShow;