import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectShow = () => {
    const { project, auth } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Project Details</h2>}
        >
            <Head title={project.name} />

            <div className="container mx-auto p-4">
                {/* Project Banner */}
                <div className="relative mb-6">
                    <img
                        src={`/storage/${project.header_image}`}
                        alt="Project Banner"
                        className="w-full h-64 object-cover"
                    />
                </div>

                {/* Project Details */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Project Information */}
                        <div>
                            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <p className="mb-4"><strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
                            <p className="mb-4"><strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}</p>
                            <p><strong>Total Budget:</strong> ₱{project.total_budget}</p>
                        </div>

                        {/* Project Procurements and Disbursements */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Procurements</h3>
                            <ul className="mb-4">
                                {project.procurements.map((item, index) => (
                                    <li key={index} className="text-gray-600">
                                        {item.procurement_item}: ₱{item.procurement_cost}
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-lg font-semibold mb-2">Disbursements</h3>
                            <ul>
                                {project.disbursements.map((item, index) => (
                                    <li key={index} className="text-gray-600">
                                        {item.recipient_name}: ₱{item.disbursed_amount}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification Container */}
            <ToastContainer />
        </AuthenticatedLayout>
    );
};

export default ProjectShow;