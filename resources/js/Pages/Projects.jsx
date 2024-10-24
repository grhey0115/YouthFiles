import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import styled from 'styled-components';

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

const Projects = () => {
    const { projects } = usePage().props;

    return (
        <AuthenticatedLayout user={usePage().props.auth}>
            <Head title="Projects" />

            <div className="container mx-auto mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects && projects.length > 0 ? (
                        projects.map(project => (
                            <StyledCard key={project.id}>
                                {/* Project Header Image */}
                                <img
                                    className="image"
                                    src={`/storage/${project.header_image}`} 
                                    alt={project.name}
                                />
                                {/* Card Content */}
                                <div className="content">
                                    <h3 className="title">{project.name}</h3>
                                    <p className="desc">{project.description}</p>
                                    <Link
                                        href={route('projects.show', project.id)}
                                        className="action"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </StyledCard>
                        ))
                    ) : (
                        <p className="col-span-6 text-center text-gray-600">No projects found.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Projects;
