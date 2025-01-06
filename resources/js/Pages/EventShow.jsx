import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    Button, Modal, Input, Upload, message, Badge, Card, Row, Col, 
    Statistic, Timeline, Tag, Tooltip, Divider, Progress, Space,Alert, 
} from 'antd';
import { 
    PlusOutlined, CalendarOutlined, EnvironmentOutlined, 
    TeamOutlined, TrophyOutlined, DollarOutlined,
    ClockCircleOutlined, CheckCircleOutlined,
    WarningOutlined, LoadingOutlined,CloseCircleOutlined,NumberOutlined,DownloadOutlined,
    FacebookFilled, 
    TwitterOutlined, 
    LinkedinFilled, 
    WhatsAppOutlined,
    ShareAltOutlined
} from '@ant-design/icons';
import { Typography } from 'antd';
import styled from 'styled-components';
const { Text } = Typography;

const MobileActionBar = styled.div`
    display: none;
    @media (max-width: 992px) {
        display: block;
        margin: 16px 0;
        padding: 16px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
`;

const DesktopSidebar = styled(Card)`
    @media (max-width: 992px) {
        display: none;
    }
`;

const EventShow = () => {
    const { 
        event, user, isFull, flash = {}, 
        hasJoined, attendance_status, 
        paymentStatus: initialPaymentStatus,
        relatedEvents 
    } = usePage().props;

    const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus);
    const [joined, setJoined] = useState(hasJoined || false);
    const [eventEnded, setEventEnded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [fileList, setFileList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        checkEventStatus();
    }, [event]);

    const checkEventStatus = () => {
        const now = new Date();
        const eventEndTime = new Date(event.end_time);
        setEventEnded(now > eventEndTime);
    };

    const handleJoin = () => {
        if (event.registration_fee > 0) {
            setIsModalVisible(true);
        } else {
            router.post(route('events.join', event.id), {}, {
                onSuccess: () => {
                    setJoined(true);
                    message.success('Successfully registered for the event!');
                },
                onError: () => message.error('Failed to register for the event.')
            });
        }
    };

    const handleCancel = () => {
        router.post(route('events.cancel', event.id), {}, {
            onSuccess: () => {
                setJoined(false);
                message.info('Successfully cancelled your registration.');
            },
            onError: () => message.error('Failed to cancel registration.')
        });
    };

    const handlePayment = async () => {
        if (!referenceNumber || fileList.length === 0) {
            message.error('Please provide all required payment details.');
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('reference_number', referenceNumber);
        formData.append('receipt', fileList[0].originFileObj);

        try {
            await router.post(route('events.payment', event.id), formData, {
                onSuccess: () => {
                    setIsModalVisible(false);
                    setPaymentStatus('pending');
                    message.success('Payment submitted successfully!');
                },
                onError: () => message.error('Failed to submit payment.'),
                onFinish: () => setIsSubmitting(false)
            });
        } catch (error) {
            console.error('Payment error:', error);
            message.error('An unexpected error occurred.');
            setIsSubmitting(false);
        }
    };

    const getEventStatusBadge = () => {
        if (eventEnded) return <Tag color="red">Event Ended</Tag>;
        if (isFull) return <Tag color="orange">Full</Tag>;
        return <Tag color="green">Open for Registration</Tag>;
    };

    const renderEventProgress = () => {
        const now = new Date();
        const start = new Date(event.start_time);
        const end = new Date(event.end_time);
        const total = end - start;
        const current = now - start;
        const percent = Math.min(Math.max((current / total) * 100, 0), 100);

        return (
            <Card title="Event Progress" className="mb-4">
                <Progress
                    percent={Number(percent.toFixed(1))}
                    status={eventEnded ? "success" : "active"}
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                />
                <Row gutter={16} className="mt-4">
                    <Col span={8}>
                        <Statistic
                            title="Registered"
                            value={event.slots - event.available_slots}
                            suffix={`/ ${event.slots}`}
                            prefix={<TeamOutlined />}
                        />
                    </Col>
                    <Col span={8}>
                        <Statistic
                            title="Youth Points"
                            value={event.youth_points}
                            prefix={<TrophyOutlined />}
                        />
                    </Col>
                    {event.registration_fee > 0 && (
                        <Col span={8}>
                            <Statistic
                                title="Registration Fee"
                                value={event.registration_fee}
                                prefix={<DollarOutlined />}
                                formatter={value => `₱${value}`}
                            />
                        </Col>
                    )}
                </Row>
            </Card>
        );
    };

    const renderActionButton = () => {
        if (eventEnded) {
            if (joined && attendance_status === "present") {
                return (
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={() => window.location.href = route('events.certificate', event.id)}
                    >
                        Download Certificate
                    </Button>
                );
            }
            return <Button disabled>Event Ended</Button>;
        }

        if (joined) {
            return (
                <Button 
                    danger 
                    icon={<CloseCircleOutlined />} 
                    onClick={handleCancel}
                >
                    Cancel Registration
                </Button>
            );
        }

        if (isFull) {
            return <Button disabled>Event is Full</Button>;
        }

        if (paymentStatus === 'pending') {
            return (
                <Button disabled icon={<LoadingOutlined />}>
                    Payment Pending
                </Button>
            );
        }

        return (
            <Button 
                type="primary" 
                icon={<CheckCircleOutlined />} 
                onClick={handleJoin}
            >
                {event.registration_fee > 0 ? `Register (₱${event.registration_fee})` : 'Register Now'}
            </Button>
        );
    };

    const handleShare = (platform) => {
        const eventUrl = window.location.href;
        const eventTitle = encodeURIComponent(event.name);
        const eventDescription = encodeURIComponent(event.description.replace(/<[^>]*>/g, '')); // Strip HTML tags
        
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
            twitter: `https://twitter.com/intent/tweet?text=${eventTitle}&url=${encodeURIComponent(eventUrl)}`,
            whatsapp: `https://api.whatsapp.com/send?text=${eventTitle}%20${encodeURIComponent(eventUrl)}`
        };

        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    const renderShareButtons = () => (
        <Card title={<Space><ShareAltOutlined /> Share This Event</Space>} className="mb-4">
            <Space size="middle">
                <Tooltip title="Share on Facebook">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<FacebookFilled />}
                        onClick={() => handleShare('facebook')}
                        style={{ backgroundColor: '#1877f2' }}
                    />
                </Tooltip>
                <Tooltip title="Share on Twitter">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<TwitterOutlined />}
                        onClick={() => handleShare('twitter')}
                        style={{ backgroundColor: '#1da1f2' }}
                    />
               
                </Tooltip>
                <Tooltip title="Share on WhatsApp">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<WhatsAppOutlined />}
                        onClick={() => handleShare('whatsapp')}
                        style={{ backgroundColor: '#25d366' }}
                    />
                </Tooltip>
            </Space>
        </Card>
    );

    return (
        <AuthenticatedLayout>
            <Head title={event.name} />
            
            {/* Hero Section */}
            <div className="relative h-[400px] w-full mb-8">
                <img
                    src={`/storage/${event.header_image}`}
                    alt={event.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
                        {getEventStatusBadge()}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile Action Bar */}
                <MobileActionBar>
                    <Space direction="vertical" className="w-full">
                        {renderActionButton()}
                        <Statistic
                            title="Available Slots"
                            value={event.available_slots}
                            suffix={`/ ${event.slots}`}
                            prefix={<TeamOutlined />}
                        />
                        {joined && (
                            <Alert
                                message="Registration Status"
                                description={
                                    attendance_status === "present" 
                                        ? "You have attended this event" 
                                        : "You are registered for this event"
                                }
                                type={attendance_status === "present" ? "success" : "info"}
                                showIcon
                            />
                        )}
                    </Space>
                </MobileActionBar>

                <Row gutter={[24, 24]}>
                    {/* Main Content */}
                    <Col xs={24} lg={16}>
                        {renderEventProgress()}

                        {/* Event Details */}
                        <Card title="Event Details" className="mb-4">
                            <Timeline>
                                <Timeline.Item dot={<CalendarOutlined />}>
                                    <p>Date: {new Date(event.start_time).toLocaleDateString()}</p>
                                    <p>Time: {new Date(event.start_time).toLocaleTimeString()} - {new Date(event.end_time).toLocaleTimeString()}</p>
                                </Timeline.Item>
                                <Timeline.Item dot={<EnvironmentOutlined />}>
                                    <p>Location: {event.location}</p>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <div dangerouslySetInnerHTML={{ __html: event.description }} />
                                </Timeline.Item>
                            </Timeline>
                        </Card>

                        {renderShareButtons()}

                        {/* Related Events */}
                        {relatedEvents?.length > 0 && (
                            <Card title="Related Events" className="mb-4">
                                <Row gutter={[16, 16]}>
                                    {relatedEvents.map(relatedEvent => (
                                        <Col xs={24} sm={12} md={8} key={relatedEvent.id}>
                                            <Card
                                                hoverable
                                                cover={
                                                    <img
                                                        alt={relatedEvent.name}
                                                        src={`/storage/${relatedEvent.header_image}`}
                                                        className="h-48 object-cover"
                                                    />
                                                }
                                                onClick={() => router.visit(route('events.show', relatedEvent.id))}
                                            >
                                                <Card.Meta
                                                    title={relatedEvent.name}
                                                    description={
                                                        <Space direction="vertical">
                                                            <span>
                                                                <CalendarOutlined /> {new Date(relatedEvent.start_time).toLocaleDateString()}
                                                            </span>
                                                            <span>
                                                                <TeamOutlined /> {relatedEvent.available_slots} slots left
                                                            </span>
                                                        </Space>
                                                    }
                                                />
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card>
                        )}
                    </Col>

                    {/* Desktop Sidebar */}
                    <Col xs={24} lg={8}>
                        <DesktopSidebar className="sticky top-4">
                            <Space direction="vertical" className="w-full">
                                {renderActionButton()}
                                
                                <Divider />
                                
                                <Statistic
                                    title="Available Slots"
                                    value={event.available_slots}
                                    suffix={`/ ${event.slots}`}
                                    prefix={<TeamOutlined />}
                                />
                                
                                {joined && (
                                    <>
                                        <Divider />
                                        <Alert
                                            message="Registration Status"
                                            description={
                                                attendance_status === "present" 
                                                    ? "You have attended this event" 
                                                    : "You are registered for this event"
                                            }
                                            type={attendance_status === "present" ? "success" : "info"}
                                            showIcon
                                        />
                                    </>
                                )}

                                <Divider />
                                
                                <div className="text-center">
                                    <Text type="secondary">Quick Share:</Text>
                                    <Space className="mt-2">
                                        <Tooltip title="Share on Facebook">
                                            <Button
                                                type="text"
                                                icon={<FacebookFilled />}
                                                onClick={() => handleShare('facebook')}
                                                className="text-[#1877f2] hover:text-[#1877f2]/80"
                                            />
                                        </Tooltip>
                                        <Tooltip title="Share on Twitter">
                                            <Button
                                                type="text"
                                                icon={<TwitterOutlined />}
                                                onClick={() => handleShare('twitter')}
                                                className="text-[#1da1f2] hover:text-[#1da1f2]/80"
                                            />
                                        </Tooltip>
                                        
                                        <Tooltip title="Share on WhatsApp">
                                            <Button
                                                type="text"
                                                icon={<WhatsAppOutlined />}
                                                onClick={() => handleShare('whatsapp')}
                                                className="text-[#25d366] hover:text-[#25d366]/80"
                                            />
                                        </Tooltip>
                                    </Space>
                                </div>
                            </Space>
                        </DesktopSidebar>
                    </Col>
                </Row>
            </div>

            {/* Payment Modal */}
            <Modal
                title="Submit Payment"
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
                        disabled={!referenceNumber || fileList.length === 0}
                    >
                        Submit Payment
                    </Button>,
                ]}
            >
                <Space direction="vertical" className="w-full">
                    <Input
                        placeholder="Enter GCash Reference Number"
                        value={referenceNumber}
                        onChange={e => setReferenceNumber(e.target.value)}
                        prefix={<NumberOutlined />}
                    />
                    
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        {fileList.length === 0 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload Receipt</div>
                            </div>
                        )}
                    </Upload>
                </Space>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default EventShow;