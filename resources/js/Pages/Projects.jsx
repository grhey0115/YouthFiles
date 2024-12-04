import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Tabs, Card, Row, Col, Badge, Space, Tag, Empty, 
    Typography, Button, Pagination, Statistic, Progress 
} from 'antd';
import { 
    CalendarOutlined, DollarOutlined, 
    ClockCircleOutlined, ProjectOutlined, CheckCircleOutlined,
    FileTextOutlined, PauseCircleOutlined, EditOutlined
} from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

const Projects = () => {
    const props = usePage().props;
    const { ongoingProjects = [], completedProjects = [], statistics = {} } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const getStatusColor = (status) => {
        const colors = {
            draft: 'default',
            ongoing: 'processing',
            completed: 'success',
            on_hold: 'warning'
        };
        return colors[status] || 'default';
    };

    const getStatusBadgeColor = (status) => {
        const colors = {
            draft: 'gray',
            ongoing: 'green',
            completed: 'blue',
            on_hold: 'orange'
        };
        return colors[status] || 'default';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount || 0);
    };

    const renderProjects = (projects = []) => {
        if (!Array.isArray(projects)) {
            console.error('Projects is not an array:', projects);
            return null;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProjects = projects.slice(startIndex, endIndex);

        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedProjects.length > 0 ? (
                        paginatedProjects.map(project => (
                            <Badge.Ribbon 
                                key={project.id}
                                text={project.status?.toUpperCase()} 
                                color={getStatusBadgeColor(project.status)}
                            >
                                <Card
                                    hoverable
                                    cover={
                                        <img 
                                            className="h-48 w-full object-cover"
                                            src={project.header_image ? `/storage/${project.header_image}` : '/default-project-image.jpg'}
                                            alt={project.name}
                                            onError={(e) => {
                                                e.target.src = '/default-project-image.jpg';
                                            }}
                                        />
                                    }
                                    className="h-full flex flex-col"
                                >
                                    <div className="flex flex-col h-full">
                                        <Title level={4} className="mb-2 line-clamp-2">
                                            {project.name}
                                        </Title>
                                        
                                        <Space direction="vertical" size="small" className="w-full mb-4">
                                            <Text className="text-gray-600">
                                                <CalendarOutlined className="mr-2" />
                                                {new Date(project.start_date).toLocaleDateString()}
                                            </Text>
                                            <Text className="text-gray-600">
                                                <DollarOutlined className="mr-2" />
                                                {formatCurrency(project.total_budget)}
                                            </Text>
                                            {project.project_duration && (
                                                <Text className="text-gray-600">
                                                    <FileTextOutlined className="mr-2" />
                                                    {project.project_duration}
                                                </Text>
                                            )}
                                            <Progress 
                                                percent={project.progress || 0} 
                                                size="small"
                                                status={
                                                    project.status === 'completed' ? 'success' :
                                                    project.status === 'on_hold' ? 'exception' :
                                                    'active'
                                                }
                                            />
                                        </Space>

                                        <Paragraph 
                                            className="text-gray-600 mb-4 flex-grow"
                                            ellipsis={{ rows: 2 }}
                                        >
                                            {project.description}
                                        </Paragraph>

                                        <div className="mt-auto">
                                            <Space size="small" wrap className="mb-3">
                                                <Tag color="blue">
                                                    {project.disbursements_count || 0} Disbursements
                                                </Tag>
                                                <Tag color="green">
                                                    {project.procurements_count || 0} Procurements
                                                </Tag>
                                                <Tag color={getStatusColor(project.status)}>
                                                    {formatCurrency(project.remaining_budget || 0)} Remaining
                                                </Tag>
                                            </Space>
                                            
                                            <Link
                                                href={route('projects.show', project.id)}
                                                className="inline-flex w-full items-center justify-center text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition duration-300"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            </Badge.Ribbon>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <Empty description="No projects found" />
                        </div>
                    )}
                </div>
                {projects.length > itemsPerPage && (
                    <div className="flex justify-center mt-6">
                        <Pagination
                            current={currentPage}
                            pageSize={itemsPerPage}
                            total={projects.length}
                            onChange={setCurrentPage}
                            showSizeChanger={false}
                        />
                    </div>
                )}
            </>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Projects" />

            <div className="container mx-auto px-4 py-6">
                <Row gutter={24}>
                    <Col xs={24} lg={18}>
                        <Card className="mb-4">
                            <Tabs defaultActiveKey="1" type="card" centered>
                                <Tabs.TabPane 
                                    tab={`Ongoing Projects (${ongoingProjects.length})`} 
                                    key="1"
                                >
                                    {renderProjects(ongoingProjects)}
                                </Tabs.TabPane>
                                <Tabs.TabPane 
                                    tab={`Completed Projects (${completedProjects.length})`} 
                                    key="2"
                                >
                                    {renderProjects(completedProjects)}
                                </Tabs.TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                    <Col xs={24} lg={6}>
                        <Card title="Project Statistics" className="sticky top-24">
                            <Space direction="vertical" size="large" className="w-full">
                                <Statistic
                                    title="Total Projects"
                                    value={statistics.total || 0}
                                    prefix={<ProjectOutlined />}
                                />
                                <Statistic
                                    title="Ongoing Projects"
                                    value={statistics.ongoing || 0}
                                    prefix={<ClockCircleOutlined />}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                                <Statistic
                                    title="Completed Projects"
                                    value={statistics.completed || 0}
                                    prefix={<CheckCircleOutlined />}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                                <Statistic
                                    title="On Hold"
                                    value={statistics.on_hold || 0}
                                    prefix={<PauseCircleOutlined />}
                                    valueStyle={{ color: '#faad14' }}
                                />
                                <Statistic
                                    title="Draft"
                                    value={statistics.draft || 0}
                                    prefix={<EditOutlined />}
                                    valueStyle={{ color: '#8c8c8c' }}
                                />
                                <Statistic
                                    title="Total Budget"
                                    value={statistics.total_budget || 0}
                                    prefix={<DollarOutlined />}
                                    formatter={formatCurrency}
                                />
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        </AuthenticatedLayout>
    );
};

export default Projects;