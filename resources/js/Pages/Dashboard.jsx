import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
  EnvironmentOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';
import { Tabs, Pagination, Badge, Card, Typography } from 'antd';
import styled from 'styled-components';
import ErrorBoundary from '@/Components/ErrorBoundary';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  max-width: 300px;
  height: 360px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  text-align: center;

  .ant-card-body {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .content {
    padding: 0.8rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    color: #111827;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
    margin: 0.5rem 0;
  }

  .desc {
    margin-top: 0.5rem;
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .action {
    display: inline-flex;
    margin-top: 1rem;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    background-color: #17B169;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .action:hover {
    background-color: #03C03C;
  }
`;

const StyledPaginationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    right: 10px;
    bottom: 10px;
  }
`;

const Dashboard = () => {
  const { auth, events } = usePage().props;
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filterEvents = (status) => {
    const today = new Date();

    if (status === "upcoming") {
      return events.filter((event) => {
        const eventDate = new Date(event.event_date);
        return event.status === "published" && eventDate >= today;
      });
    }

    if (status === "past") {
      return events.filter((event) => {
        const eventDate = new Date(event.event_date);
        return event.status === "ended" || eventDate < today;
      });
    }

    return [];
  };

  const renderEventCard = (event) => (
    <Badge.Ribbon
      key={event.id}
      text={event.available_slots > 0 ? `${event.available_slots} Slots Left` : "Full"}
      color={event.available_slots > 0 ? "green" : "red"}
      placement="start"
    >
      <StyledCard
        cover={
          <img 
            className="image" 
            src={event.header_image ? `/storage/${event.header_image}` : '/default-event-image.jpg'} 
            alt={event.name} 
            onError={(e) => {
              e.target.src = '/default-event-image.jpg';
            }}
          />
        }
      >
        <div className="content">
          <Title  
            level={4}  
            className="title truncate text-ellipsis overflow-hidden"  
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}  
          > 
            {event.name}
          </Title>
         
          <Text className="desc title truncate text-ellipsis overflow-hidden">
            <CalendarOutlined /> {new Date(event.event_date).toLocaleDateString()} at {new Date(event.event_date).toLocaleTimeString()}
            <br />
            <EnvironmentOutlined /> {event.location || "Online"}
            <br />
            {event.description}
          </Text>
          <Link href={route("events.show", event.id)} className="action">
            Check Details
          </Link>
        </div>
      </StyledCard>
    </Badge.Ribbon>
  );

  const upcomingEvents = filterEvents("upcoming");
  const pastEvents = filterEvents("past");

  return (
    <ErrorBoundary>
      <AuthenticatedLayout user={auth}>
        <Head title="Dashboard" />

        <div className="container mx-auto py-6">
          <Card className="mb-6">
            <Tabs
              defaultActiveKey="upcoming"
              activeKey={activeTab}
              onChange={handleTabChange}
              centered
              items={[
                {
                  key: "upcoming",
                  label: `Upcoming Events (${upcomingEvents.length})`,
                  children: (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {getPaginatedData(upcomingEvents).map(renderEventCard)}
                      </div>
                      <div className="flex justify-center mt-6">
                        <Pagination
                          current={currentPage}
                          pageSize={itemsPerPage}
                          total={upcomingEvents.length}
                          onChange={handlePaginationChange}
                          showSizeChanger={false}
                        />
                      </div>
                    </>
                  ),
                },
                {
                  key: "past",
                  label: `Past Events (${pastEvents.length})`,
                  children: (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {getPaginatedData(pastEvents).map(renderEventCard)}
                      </div>
                      <div className="flex justify-center mt-6">
                        <Pagination
                          current={currentPage}
                          pageSize={itemsPerPage}
                          total={pastEvents.length}
                          onChange={handlePaginationChange}
                          showSizeChanger={false}
                        />
                      </div>
                    </>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </AuthenticatedLayout>
    </ErrorBoundary>
  );
};

export default Dashboard;