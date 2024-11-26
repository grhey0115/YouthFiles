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
    Select 
} from 'antd';
import { 
    UploadOutlined, 
    SafetyCertificateOutlined, 
    ToolOutlined,
    ExclamationCircleOutlined ,
    PhoneOutlined,
} from '@ant-design/icons';
import styled from "styled-components";

// Styled Components
const StyledWrapper = styled.div`
    padding: 40px 20px;
    background-color: #f9fafb;
    border-radius: 10px;
`;

const Header = styled.div`
    margin-bottom: 30px;
    text-align: center;
`;

const StyledCard = styled(Card)`
    background-color: #e6f7ff;
    color: #333;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
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
                    <Typography.Title level={2}>
                        Get Assistance from Our Help Center
                    </Typography.Title>
                    <Typography.Text>
                        Need help with equipment, tanod services, or emergency assistance? Our Help Center is here to support you.
                    </Typography.Text>
                </Header>
                
                <Row gutter={16} justify="center">
                    <Col xs={24} sm={12} md={8}>
                        <StyledCard 
                            title="SK Emergency Assistance" 
                            onClick={handleOpenEmergencyModal} 
                            hoverable
                            extra={<ExclamationCircleOutlined style={{ fontSize: '24px', color: '#dc3545' }} />}
                        >
                            <Typography.Text>Request urgent SK community support.</Typography.Text>
                        </StyledCard>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <StyledCard 
                            title="Tanod Request" 
                            onClick={handleOpenTanodModal} 
                            hoverable
                            extra={<SafetyCertificateOutlined style={{ fontSize: '24px', color: '#28a745' }} />}
                        >
                            <Typography.Text>Request Tanod service.</Typography.Text>
                        </StyledCard>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <StyledCard 
                            title="Borrow Equipment" 
                            onClick={handleOpenBorrowModal} 
                            hoverable
                            extra={<ToolOutlined style={{ fontSize: '24px', color: '#ffc107' }} />}
                        >
                            <Typography.Text>Borrow equipment easily.</Typography.Text>
                        </StyledCard>
                    </Col>
                </Row>

                {/* Borrow Equipment Modal */}
                <Modal 
                    title="Borrow Equipment" 
                    open={openBorrowModal} 
                    onCancel={handleCloseBorrowModal}
                    footer={null}
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
                </Modal>

                {/* Tanod Request Modal */}
                <Modal 
                    title="Tanod Request" 
                    open={openTanodModal} 
                    onCancel={handleCloseTanodModal}
                    footer={null}
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
                </Modal>

              {/* SK Emergency Assistance Modal */}
                    <Modal 
                        title="SK Emergency Assistance Request" 
                        open={openEmergencyModal} 
                        onCancel={handleCloseEmergencyModal}
                        footer={null}
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
                    </Modal>
            </StyledWrapper>
        </AuthenticatedLayout>
    );
};

export default HelpCenter;