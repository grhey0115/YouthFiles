import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Tabs, Pagination, Badge } from 'antd';
import styled from 'styled-components';
import ErrorBoundary from '@/Components/ErrorBoundary';

const StyledCard = styled.div`
  max-width: 300px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

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

  .action:hover {
    background-color: #1d4ed8;
  }
`;

const StyledPaginationContainer = styled.div`
  position: fixed;
  bottom: 20px; /* Distance from the bottom of the viewport */
  right: 20px; /* Distance from the right of the viewport */
  z-index: 1000; /* Ensure it appears above other elements */

  /* Optional: Adjust for smaller screens */
  @media (max-width: 768px) {
    right: 10px;
    bottom: 10px;
  }
`;
const Dashboard = () => {
  const { events } = usePage().props;
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const itemsPerPage = 8;

  const handleTabChange = (key) => {
    setActiveTab(key);
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

  const paginateEvents = (filteredEvents, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEvents.slice(startIndex, endIndex);
  };

  const renderEvents = (filteredEvents) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEvents.map((event) => (
          <Badge.Ribbon
            key={event.id}
            text={event.available_slots > 0 ? `${event.available_slots} Slots Left` : "Full"}
            color={event.available_slots > 0 ? "green" : "red"}
            placement="start"
          >
            <StyledCard>
              <img className="image" src={`/storage/${event.header_image}`} alt={event.name} />
              <div className="content">
                <h3 className="title">{event.name}</h3>
                <p className="desc">
                  <strong>When:</strong> {new Date(event.event_date).toLocaleDateString()}
                  <br />
                  <strong>Where:</strong> {event.location || "Online"}
                </p>
                <Link href={route("events.show", event.id)} className="action">
                  View Event
                </Link>
              </div>
            </StyledCard>
          </Badge.Ribbon>
        ))}
      </div>
    );
  };

  const upcomingEvents = filterEvents("upcoming");
  const pastEvents = filterEvents("past");

  return (
    <ErrorBoundary>
      <AuthenticatedLayout user={usePage().props.auth}>
        <Head title="Dashboard" />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
          <Tabs
            defaultActiveKey="upcoming"
            activeKey={activeTab}
            onChange={handleTabChange}
            centered
            items={[
              {
                key: "upcoming",
                label: "Upcoming Events",
                children: renderEvents(paginateEvents(upcomingEvents, upcomingPage)),
              },
              {
                key: "past",
                label: "Past Events",
                children: renderEvents(paginateEvents(pastEvents, pastPage)),
              },
            ]}
          />
        </div>

        <StyledPaginationContainer>
          {activeTab === "upcoming" ? (
            <Pagination
              current={upcomingPage}
              pageSize={itemsPerPage}
              total={upcomingEvents.length}
              onChange={setUpcomingPage}
              showSizeChanger={false}
            />
          ) : (
            <Pagination
              current={pastPage}
              pageSize={itemsPerPage}
              total={pastEvents.length}
              onChange={setPastPage}
              showSizeChanger={false}
            />
          )}
        </StyledPaginationContainer>
      </AuthenticatedLayout>
    </ErrorBoundary>
  );
};

export default Dashboard;
