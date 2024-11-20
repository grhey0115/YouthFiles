import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import styled from 'styled-components';
import { Tabs, Pagination, Badge } from 'antd';  // Import Badge Component
import { useState } from 'react';

// Reusable styled card component (same as Dashboard)
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
    text-align: center;
    justify-content: center;
  }

  .action:hover {
    background-color: #1d4ed8;
  }
`;

const StyledTabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;  /* Align pagination to the right */
  margin-top: 20px;
  padding-right: 20px;  /* Add padding for responsiveness */
  
  @media (max-width: 768px) {
    justify-content: center;  /* Center pagination on smaller screens */
    padding-right: 0;
  }
`;

const Ayuda = () => {
  const { openAyudas, closedAyudas } = usePage().props;  // Get filtered open and closed ayudas
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);  // Adjust items per page

  // Handle pagination for the rendered assistance data
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  // Function to get paginated data
  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const renderAssistance = (data) => {
    // Sort by created_at in descending order (newest first)
    const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
    // Then apply pagination on the sorted data
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
                <StyledCard>
                  <img
                    className="image"
                    src={`/storage/${ayuda.header}`}
                    alt={ayuda.title}
                  />
                  <div className="content">
                    <h3 className="title">{ayuda.title}</h3>
                    <p className="desc">{ayuda.description}</p>
                    <Link
                      href={route('ayuda.show', ayuda.id)}
                      className="action"
                    >
                      View Assistance
                    </Link>
                  </div>
                </StyledCard>
              </Badge.Ribbon>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-600">No assistance found.</p>
          )}
        </div>
        <StyledPaginationContainer>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={data.length}
            onChange={handlePaginationChange}
            showSizeChanger={false}
          />
        </StyledPaginationContainer>
      </>
    );
  };
  
  return (
    <AuthenticatedLayout user={usePage().props.auth}>
      <Head title="Ayuda" />

      <div className="container mx-auto m">
        {/* Centered Ant Design Pill Tabs */}
        <StyledTabsContainer>
          <Tabs defaultActiveKey="1" type="card" centered>
            <Tabs.TabPane tab="Upcoming Assistance" key="1">
              {renderAssistance(openAyudas)}  {/* Render open assistance */}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Past Assistance" key="2">
              {renderAssistance(closedAyudas)}  {/* Render closed assistance */}
            </Tabs.TabPane>
          </Tabs>
        </StyledTabsContainer>
      </div>
    </AuthenticatedLayout>
  );
};

export default Ayuda;
