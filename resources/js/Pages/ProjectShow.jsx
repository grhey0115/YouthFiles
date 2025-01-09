import {React,useState} from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    Card, Row, Col, Statistic, Progress, 
    Descriptions, Table, Tag, Space, Divider, Typography, Timeline, Button, Badge, Layout 
} from 'antd';
import { 
    CalendarOutlined, DollarOutlined, 
    CheckCircleOutlined, ClockCircleOutlined,
    FileTextOutlined, TeamOutlined,
    ShoppingOutlined, BankOutlined,
    UpOutlined, DownOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;


const ProjectShow = () => {
    const { project, auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('procurements');

    const formatCurrency = (amount) => {
        // Handle undefined, null, or NaN values
        const numericAmount = Number(amount) || 0;
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(numericAmount);
    };

  

    const calculateTotalCost = (items) => {
        if (!Array.isArray(items)) return 0;
        return items.reduce((sum, item) => {
            // Here we assume total_cost is a number or can be converted to a number
            const itemCost = Number(item.total_cost) || 0;
            return sum + itemCost;
        }, 0);
    };

    

    const getStatusColor = (status) => {
        const colors = {
            'approved': 'success',
            'pending': 'warning',
            'rejected': 'error',
            'draft': 'default'
        };
        return colors[status?.toLowerCase()] || 'default';
    };

    const procurementColumns = [
        {
            title: 'PR No.',
            dataIndex: 'pr_no',
            key: 'pr_no',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Cost',
            dataIndex: 'procurement_cost',
            key: 'cost',
            render: (amount) => formatCurrency(amount),
        },
        {
            title: 'Date',
            dataIndex: 'procurement_date',
            key: 'date',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'approval_status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {status?.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Officers',
            key: 'officers',
            render: (_, record) => (
                <Space direction="vertical" size="small">
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        Requested by: {record.request_by}
                        {record.requestor_designation && 
                            <Text type="secondary"> ({record.requestor_designation})</Text>
                        }
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        Approved by: {record.approve_by}
                        {record.approver_designation && 
                            <Text type="secondary"> ({record.approver_designation})</Text>
                        }
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        Procurement Officer: {record.procurement_officer}
                    </Text>
                </Space>
            ),
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
            ellipsis: true,
        },
        {
            title: 'Items Summary',
            key: 'items_summary',
            render: (_, record) => (
                <Space direction="vertical" size="small">
                    <Text>
                        Total Items: {record.procurement_items?.length || 0}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        Click to view details
                    </Text>
                </Space>
            ),
        },
    ];

    const expandedRowRender = (record) => {
        const itemColumns = [
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                width: '30%',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                width: '15%',
            },
            {
                title: 'Unit',
                dataIndex: 'unit',
                key: 'unit',
                width: '15%',
            },
            {
                title: 'Unit Cost',
                dataIndex: 'unit_cost',
                key: 'unit_cost',
                width: '20%',
                render: (cost) => formatCurrency(cost),
            },
            {
                title: 'Total Cost',
                dataIndex: 'total_cost',
                key: 'total_cost',
                width: '20%',
                render: (cost) => formatCurrency(cost),
            },
        ];

        return (
            <Card 
                title="Procurement Items" 
                bordered={false}
                className="procurement-items-card"
            >
                <Table
                    columns={itemColumns}
                    dataSource={record.procurement_items}
                    pagination={false}
                    rowKey="id"
                    summary={(pageData) => {
                        const totalCost = pageData.reduce(
                            (sum, item) => {
                              const itemCost = Number(item.total_cost) || 0;
                              return sum + itemCost;
                            },
                            0
                        );

                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={4} align="right">
                                        <strong>Total:</strong>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={4}>
                                        <strong>{formatCurrency(totalCost)}</strong>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        );
                    }}
                    footer={() => (
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <Text type="secondary">
                                Total Items: {record.procurement_items?.length || 0}
                            </Text>
                        </Space>
                    )}
                />
            </Card>
        );
    };

    const disbursementColumns = [
        {
            title: 'DV No.',
            dataIndex: 'disbursement_no', 
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Amount',
            dataIndex: 'disbursed_amount',
            key: 'amount',
            render: (amount) => formatCurrency(amount),
            sorter: (a, b) => a.disbursed_amount - b.disbursed_amount,
        },
        {
            title: 'Date',
            dataIndex: 'disbursement_date',
            key: 'date',
            render: (date) => new Date(date).toLocaleDateString(),
            sorter: (a, b) => new Date(a.disbursement_date) - new Date(b.disbursement_date),
        },
        {
            title: 'Recipient',
            dataIndex: 'recipient_name',
            key: 'recipient',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {status?.toUpperCase()}
                </Tag>
            ),
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Approved', value: 'approved' },
                { text: 'Released', value: 'released' },
                { text: 'Cancelled', value: 'cancelled' },
            ],
            onFilter: (value, record) => record.status.toLowerCase() === value,
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
            ellipsis: true,
        },
    ];

    const expandedDisbursementRender = (record) => (
        <Card bordered={false}>
            <Descriptions title="Disbursement Details" column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
                <Descriptions.Item label="Purpose">
                    {record.purpose}
                </Descriptions.Item>
                <Descriptions.Item label="Payment Method">
                    {record.payment_method}
                </Descriptions.Item>
                <Descriptions.Item label="Reference No.">
                    {record.reference_no}
                </Descriptions.Item>
                <Descriptions.Item label="Bank Details">
                    {record.bank_details}
                </Descriptions.Item>
                {record.supporting_documents && (
                    <Descriptions.Item label="Supporting Documents">
                        <a href={`/storage/${record.supporting_documents}`} target="_blank">
                            View Documents
                        </a>
                    </Descriptions.Item>
                )}
                <Descriptions.Item label="Created At">
                    {new Date(record.created_at).toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At">
                    {new Date(record.updated_at).toLocaleString()}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );

    return (
        <AuthenticatedLayout user={auth} activeTab="projects">
            <Head title={project.name} />
            <Layout.Content className="container mx-auto p-2 md:p-4">
                {/* Hero Section */}
                <Card 
                    bordered={false} 
                    className="mb-4 md:mb-6 overflow-hidden"
                    cover={
                        <div className="relative h-[250px] md:h-[400px] w-full">
                            <div className="absolute inset-0 bg-black/50 z-10" />
                            <img
                                src={project.header_image ? `/storage/${project.header_image}` : '/default-project-image.jpg'}
                                alt="Project Banner"
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Project Title Overlay */}
                            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-4">
                                <h1 className="text-2xl md:text-5xl font-bold text-center mb-2 md:mb-4">{project.name}</h1>
                                <div className="flex flex-wrap justify-center gap-2 md:gap-6 text-base md:text-lg">
                                    <Badge 
                                        count={formatCurrency(project.total_budget)}
                                        style={{ 
                                            backgroundColor: '#52c41a',
                                            fontSize: '12px',
                                            md: '14px',
                                            padding: '0 8px'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                >
                    {/* Project Statistics */}
                    <Row gutter={[8, 8]} className="mt-4">
                        <Col xs={12} sm={12} md={6}>
                            <Card className="text-center h-full">
                                <Statistic
                                    title={<span className="text-xs md:text-sm">Total Budget</span>}
                                    value={project.total_budget}
                                    prefix={<DollarOutlined />}
                                    formatter={formatCurrency}
                                    className="text-sm md:text-base"
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <Card className="text-center h-full">
                                <Statistic
                                    title={<span className="text-xs md:text-sm">Remaining</span>}
                                    value={project.remaining_budget}
                                    prefix={<DollarOutlined />}
                                    formatter={formatCurrency}
                                    valueStyle={{ color: project.remaining_budget > 0 ? '#3f8600' : '#cf1322' }}
                                    className="text-sm md:text-base"
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <Card className="text-center h-full">
                                <Statistic
                                    title={<span className="text-xs md:text-sm">Duration</span>}
                                    value={project.project_duration}
                                    prefix={<ClockCircleOutlined />}
                                    className="text-sm md:text-base"
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <Card className="text-center h-full">
                                <Statistic
                                    title={<span className="text-xs md:text-sm">Progress</span>}
                                    value={project.progress}
                                    prefix={<CheckCircleOutlined />}
                                    suffix="%"
                                    className="text-sm md:text-base"
                                />
                                <Progress percent={project.progress} size="small" />
                            </Card>
                        </Col>
                    </Row>
                </Card>

                {/* Project Details */}
                <Row gutter={[8, 8]}>
                    <Col xs={24} lg={12}>
                        <Card title="Project Information" className="mb-4">
                            <Descriptions column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} size="small">
                                <Descriptions.Item label="Description" className="whitespace-pre-wrap">
                                    {project.description}
                                </Descriptions.Item>
                                <Descriptions.Item label="Start Date">
                                    <CalendarOutlined className="mr-2" />
                                    {new Date(project.start_date).toLocaleDateString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="End Date">
                                    <CalendarOutlined className="mr-2" />
                                    {new Date(project.end_date).toLocaleDateString()}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card title="Budget Utilization" className="mb-4">
                            <div className="flex flex-col items-center">
                                <Progress
                                    type="circle"
                                    percent={((project.total_budget - project.remaining_budget) / project.total_budget * 100).toFixed(1)}
                                    format={percent => `${percent}% Used`}
                                    size="small"
                                />
                                <Divider className="my-2" />
                                <Space direction="vertical" size="small" className="text-sm">
                                    <Text>Total: {formatCurrency(project.total_budget)}</Text>
                                    <Text>Used: {formatCurrency(project.total_budget - project.remaining_budget)}</Text>
                                    <Text>Remaining: {formatCurrency(project.remaining_budget)}</Text>
                                </Space>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Mobile Tab Buttons */}
                <div className="flex gap-2 mb-4 md:hidden">
                    <Button 
                        type={activeTab === 'procurements' ? 'primary' : 'default'}
                        onClick={() => setActiveTab('procurements')}
                        block
                    >
                        <ShoppingOutlined /> Procurements
                    </Button>
                    <Button 
                        type={activeTab === 'disbursements' ? 'primary' : 'default'}
                        onClick={() => setActiveTab('disbursements')}
                        block
                    >
                        <BankOutlined /> Disbursements
                    </Button>
                </div>

                {/* Responsive Tables */}
                <div className="md:hidden">
                    {activeTab === 'procurements' && (
                        <Card className="mb-4">
                            <Table
                                columns={procurementColumns.filter(col => ['pr_no', 'cost', 'status'].includes(col.key))}
                                dataSource={project.procurements}
                                rowKey="id"
                                expandable={{
                                    expandedRowRender,
                                    expandRowByClick: true,
                                }}
                                pagination={{ pageSize: 5 }}
                                scroll={{ x: true }}
                                size="small"
                            />
                        </Card>
                    )}

                    {activeTab === 'disbursements' && (
                        <Card className="mb-4">
                            <Table
                                columns={disbursementColumns.filter(col => ['disbursement_no', 'amount', 'status'].includes(col.key))}
                                dataSource={project.disbursements}
                                rowKey="id"
                                expandable={{
                                    expandedRowRender: expandedDisbursementRender,
                                    expandRowByClick: true,
                                }}
                                pagination={{ pageSize: 5 }}
                                scroll={{ x: true }}
                                size="small"
                            />
                        </Card>
                    )}
                </div>

                {/* Desktop Tables */}
                <div className="hidden md:block">
                    <Card title={<Space><ShoppingOutlined />Project Procurements</Space>} className="mb-6">
                        <Table
                            columns={procurementColumns}
                            dataSource={project.procurements}
                            rowKey="id"
                            expandable={{
                                expandedRowRender,
                                expandRowByClick: true,
                            }}
                            pagination={{ pageSize: 5 }}
                        />
                    </Card>

                    <Card title={<Space><BankOutlined />Project Disbursements</Space>} className="mb-6">
                        <Table
                            columns={disbursementColumns}
                            dataSource={project.disbursements}
                            rowKey="id"
                            expandable={{
                                expandedRowRender: expandedDisbursementRender,
                                expandRowByClick: true,
                            }}
                            pagination={{ pageSize: 5 }}
                        />
                    </Card>
                </div>

                {/* Financial Summary */}
                <Card title="Financial Summary" className="mb-4">
                    <Row gutter={[8, 8]}>
                        <Col xs={24} sm={8}>
                            <Statistic
                                title={<span className="text-xs md:text-sm">Total Budget</span>}
                                value={project.total_budget}
                                prefix={<DollarOutlined />}
                                formatter={formatCurrency}
                                className="text-sm md:text-base"
                            />
                        </Col>
                        <Col xs={24} sm={8}>
                            <Statistic
                                title={<span className="text-xs md:text-sm">Total Procurements</span>}
                                value={project.procurements?.reduce((sum, p) => sum + (p.procurement_cost || 0), 0)}
                                prefix={<ShoppingOutlined />}
                                formatter={formatCurrency}
                                className="text-sm md:text-base"
                            />
                        </Col>
                        <Col xs={24} sm={8}>
                            <Statistic
                                title={<span className="text-xs md:text-sm">Total Disbursements</span>}
                                value={project.total_budget - project.remaining_budget}
                                prefix={<BankOutlined />}
                                formatter={formatCurrency}
                                className="text-sm md:text-base"
                            />
                        </Col>
                    </Row>
                    <Divider className="my-4" />
                    <Progress
                        percent={((project.total_budget - project.remaining_budget) / project.total_budget * 100).toFixed(1)}
                        status="active"
                        format={percent => `${percent}% Used`}
                    />
                </Card>
            </Layout.Content>
        </AuthenticatedLayout>
    );
};

export default ProjectShow;