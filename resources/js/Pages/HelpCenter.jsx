import React, { useState } from "react";
import { usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    notification, 
    Upload, 
    Modal, 
    Typography, 
    Card, 
    Row, 
    Col, 
    Input, 
    Button, 
    Select, 
    Divider, 
    Space 
} from 'antd';
import { 
    UploadOutlined, 
    SafetyCertificateOutlined, 
    ToolOutlined,
    ExclamationCircleOutlined ,
    PhoneOutlined,
} from '@ant-design/icons';
import styled from "styled-components";
import { motion } from 'framer-motion';

// Updated Styled Components
const StyledWrapper = styled.div`
    padding: 40px;
    background: linear-gradient(135deg, #f6f9fc 0%, #f1f4f8 100%);
    min-height: calc(100vh - 64px);
`;

const Header = styled.div`
    margin-bottom: 50px;
    text-align: center;
    padding: 40px 20px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const StyledCard = styled(motion.div)`
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    height: 100%;
    
    .ant-card-head-title {
        font-size: 1.25rem;
        font-weight: 600;
    }

    .service-icon {
        font-size: 40px;
        margin-bottom: 20px;
        display: block;
        text-align: center;
    }

    .service-title {
        font-size: 1.5rem;
        margin-bottom: 15px;
        color: #1a1a1a;
        font-weight: 600;
    }

    .service-description {
        color: #666;
        font-size: 1rem;
        line-height: 1.6;
    }
`;

const StyledModal = styled(Modal)`
    .ant-modal-content {
        border-radius: 16px;
        overflow: hidden;
    }

    .ant-modal-header {
        padding: 24px;
        background: #f8fafc;
        border-bottom: 1px solid #edf2f7;
    }

    .ant-modal-body {
        padding: 24px;
    }

    .form-section {
        margin-bottom: 24px;
    }
`;

const StyledButton = styled(Button)`
    height: 45px;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 8px;
    
    &.ant-btn-primary {
        background: #1890ff;
        border-color: #1890ff;
        
        &:hover {
            background: #40a9ff;
            border-color: #40a9ff;
        }
    }
