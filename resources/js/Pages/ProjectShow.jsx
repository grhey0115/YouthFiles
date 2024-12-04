import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    Card, Row, Col, Statistic, Progress, 
    Descriptions, Table, Tag, Space, Divider, Typography, Timeline, Button 
} from 'antd';
import { 
    CalendarOutlined, DollarOutlined, 
    CheckCircleOutlined, ClockCircleOutlined,
    FileTextOutlined, TeamOutlined,
    ShoppingOutlined, BankOutlined,
    UpOutlined, DownOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ProjectShow = () => {
    const { project, auth } = usePage().props;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount || 0);
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
                            (sum, item) => sum + (item.total_cost || 0),
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
            dataIndex: 'dv_no',
            key: 'dv_no',
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
        <AuthenticatedLayout user={auth}>
            <Head title={project.name} />

            <div className="container mx-auto p-6">
                {/* Project Header */}
                <Card className="mb-6">
                    <div className="relative mb-6">
                        <img
                            src={project.header_image ? `/storage/${project.header_image}` : '/default-project-image.jpg'}
                            alt={project.name}
                            className="w-full h-64 object-cover rounded-lg"
                            onError={(e) => {
                                e.target.src = '/default-project-image.jpg';
                            }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                            <Title level={2} className="text-white mb-2">{project.name}</Title>
                            <Tag color={getStatusColor(project.status)} className="text-sm">
                                {project.status?.toUpperCase() || 'UNKNOWN'} 
                            </Tag>
                        </div>
                    </div>

                    {/* Project Statistics */}
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6}>
                            <Statistic
                                title="Total Budget"
                                value={project.total_budget}
                                prefix={<DollarOutlined />}
                                formatter={formatCurrency}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Statistic
                                title="Remaining Budget"
                                value={project.remaining_budget}
                                prefix={<DollarOutlined />}
                                formatter={formatCurrency}
                                valueStyle={{ color: project.remaining_budget > 0 ? '#3f8600' : '#cf1322' }}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Statistic
                                title="Project Duration"
                                value={project.project_duration}
                                prefix={<ClockCircleOutlined />}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Statistic
                                title="Progress"
                                value={project.progress}
                                prefix={<CheckCircleOutlined />}
                                suffix="%"
                            />
                            <Progress percent={project.progress} status={project.status === 'completed' ? 'success' : 'active'} />
                        </Col>
                    </Row>
                </Card>

                {/* Project Details */}
                <Row gutter={16}>
                    <Col xs={24} lg={12}>
                        <Card title="Project Information" className="mb-6">
                            <Descriptions column={1}>
                                <Descriptions.Item label="Description">
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
                                <Descriptions.Item label="Budget Source">
                                    <FileTextOutlined className="mr-2" />
                                    {project.budget?.name || 'N/A'} 
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card title="Budget Utilization" className="mb-6">
                            <Progress
                                type="circle"
                                percent={((project.total_budget - project.remaining_budget) / project.total_budget * 100).toFixed(1)}
                                format={percent => `${percent}% Used`}
                            />
                            <Divider />
                            <Space direction="vertical" size="small">
                                <Text>Total Budget: {formatCurrency(project.total_budget)}</Text>
                                <Text>Used: {formatCurrency(project.total_budget - project.remaining_budget)}</Text>
                                <Text>Remaining: {formatCurrency(project.remaining_budget)}</Text>
                            </Space>
                        </Card>
                    </Col>
                </Row>

                {/* Procurement Section */}
                <Card 
                    title={
                        <Space>
                            <ShoppingOutlined />
                            <span>Project Procurements</span>
                        </Space>
                    }
                    className="mb-6"
                >
                    <Table
                        columns={procurementColumns}
                        dataSource={project.procurements}
                        rowKey="id"
                        expandable={{
                            expandedRowRender,
                            expandRowByClick: true,
                            expandIcon: ({ expanded, onExpand, record }) => 
                                expanded ? (
                                    <Button 
                                        type="text" 
                                        icon={<UpOutlined />} 
                                        onClick={e => onExpand(record, e)}
                                    />
                                ) : (
                                    <Button 
                                        type="text" 
                                        icon={<DownOutlined />} 
                                        onClick={e => onExpand(record, e)}
                                    />
                                ),
                        }}
                        pagination={{ 
                            pageSize: 5,
                            showTotal: (total, range) => 
                                `${range[0]}-${range[1]} of ${total} procurements`,
                        }}
                        summary={(pageData) => {
                            const totalProcurementCost = pageData.reduce(
                                (sum, procurement) => sum + procurement.procurement_cost,
                                0
                            );

                            return (
                                <Table.Summary fixed>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={2}>
                                            <strong>Total Procurement Cost:</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2}>
                                            <strong>{formatCurrency(totalProcurementCost)}</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={3} colSpan={4} />
                                    </Table.Summary.Row>
                                </Table.Summary>
                            );
                        }}
                    />
                </Card>

                {/* Disbursement Section */}
                <Card 
                    title={
                        <Space>
                            <BankOutlined />
                            <span>Project Disbursements</span>
                        </Space>
                    }
                    className="mb-6"
                >
                    <Table
                        columns={disbursementColumns}
                        dataSource={project.disbursements}
                        rowKey="id"
                        expandable={{
                            expandedRowRender: expandedDisbursementRender,
                            expandRowByClick: true,
                        }}
                        pagination={{ 
                            pageSize: 5,
                            showTotal: (total, range) => 
                                `${range[0]}-${range[1]} of ${total} disbursements`,
                        }}
                        summary={(pageData) => {
                            const totalDisbursed = pageData.reduce(
                                (sum, disbursement) => sum + (disbursement.disbursed_amount || 0),
                                0
                            );

                            return (
                                <Table.Summary fixed>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={2}>
                                            <strong>Total Disbursed Amount:</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2}>
                                            <strong>{formatCurrency(project.total_budget - project.remaining_budget)}</strong>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={3} colSpan={4} />
                                    </Table.Summary.Row>
                                </Table.Summary>
                            );
                        }}
                    />
                </Card>

                {/* Financial Summary Section */}
                <Card title="Financial Summary" className="mb-6">
                    <Row gutter={16}>
                        <Col xs={24} sm={8}>
                            <Statistic
                                title="Total Budget"
                                value={project.total_budget}
                                prefix={<DollarOutlined />}
                                formatter={formatCurrency}
                            />
                        </Col>
                        <Col xs={24} sm={8}>
                            <Statistic
                                title="Total Procurements"
                                value={project.procurements?.reduce((sum, p) => sum + (p.procurement_cost || 0), 0)}
                                prefix={<ShoppingOutlined />}
                                formatter={formatCurrency}
                            />
                        </Col>
                        <Col xs={24} sm={8}>
                        <Statistic
                            title="Total Disbursements"
                            value={formatCurrency(project.total_budget - project.remaining_budget)}
                            prefix={<BankOutlined />}
                        />
                        </Col>
                    </Row>
                    <Divider />
                    <Progress
                        percent={((project.total_budget - project.remaining_budget) / project.total_budget * 100).toFixed(1)}
                        status="active"
                        format={percent => `${percent}% Used`}
                    />
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProjectShow;