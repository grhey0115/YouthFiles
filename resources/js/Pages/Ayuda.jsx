import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Tabs, Pagination, Badge,Space,Tag, List,Button, Avatar, Empty, Card, Typography, Col, Row } from 'antd';
import { useState } from 'react';
import { CalendarOutlined,UserOutlined, EnvironmentOutlined, DollarCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Ayuda = () => {
  const { openAyudas, closedAyudas, topDonators } = usePage().props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const renderAssistance = (data) => {
    const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const paginatedData = getPaginatedData(sortedData);

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedData && paginatedData.length > 0 ? (
            paginatedData.map(ayuda => (
              <Badge.Ribbon 
                key={ayuda.id}
                text={ayuda.max_beneficiaries - ayuda.current_beneficiaries > 0 
                    ? `${ayuda.max_beneficiaries - ayuda.current_beneficiaries} Slots Left`
                    : "Full"} 
                color={ayuda.max_beneficiaries - ayuda.current_beneficiaries > 0 ? 'green' : 'red'} 
                placement="start"
              >
                <div className="max-w-xs h-96 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col justify-between overflow-hidden text-center">
                  <img className="w-full h-36 object-cover" src={`/storage/${ayuda.header}`} alt={ayuda.title} />
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{ayuda.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 desc title truncate text-ellipsis">
                      <CalendarOutlined /> {new Date(ayuda.assistance_date).toLocaleDateString()} at {new Date(ayuda.assistance_date).toLocaleTimeString()}
                      <br />
                      <EnvironmentOutlined  /> {ayuda.location || "Online"}
                      <br />
                       {ayuda.description}
                    </p>
                    <Link href={route('ayuda.show', ayuda.id)} className="inline-flex items-center justify-center mt-4 text-white text-sm font-medium bg-green-500 hover:bg-green-700 px-4 py-2 rounded transition duration-300">
                      View Assistance
                    </Link>
                  </div>
                </div>
              </Badge.Ribbon>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-600">No assistance found.</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={data.length}
            onChange={handlePaginationChange}
            showSizeChanger={false}
          />
        </div>
      </>
    );
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

      <div className="container mx-auto">
        <Row gutter={24}>
          <Col xs={24} lg={18}>
            <div className="flex justify-center mb-4">
              <Tabs defaultActiveKey="1" type="card" centered>
                <Tabs.TabPane tab="Upcoming Assistance" key="1">
                  {renderAssistance(openAyudas)}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Past Assistance" key="2">
                  {renderAssistance(closedAyudas)}
                </Tabs.TabPane>
              </Tabs>
            </div>
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