import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Row, Col, Pagination, Empty, Tabs, Badge } from 'antd'; // Import Badge component from Ant Design
import styled from 'styled-components';
import ErrorBoundary from '@/Components/ErrorBoundary';

// Styled component for event cards
const StyledCard = styled.div`
  max-width: 300px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;  // For badge positioning

  .image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .content {
    padding: 1.1rem;
  }

  .title {
    color: #111827;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
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
    gap: 0.25rem;
    background-color: #2563EB;
    padding: 4px 8px;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
  }

  .action span {
    transition: .3s ease;
  }

  .action:hover span {
    transform: translateX(4px);
  }
`;

const Dashboard = () => {
  const { events } = usePage().props;
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(6);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const updateEventsPerPage = () => {
      if (window.innerWidth >= 1200) {
        setEventsPerPage(12);
      } else if (window.innerWidth >= 768) {
        setEventsPerPage(8);
      } else {
        setEventsPerPage(4);
      }
    };

    window.addEventListener('resize', updateEventsPerPage);
    updateEventsPerPage(); // Call initially to set the correct value

    return () => window.removeEventListener('resize', updateEventsPerPage);
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

  // Filter events based on their status
  const filteredEvents = events.filter((event) => {
    if (activeTab === 'upcoming') return event.status === 'published';
    if (activeTab === 'past') return event.status === 'ended';
    return false;
  });

  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const tabItems = [
    { key: 'upcoming', label: 'Upcoming Events' },
    { key: 'past', label: 'Past Events' },
  ];

  return (
    <ErrorBoundary>
    <AuthenticatedLayout user={usePage().props.auth}>
 
      <Head title="Dashboard" />

      {/* Centered top navigation tabs with pill style */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          type="card"
          centered
        />
      </div>

      <Row gutter={[16, 16]}>
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <Col xs={24} sm={12} md={8} lg={6} key={event.id}>
             <Badge.Ribbon
                text={event.available_slots > 0 ? `${event.available_slots} Slots Left` : 'Full'}
                color={event.available_slots > 0 ? 'green' : 'red'}
                placement="start"  // This moves the ribbon to the left side
                >
                <StyledCard>
                    <img className="image" src={`/storage/${event.header_image}`} alt={event.name} />
                    <div className="content">
                    <Link href={route('events.show', event.id)}>
                        <span className="title">{event.name}</span>
                    </Link>
                    <p className="desc">{event.description}</p>
                    <Link className="action" href={route('events.show', event.id)}>
                        View Event <span aria-hidden="true">→</span>
                    </Link>
                    </div>
                </StyledCard>
                </Badge.Ribbon>

            </Col>
          ))
        ) : (
          <Col span={24}>
            <Empty description="No events found." />
          </Col>
        )}
      </Row>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Pagination
          current={currentPage}
          pageSize={eventsPerPage}
          total={filteredEvents.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </AuthenticatedLayout>
    </ErrorBoundary>
  );
};

export default Dashboard;