`;

const HelpCenter = () => {
    const { auth, items } = usePage().props;
    const [openBorrowModal, setOpenBorrowModal] = useState(false);
    const [openTanodModal, setOpenTanodModal] = useState(false);
    const [openEmergencyModal, setOpenEmergencyModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    console.log('Full usePage props:', usePage().props);
  console.log('Auth object:', auth);
  console.log('User object:', auth?.user);
    // Borrow Equipment Form
    const { 
        data, 
        setData, 
        post, 
        processing, 
        errors: borrowErrors 
    } = useForm({
        item_id: null,
        purpose: '',
        borrow_date: '',
        return_date: ''
    });

    // Tanod Request Form
    const { 
        data: tanodData, 
        setData: setTanodData, 
        post: postTanod, 
        processing: processingTanod, 
        errors: tanodErrors 
    } = useForm({
        contact: auth.user.contact_number || '',
        details: '',
        place: '',
        request_letter: null
    });

    // Emergency Assistance Form
    const { 
        data: emergencyData, 
        setData: setEmergencyData, 
        post: postEmergency, 
        processing: processingEmergency 
    } = useForm({
        contact: '',
        assistanceType: null,
        description: '',
        supporting_document: null
    });

    // Modal Handlers for Borrow Equipment
    const handleOpenBorrowModal = () => setOpenBorrowModal(true);
    const handleCloseBorrowModal = () => {
        setOpenBorrowModal(false);
        setSelectedItem(null);
        setData({
            item_id: null,
            purpose: '',
            borrow_date: '',
            return_date: ''
        });
    };

    // Modal Handlers for Tanod Request
    const handleOpenTanodModal = () => setOpenTanodModal(true);
    const handleCloseTanodModal = () => {
        setOpenTanodModal(false);
        setTanodData({
            contact: '',
            details: '',
            place: '',
            request_letter: null
        });
    };

    // Modal Handlers for Emergency Assistance
    const handleOpenEmergencyModal = () => setOpenEmergencyModal(true);
     // Modal Close Handler
     const handleCloseEmergencyModal = () => {
        setOpenEmergencyModal(false);
        setEmergencyData({
            contact: '',
            assistanceType: null,
            description: '',
            supporting_document: null
        });
    };

    // Item Selection Handler
    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setData('item_id', item.id);
    };

    // Borrow Equipment Submission Handler
    const handleSubmitBorrow = (e) => {
        e.preventDefault();
        
        const errors = {};
        if (!data.item_id) errors.item_id = 'Please select an item';
        if (!data.purpose.trim()) errors.purpose = 'Purpose is required';
        if (!data.borrow_date) errors.borrow_date = 'Borrow date is required';
        if (!data.return_date) errors.return_date = 'Return date is required';

        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach(error => {
                notification.error({
                    message: 'Validation Error',
                    description: error,
                    placement: 'topRight'
                });
            });
            return;
        }

        post(route('borrow.store'), {
            onSuccess: () => {
                handleCloseBorrowModal();
                notification.success({
                    message: 'Borrow Request Submitted',
                    description: 'Your borrow request is now pending approval.',
                    placement: 'topRight'
                });
            },
            onError: (errors) => {
                Object.values(errors).forEach(error => {
                    notification.error({
                        message: 'Submission Failed',
                        description: error,
                        placement: 'topRight'
                    });
                });
            }
        });
    };

    // Tanod Request Submission Handler
    const handleSubmitTanodRequest = (e) => {
        e.preventDefault();

        const errors = {};
        if (!tanodData.contact.trim()) errors.contact = 'Contact is required';
        if (!tanodData.details.trim()) errors.details = 'Details are required';
        if (!tanodData.place.trim()) errors.place = 'Place is required';
        if (!tanodData.request_letter) errors.request_letter = 'Request letter is required';

        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach(error => {
                notification.error({
                    message: 'Validation Error',
                    description: error,
                    placement: 'topRight'
                });
            });
            return;
        }

        const formData = new FormData();
        formData.append('contact', tanodData.contact);
        formData.append('details', tanodData.details);
        formData.append('place', tanodData.place);
        formData.append('request_letter', tanodData.request_letter);

        postTanod(route('tanod.requests.store'), {
            data: formData,
            onSuccess: () => {
                handleCloseTanodModal();
                notification.success({
                    message: 'Tanod Request Submitted',
                    description: 'Your tanod request is now pending approval.',
                    placement: 'topRight'
                });
            },
            onError: (errors) => {
                Object.values(errors).forEach(error => {
                    notification.error({
                        message: 'Submission Failed',
                        description: error,
                        placement: 'topRight'
                    });
                });
            }
        });
    };

    const handleEmergencyRequest = (e) => {
        e.preventDefault();
    
        const errors = {};
        const contactRegex = /^(09|\+639)\d{9}$/; // Philippine mobile number format
    
        if (!emergencyData.contact.trim()) {
            errors.contact = 'Contact number is required';
        } else if (!contactRegex.test(emergencyData.contact)) {
            errors.contact = 'Invalid contact number format';
        }
    
        if (!emergencyData.assistanceType) {
            errors.assistanceType = 'Assistance type is required';
        }
    
        if (!emergencyData.description.trim()) {
            errors.description = 'Description is required';
        }
    
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach(error => {
                notification.error({
                    message: 'Validation Error',
                    description: error,
                    placement: 'topRight'
                });
            });
            return;
        }
    
        const formData = new FormData();
        formData.append('contact', emergencyData.contact);
        formData.append('assistanceType', emergencyData.assistanceType);
        formData.append('description', emergencyData.description);
        if (emergencyData.supporting_document) {
            formData.append('supporting_document', emergencyData.supporting_document);
        }
    
        postEmergency(route('sk.emergency.store'), {
            data: formData,
            onSuccess: () => {
                handleCloseEmergencyModal();
                notification.success({
                    message: 'SK Emergency Request Submitted',
                    description: 'Your request has been received and will be processed soon.',
                    placement: 'topRight'
                });
            },
            onError: (errors) => {
                Object.values(errors).forEach(error => {
                    notification.error({
                        message: 'Submission Failed',
                        description: error,
                        placement: 'topRight'
                    });
                });
            }
        });
    };
    // File Upload Props
    const tanodUploadProps = {
        beforeUpload: (file) => {
            const isValidType = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
            if (!isValidType) {
                notification.error({
                    message: 'Invalid File Type',
                    description: 'You can only upload PDF, PNG, JPG, or JPEG files',
                    placement: 'topRight'
                });
                return false;
            }
            setTanodData('request_letter', file);
            return false;
        },
        onRemove: () => {
            setTanodData('request_letter', null);
        },
        accept: '.pdf,.png,.jpg,.jpeg',
        maxCount: 1
    };

    const emergencyUploadProps = {
        beforeUpload: (file) => {
            const isValidType = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
            if (!isValidType) {
                notification.error({
                    message: 'Invalid File Type',
                    description: 'You can only upload PDF, PNG, JPG, or JPEG files',
                    placement: 'topRight'
                });
                return false;
            }
            setEmergencyData('supporting_document', file);
            return false;
        },
        onRemove: () => {
            setEmergencyData('supporting_document', null);
        },
        accept: '.pdf,.png,.jpg,.jpeg',
        maxCount: 1
    };
  

    return (
        <AuthenticatedLayout user={auth}>
            <StyledWrapper>
                <Header>
                    <Typography.Title level={1} style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
                        Community Help Center
                    </Typography.Title>
                    <Typography.Text style={{ fontSize: '1.1rem', color: '#666' }}>
                        Access quick assistance and support services for our community members
                    </Typography.Text>
                </Header>

                <Row gutter={[24, 24]} justify="center">
                    {/* Emergency Assistance Card */}
                    <Col xs={24} sm={12} md={8}>
                        <StyledCard
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            onClick={handleOpenEmergencyModal}
                        >
                            <ExclamationCircleOutlined className="service-icon" style={{ color: '#dc3545' }} />
                            <h3 className="service-title">Emergency Assistance</h3>
                            <p className="service-description">
                                Get immediate support for urgent situations. Available 24/7 for community emergencies.
                            </p>
                        </StyledCard>
                    </Col>

                    {/* Tanod Request Card */}
                    <Col xs={24} sm={12} md={8}>
                        <StyledCard
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            onClick={handleOpenTanodModal}
                        >
                            <SafetyCertificateOutlined className="service-icon" style={{ color: '#28a745' }} />
                            <h3 className="service-title">Tanod Services</h3>
                            <p className="service-description">
                                Request security assistance from our community tanod for your safety needs.
                            </p>
                        </StyledCard>
                    </Col>

                    {/* Equipment Borrowing Card */}
                    <Col xs={24} sm={12} md={8}>
                        <StyledCard
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            onClick={handleOpenBorrowModal}
                        >
                            <ToolOutlined className="service-icon" style={{ color: '#ffc107' }} />
                            <h3 className="service-title">Equipment Borrowing</h3>
                            <p className="service-description">
                                Access community equipment and resources for your events and activities.
                            </p>
                        </StyledCard>
                    </Col>
                </Row>

                {/* Modals with improved styling */}
                <StyledModal 
                    title={<Typography.Title level={3}>Borrow Equipment</Typography.Title>}
                    open={openBorrowModal} 
                    onCancel={handleCloseBorrowModal}
                    footer={null}
                    width={800}
                >
                    <form onSubmit={handleSubmitBorrow}>
                        <Row gutter={16}>
                            {items?.map((item) => (
                                <Col span={8} key={item.id}>
                                    <Card 
                                        title={item.name} 
                                        bordered={selectedItem?.id !== item.id}
                                        onClick={() => handleItemSelect(item)}
                                        style={{ cursor: 'pointer', marginBottom: '16px' }}
                                    >
                                        <p>Category: {item.category}</p>
                                        <p>Available: {item.quantity}</p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {selectedItem && (
                            <>
                                <Typography.Title level={4} style={{ marginTop: '16px' }}>
                                    Borrow Request for {selectedItem.name}
                                </Typography.Title>
                                <Input 
                                    placeholder="Purpose of Borrowing" 
                                    value={data.purpose} 
                                    onChange={(e) => setData('purpose', e.target.value)} 
                                    style={{ marginBottom: '8px' }} 
                                />
                                <Input 
                                    type="datetime-local" 
                                    value={data.borrow_date} 
                                    onChange={(e) => setData('borrow_date', e.target.value)} 
                                    style={{ marginBottom: '8px' }} 
                                />
                                <Input 
                                    type="datetime-local" 
                                    value={data.return_date} 
                                    onChange={(e) => setData('return_date', e.target.value)} 
                                    style={{ marginBottom: '8px' }} 
                                />
                                <Button type="primary" htmlType="submit" loading={processing}>
                                    Submit Borrow Request
                                </Button>
                            </>
                        )}
                    </form>
                </StyledModal>

                <StyledModal 
                    title={<Typography.Title level={3}>Request Tanod Service</Typography.Title>}
                    open={openTanodModal} 
                    onCancel={handleCloseTanodModal}
                    footer={null}
                    width={600}
                >
                    <form onSubmit={handleSubmitTanodRequest}>
                        <Input 
                            placeholder="Contact Number" 
                            value={tanodData.contact}
                            onChange={(e) => setTanodData('contact', e.target.value)}
                            style={{ marginBottom: '8px' }} 
                        />
                        <Input.TextArea 
                            placeholder="Details of Request" 
                            value={tanodData.details}
                            onChange={(e) => setTanodData('details', e.target.value)}
                            style={{ marginBottom: '8px' }} 
                        />
                        <Input 
                            placeholder="Place of Request" 
                            value={tanodData.place}
                            onChange={(e) => setTanodData('place', e.target.value)}
                            style={{ marginBottom: '8px' }} 
                        />
                        <Upload {...tanodUploadProps}>
                            <Button icon={<UploadOutlined />}>Upload Request Letter</Button>
                        </Upload>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={processingTanod} 
                            style={{ marginTop: '16px', width: '100%' }}
                        >
                            Submit Tanod Request
                        </Button>
                    </form>
                </StyledModal>

                <StyledModal 
                    title={<Typography.Title level={3}>Emergency Assistance Request</Typography.Title>}
                    open={openEmergencyModal} 
                    onCancel={handleCloseEmergencyModal}
                    footer={null}
                    width={600}
                >
                    <form onSubmit={handleEmergencyRequest}>
                        <Input 
                            placeholder="Contact Number" 
                            value={emergencyData.contact}
                            onChange={(e) => setEmergencyData('contact', e.target.value)}
                            style={{ marginBottom: '8px' }} 
                            required
                            prefix={<PhoneOutlined />}
                        />
                        <Select 
                            placeholder="Type of SK Emergency Assistance"
                            style={{ width: '100%', marginBottom: '8px' }}
                            value={emergencyData.assistanceType}
                            onChange={(value) => setEmergencyData('assistanceType', value)}
                            required
                        >
                            <Select.Option value="health">Health Assistance</Select.Option>
                            <Select.Option value="financial">Financial Support</Select.Option>
                            <Select.Option value="education">Educational Aid</Select.Option>
                            <Select.Option value="community">Community Safety</Select.Option>
                            <Select.Option value="personal">Personal Crisis</Select.Option>
                        </Select>
                        <Input.TextArea 
                            placeholder="Describe Your Emergency or Need" 
                            rows={4}
                            value={emergencyData.description}
                            onChange={(e) => setEmergencyData('description', e.target.value)}
                            style={{ marginBottom: '8px' }}
                            required
                        />
                        <Upload {...emergencyUploadProps}>
                            <Button icon={<UploadOutlined />}>Upload Supporting Document</Button>
                        </Upload>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={processingEmergency}
                            style={{ marginTop: '16px', width: '100%' }}
                        >
                            Submit SK Emergency Request
                        </Button>
                    </form>
                </StyledModal>
            </StyledWrapper>
        </AuthenticatedLayout>
    );
};

export default HelpCenter;