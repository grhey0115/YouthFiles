import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Avatar, Upload, Button, Tabs, message } from 'antd';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import { Link } from '@inertiajs/react';

const { TabPane } = Tabs;

export default function ViewProfile() {
    const { user, personalInformation = {}, educationalBackground = {}, additionalInformation = {}, emergencyContact = {} } = usePage().props;

    const { data, setData, patch } = useForm({
        first_name: user?.first_name || '',
        middle_name: user?.middle_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        avatar: null,

        // Personal Information
        barangay: personalInformation?.barangay || '',
        sitio: personalInformation?.sitio || '',
        religion: personalInformation?.religion || '',
        civil_status: personalInformation?.civil_status || '',
        is_solo_parent: personalInformation?.is_solo_parent || false,
        gender: personalInformation?.gender || '',
        family_members: personalInformation?.family_members || '',
        siblings: personalInformation?.siblings || '',
        valid_id_paths: personalInformation?.valid_id_paths || [],

        // Educational Background
        current_status: educationalBackground?.current_status || '',
        last_year_attended: educationalBackground?.last_year_attended || '',
        year_graduated: educationalBackground?.year_graduated || '',
        year_level: educationalBackground?.year_level || '',
        course: educationalBackground?.course || '',

        // Additional Information
        is_currently_working: additionalInformation?.is_currently_working || '0',
        hobbies: additionalInformation?.hobbies || [],
        is_pwd: additionalInformation?.is_pwd || '0',
        has_conflict_with_law: additionalInformation?.has_conflict_with_law || '0',
        is_indigenous: additionalInformation?.is_indigenous || '0',
        is_registered_voter: additionalInformation?.is_registered_voter || '0',
        attended_assembly: additionalInformation?.attended_assembly || '0',
        why_no_assembly: additionalInformation?.why_no_assembly || '',
        residency_status: additionalInformation?.residency_status || 'Permanent',

        // Emergency Contact
        name: emergencyContact?.name || '',
        relationship: emergencyContact?.relationship || '',
        contact_number: emergencyContact?.contact_number || '',
        address: emergencyContact?.address || '',
    });

    const handleAvatarChange = (info) => {
        if (info.file.status === 'uploading') {
            message.loading('Uploading avatar...');
            return;
        }

        if (info.file.status === 'done') {
            message.success('Avatar updated successfully!');
        } else if (info.file.status === 'error') {
            message.error('There was an error uploading the avatar.');
        }
    };

    const uploadAvatar = (file) => {
        const formData = new FormData();
        formData.append('avatar', file);

        return axios.patch(route('profile.updateAvatar'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            return {
                success: true,
                file: response.data.avatar_url, // The new avatar URL
            };
        })
        .catch(error => {
            console.error('Error uploading avatar:', error);
            return {
                success: false,
                error,
            };
        });
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        axios.patch(route('profile.update'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(() => {
            alert('Profile updated successfully!');
        })
        .catch((error) => {
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
            alert('There was an error updating the profile.');
        });
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Profile</h2>}
        >
            <Head title="View Profile" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm sm:rounded-lg">
                    {/* Profile Header */}
                    <div className="flex items-center bg-gradient-to-r from-red-500 to-gray-700 text-white p-6 rounded-t-lg relative">
                        <div className="relative">
                            <Avatar
                                src={user.avatar_url || '/default_avatar1.png'}
                                size={100}
                                alt="User Avatar"
                            />
                            <Upload
                                name="avatar"
                                accept="image/*"
                                showUploadList={false}
                                customRequest={({ file, onSuccess, onError }) => {
                                    uploadAvatar(file).then(({ success }) => {
                                        if (success) {
                                            onSuccess();
                                        } else {
                                            onError();
                                        }
                                    });
                                }}
                                onChange={handleAvatarChange}
                            >
                                <Button
                                    icon={<FaCamera />}
                                    className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full text-white"
                                />
                            </Upload>
                        </div>
                        <div className="ml-4">
                            <h1 className="text-xl font-semibold">{user?.first_name} {user?.last_name}</h1>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <Tabs defaultActiveKey="1" centered className="profile-tabs">
                <TabPane tab="Profile" key="1">
                    <div className="p-6 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div>
                                <h2 className="text-lg font-semibold text-purple-600">Personal Information</h2>
                                <div className="mt-2">
                                    <p><strong>Sitio:</strong> {personalInformation?.sitio || 'N/A'}</p>
                                    <p><strong>Birth Date:</strong> {personalInformation?.date_of_birth || 'N/A'}</p>
                                    <p><strong>Age:</strong> {personalInformation?.age || 'N/A'}</p>
                                    <p><strong>Civil Status:</strong> {personalInformation?.civil_status || 'N/A'}</p>
                                    <p><strong>Religion:</strong> {personalInformation?.religion || 'N/A'}</p>
                                    
                                   
                                    <p><strong>Civil Status:</strong> {personalInformation?.civil_status || 'N/A'}</p>
                                    <p><strong>Civil Status:</strong> {personalInformation?.civil_status || 'N/A'}</p>
                                    <p><strong>Civil Status:</strong> {personalInformation?.civil_status || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Educational Background */}
                            <div>
                                <h2 className="text-lg font-semibold text-purple-600">Educational Background</h2>
                                <div className="mt-2">
                                    <p><strong>Current Status:</strong> {educationalBackground?.current_status || 'N/A'}</p>
                                    <p><strong>Course:</strong> {educationalBackground?.course || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div>
                                <h2 className="text-lg font-semibold text-purple-600">Additional Information</h2>
                                <div className="mt-2">
                                    <p><strong>Working:</strong> {additionalInformation.is_currently_working === '1' ? 'Yes' : 'No'}</p>
                                    <p><strong>Hobbies:</strong> {additionalInformation?.hobbies.join(', ') || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div>
                                <h2 className="text-lg font-semibold text-purple-600">Emergency Contact</h2>
                                <div className="mt-2">
                                    <p><strong>Name:</strong> {emergencyContact?.name || 'N/A'}</p>
                                    <p><strong>Relationship:</strong> {emergencyContact?.relationship || 'N/A'}</p>
                                    <p><strong>Contact Number:</strong> {emergencyContact?.contact_number || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>

                <TabPane tab="Your Events" key="2">
                    <div className="p-6">
                        <h3> Events Section</h3>
                        {/* Your Events content goes here */}
                    </div>
                </TabPane>

                <TabPane tab="Your Points" key="3">
                    <div className="p-6">
                        {/* Your Points content goes here */}
                        <p><strong>Total Youth Points:</strong> {user?.youth_points || 0}</p>
                    </div>
                </TabPane>

                <TabPane tab="Account Settings" key="4">
                    <div className="p-6">
                        <h3>Account Settings Section</h3>
                        {/* Account Settings content goes here */}
                    </div>
                </TabPane>
            </Tabs>

            <style jsx>{`
                .profile-header {
                    background: linear-gradient(90deg, #ff7a59, #5a5d95);
                    padding: 20px 40px;
                    display: flex;
                    align-items: center;
                }

                .avatar-container {
                    position: relative;
                    display: inline-block;
                }

                .camera-icon {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    border-radius: 50%;
                }

                .profile-sections {
                    background-color: white;
                    margin-top: 20px;
                    border-radius: 8px;
                    padding: 20px;
                }

                .section-title {
                    font-size: 18px;
                    color: #5a5d95;
                    font-weight: bold;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
