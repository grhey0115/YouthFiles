import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Tabs, Pagination, Badge, Space, Tag, List, Button, 
    Avatar, Empty, Card, Typography, Col, Row, Modal, 
    Tooltip, Popover 
} from 'antd';
import { useState } from 'react';
import { 
    CalendarOutlined, UserOutlined, EnvironmentOutlined, 
    DollarCircleOutlined, ShareAltOutlined, InfoCircleOutlined,
    FacebookFilled, TwitterOutlined, LinkedinFilled, WhatsAppOutlined,
    FileTextOutlined, CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const Ayuda = () => {
    const { openAyudas, closedAyudas, topDonators } = usePage().props;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAyuda, setSelectedAyuda] = useState(null);
    const [isRequirementsVisible, setIsRequirementsVisible] = useState(false);
    const itemsPerPage = 8;

    const handleShare = (ayuda, platform) => {
        const url = window.location.origin + route('ayuda.show', ayuda.id);
        const title = encodeURIComponent(ayuda.title);
        const description = encodeURIComponent(ayuda.description);

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            whatsapp: `https://api.whatsapp.com/send?text=${title}%20${url}`
        };

        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    const renderShareButtons = (ayuda) => (
        <Space>
            <Tooltip title="Share on Facebook">
                <Button 
                    type="text" 
                    icon={<FacebookFilled />} 
                    onClick={() => handleShare(ayuda, 'facebook')}
                    className="text-blue-600 hover:text-blue-700"
                />
            </Tooltip>
            <Tooltip title="Share on Twitter">
                <Button 
                    type="text" 
                    icon={<TwitterOutlined />} 
                    onClick={() => handleShare(ayuda, 'twitter')}
                    className="text-sky-500 hover:text-sky-600"
                />
            </Tooltip>
            <Tooltip title="Share on LinkedIn">
                <Button 
                    type="text" 
                    icon={<LinkedinFilled />} 
                    onClick={() => handleShare(ayuda, 'linkedin')}
                    className="text-blue-700 hover:text-blue-800"
                />
            </Tooltip>
            <Tooltip title="Share on WhatsApp">
                <Button 
                    type="text" 
                    icon={<WhatsAppOutlined />} 
                    onClick={() => handleShare(ayuda, 'whatsapp')}
                    className="text-green-500 hover:text-green-600"
                />
            </Tooltip>
        </Space>
    );

    const renderRequirements = (ayuda) => (
        <Card size="small" className="mb-4">
            <Space direction="vertical" className="w-full">
                <Space>
                    <FileTextOutlined />
                    <Text strong>Requirements:</Text>
                </Space>
                <ul className="list-disc pl-8">
                    {ayuda.requirements?.map((req, index) => (
                        <li key={index} className="text-gray-600">
                            <Space>
                                <CheckCircleOutlined className="text-green-500" />
                                <Text>{req}</Text>
                            </Space>
                        </li>
                    ))}
                </ul>
            </Space>
        </Card>
    );

    const renderAyudaCard = (ayuda) => (
        <Badge.Ribbon 
            key={ayuda.id}
            text={ayuda.max_beneficiaries - ayuda.current_beneficiaries > 0 
                ? `${ayuda.max_beneficiaries - ayuda.current_beneficiaries} Slots Left`
                : "Full"} 
            color={ayuda.max_beneficiaries - ayuda.current_beneficiaries > 0 ? 'green' : 'red'} 
            placement="start"
        >
            <Card 
                hoverable 
                className="h-full"
                cover={
                    <img 
                        className="h-48 object-cover" 
                        src={`/storage/${ayuda.header}`} 
                        alt={ayuda.title} 
                    />
                }
                actions={[
                    <Link href={route('ayuda.show', ayuda.id)}>
                        <Button type="primary" block>
                            View Details
                        </Button>
                    </Link>,
                    <Popover 
                        content={renderShareButtons(ayuda)} 
                        title="Share this assistance"
                        trigger="click"
                    >
                        <Button icon={<ShareAltOutlined />}>Share</Button>
                    </Popover>,
                    <Popover
                        content={renderRequirements(ayuda)}
                        title="Requirements"
                        trigger="click"
                        placement="bottom"
                    >
                        <Button icon={<FileTextOutlined />}>Requirements</Button>
                    </Popover>
                ]}
            >
                <Card.Meta
                    title={ayuda.title}
                    description={
                        <Space direction="vertical" className="w-full">
                            <Space>
                                <CalendarOutlined />
                                <Text>{new Date(ayuda.assistance_date).toLocaleDateString()}</Text>
                            </Space>
                            <Space>
                                <EnvironmentOutlined />
                                <Text>{ayuda.location || "Online"}</Text>
                            </Space>
                            <Paragraph ellipsis={{ rows: 2 }}>
                                {ayuda.description}
                            </Paragraph>
                            <Tag color="blue">
                                {ayuda.category}
                            </Tag>
                        </Space>
                    }
                />
            </Card>
        </Badge.Ribbon>
    );

    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };

    const getPaginatedData = (data) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const renderTopDonatorsSidebar = () => (
        <Card title="Top Donators" className="sticky top-24">
            {topDonators && topDonators.length > 0 ? (
                <List
                    dataSource={topDonators}
                    renderItem={(donator, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Space>
                                        <Avatar 
                                            src={donator.avatar_url}
                                            icon={<UserOutlined />}
                                            size="large"
                                            style={{ 
                                                border: index === 0 ? '2px solid #FFD700' : 
                                                       index === 1 ? '2px solid #C0C0C0' : 
                                                       index === 2 ? '2px solid #CD7F32' : 'none'
                                            }}
                                        />
                                        <Avatar 
                                            style={{ 
                                                backgroundColor: index === 0 ? '#FFD700' : 
                                                               index === 1 ? '#C0C0C0' : 
                                                               index === 2 ? '#CD7F32' : '#f0f0f0',
                                                marginLeft: -15,
                                                marginTop: 15,
                                                width: 22,
                                                height: 22,
                                                fontSize: 12,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {index + 1}
                                        </Avatar>
                                    </Space>
                                }
                                title={
                                    <Space>
                                        <Text strong>{donator.name}</Text>
                                        {index < 3 && (
                                            <Tag color={
                                                index === 0 ? 'gold' : 
                                                index === 1 ? 'default' : 
                                                'orange'
                                            }>
                                                {index === 0 ? 'Top Donor' : 
                                                 index === 1 ? '2nd Place' : 
                                                 '3rd Place'}
                                            </Tag>
                                        )}
                                    </Space>
                                }
                                description={
                                    <Text type="secondary">
                                        Donated: ₱{donator.amount.toLocaleString()}
                                    </Text>
                                }
                            />
                        </List.Item>
                    )}
                    locale={{
                        emptyText: (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="No donations yet"
                            />
                        )
                    }}
                />
            ) : (
                <Empty 
                    description="Be the first to donate!"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                    <Button 
                        type="primary" 
                        icon={<DollarCircleOutlined />}
                    >
                        Donate Now
                    </Button>
                </Empty>
            )}
        </Card>
    );

    return (
        <AuthenticatedLayout user={usePage().props.auth}>
            <Head title="Ayuda" />

            <div className="container mx-auto py-6">
                <Row gutter={24}>
                    <Col xs={24} lg={18}>
                        <Card className="mb-6">
                            <Tabs defaultActiveKey="1" type="card">
                                <Tabs.TabPane 
                                    tab={
                                        <Space>
                                            <CalendarOutlined />
                                            Upcoming Assistance
                                        </Space>
                                    } 
                                    key="1"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {getPaginatedData(openAyudas).map(ayuda => (
                                            <div key={ayuda.id}>
                                                {renderAyudaCard(ayuda)}
                                            </div>
                                        ))}
                                    </div>
                                </Tabs.TabPane>
                                <Tabs.TabPane 
                                    tab={
                                        <Space>
                                            <CheckCircleOutlined />
                                            Past Assistance
                                        </Space>
                                    } 
                                    key="2"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {getPaginatedData(closedAyudas).map(ayuda => (
                                            <div key={ayuda.id}>
                                                {renderAyudaCard(ayuda)}
                                            </div>
                                        ))}
                                    </div>
                                </Tabs.TabPane>
                            </Tabs>
                            <div className="flex justify-center mt-6">
                                <Pagination
                                    current={currentPage}
                                    pageSize={itemsPerPage}
                                    total={openAyudas.length}
                                    onChange={handlePaginationChange}
                                    showSizeChanger={false}
                                />
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} lg={6}>
                        {renderTopDonatorsSidebar()}
                    </Col>
                </Row>
            </div>
        </AuthenticatedLayout>
    );
};

export default Ayuda;