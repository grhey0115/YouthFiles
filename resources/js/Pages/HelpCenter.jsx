import React, { useState } from "react";
import { usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { notification, Upload, Modal, Typography, Card, Row, Col, Input, Button } from 'antd';
import { UploadOutlined, FileTextOutlined, SafetyCertificateOutlined, ToolOutlined } from '@ant-design/icons';
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
    background-color: #e6f7ff; /* Lighter blue */
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
    const [selectedItem, setSelectedItem] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        item_id: null,
        purpose: '',
        borrow_date: '',
        return_date: ''
    });

    const { data: tanodData, setData: setTanodData, post: postTanod, processing: processingTanod, errors: tanodErrors } = useForm({
        contact: '',
        details: '',
        place: '',
        request_letter: null // For file upload
    });

    const handleOpenBorrowModal = () => {
        setOpenBorrowModal(true);
    };

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

    const handleOpenTanodModal = () => {
        setOpenTanodModal(true);
    };

    const handleCloseTanodModal = () => {
        setOpenTanodModal(false);
        setTanodData({
            contact: '',
            details: '',
            place: '',
            request_letter: null // Reset file upload
        });
    };

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setData('item_id', item.id);
    };

    const handleSubmitBorrow = (e) => {
        e.preventDefault();
        
        // Validate form data
        const errors = {};
        if (!data.item_id) errors.item_id = 'Please select an item';
        if (!data.purpose.trim()) errors.purpose = 'Purpose is required';
        if (!data.borrow_date) errors.borrow_date = 'Borrow date is required';
        if (!data.return_date) errors.return_date = 'Return date is required';
    
        if (Object.keys(errors).length > 0) {
            notification.error({
                message: 'Validation Error',
                description: Object.values(errors).join(', '),
                placement: 'topRight'
            });
            return;
        }
    
        post(route('borrow.store'), {
            onSuccess: (page) => {
                handleCloseBorrowModal();
                notification.success({
                    message: 'Borrow Request Submitted',
                    description: 'Your borrow request is now pending approval.',
                    placement: 'topRight',
                    duration: 3
                });
            },
            onError: (errors) => {
                notification.error({
                    message: 'Submission Failed',
                    description: Object.values(errors).join(', '),
                    placement: 'topRight'
                });
            }
        });
    };

    const handleSubmitTanodRequest = (e) => {
        e.preventDefault();

        // Validate Tanod request data
        const errors = {};
        if (!tanodData.contact.trim()) errors.contact = 'Contact is required';
        if (!tanodData.details.trim()) errors.details = 'Details are required';
        if (!tanodData.place.trim()) errors.place = 'Place is required';
        if (!tanodData.request_letter) errors.request_letter = 'Request letter is required';

        if (Object.keys(errors).length > 0) {
            notification.error({
                message: 'Validation Error',
                description: Object.values(errors).join(', '),
                placement: 'topRight'
            });
            return;
        }

        // Proceed with submission
        const formData = new FormData();
        formData.append('contact', tanodData.contact);
        formData.append('details', tanodData.details);
        formData.append('place', tanodData.place);
        formData.append('request_letter', tanodData.request_letter);

        postTanod(route('tanod.requests.store'), {
            data: formData,
            onSuccess: (page) => {
                handleCloseTanodModal();
                notification.success({
                    message: 'Tanod Request Submitted',
                    description: 'Your tanod request is now pending approval.',
                    placement: 'topRight',
                    duration: 3
                });
            },
            onError: (errors) => {
                notification.error({
                    message: 'Submission Failed',
                    description: Object.values(errors).join(', '),
                    placement: 'topRight'
                });
            }
        });
    };

    const handleFileChange = (file) => {
        setTanodData('request_letter', file);
    };

    const uploadProps = {
        beforeUpload: (file) => {
            handleFileChange(file);
            return false; // Prevent automatic upload
        },
        onRemove: () => {
            setTanodData('request_letter', null);
        },
        accept: '.pdf,.png,.jpg,.jpeg',
    };

    return (
        <AuthenticatedLayout user={auth}>
            <StyledWrapper>
                <Header>
                    <Typography.Title level={2}>
                        Get Assistance from Our Help Center
                    </Typography.Title>
                    <Typography.Text>
                        Need help with document requests, tanod services, or borrowing equipment and facilities? Our Help Center is here to assist you with all your needs.
                    </Typography.Text>
                </Header>
                
                <Row gutter={16} justify="center">
                    <Col xs={24} sm={12} md={8}>
                        <StyledCard 
                            title="Document Request" 
                            onClick={() => window.location.href = '/document-request'} 
                            hoverable
                            extra={<FileTextOutlined style={{ fontSize: '24px', color: '#007bff' }} />}
                        >
                            <Typography.Text>Request documents easily.</Typography.Text>
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
                    visible={openBorrowModal} 
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
                                        style={{ cursor: 'pointer' }}
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
                                <Typography.Paragraph>
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
                                </Typography.Paragraph>
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
                    visible={openTanodModal} 
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
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Upload Request Letter</Button>
                        </Upload>
                        {tanodErrors.request_letter && (
                            <Typography.Text type="danger">{tanodErrors.request_letter}</Typography.Text>
                        )}
                        <Button type="primary" htmlType="submit" loading={processingTanod} style={{ marginTop: '16px' }}>
                            Submit Tanod Request
                        </Button>
                    </form>
                </Modal>
            </StyledWrapper>
        </AuthenticatedLayout>
    );
};

export default HelpCenter;