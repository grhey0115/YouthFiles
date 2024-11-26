import { useState, useEffect } from 'react';
import { useForm,usePage } from '@inertiajs/react';
import { 
  Upload, Button, message, Layout, Card, Row, Col, Select, Typography, Image, Divider, Space, Tag, Alert, InputNumber, Modal, Input 
} from 'antd';
import { 
  UploadOutlined, FileDoneOutlined, CheckCircleOutlined, PlusOutlined, ExclamationCircleOutlined, InfoCircleOutlined, DollarCircleOutlined, HeartOutlined 
} from '@ant-design/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const { Title, Text } = Typography;

const AyudaShow = ({ ayuda, ayudaApplicant, assistanceReceived, needsDonations, needsVolunteer, volunteerOpportunities, userVolunteerApplications  }) => {
  // Initialize form data using useForm
  const { data, setData, post, errors, processing } = useForm({
    files: {},
    donation_id: '',
    donation_type: 'money',
    amount: '',
    reference_number: '',
    receipt: null,
  });
  const { auth} = usePage().props;
  const [filePreviews, setFilePreviews] = useState({});
  const [applicationStatus, setApplicationStatus] = useState(ayudaApplicant?.status || 'not_applied');
  const [assistanceReceivedState, setAssistanceReceivedState] = useState(ayudaApplicant?.assistance_received || false);
  const [isDonationModalVisible, setDonationModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isVolunteerModalVisible, setVolunteerModalVisible] = useState(false);
  const [volunteerNotes, setVolunteerNotes] = useState('');
  const [hasAppliedToVolunteer, setHasAppliedToVolunteer] = useState(false);

  useEffect(() => {
    if (ayudaApplicant?.status && ayudaApplicant?.status !== applicationStatus) {
      setApplicationStatus(ayudaApplicant.status);
    }
    if (ayudaApplicant?.assistance_received) {
      setAssistanceReceivedState(true);
    }
  }, [ayudaApplicant]);

  useEffect(() => {
    // Check if the user has applied to any volunteer opportunities
    if (userVolunteerApplications && userVolunteerApplications.length > 0) {
      setHasAppliedToVolunteer(true);
    } else {
      setHasAppliedToVolunteer(false);
    }
  }, [userVolunteerApplications]);

  const handleApply = () => {
    if (ayuda?.requirements && ayuda.requirements.length > 0) {
      const missingFiles = ayuda.requirements.some((req) => !data.files[req.id]);
      if (missingFiles) {
        message.error('Please upload all required documents before applying.');
        return;
      }
    }

    post(route('ayudas.apply', ayuda.id), {
      data: { files: data.files },
      onSuccess: () => {
        setApplicationStatus('pending');
        message.success('Applied successfully. You will be notified if approved.');
      },
      onError: () => {
        message.error('Failed to apply for the ayuda.');
      },
    });
  };

  const handleFileChange = (requirementId, file) => {
    setData('files', { ...data.files, [requirementId]: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreviews((prev) => ({ ...prev, [requirementId]: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleDonate = () => {
    if (!data.amount) {
      message.error('Please enter donation amount');
      return;
    }
  
    if (!data.reference_number) {
      message.error('Please enter reference number');
      return;
    }
  
    if (!ayuda?.donations?.[0]?.id) {
      message.error('Invalid donation configuration');
      return;
    }
  
    // Set 'donation_id' and 'donation_type' in 'data'
    setData({
      ...data,
      donation_id: ayuda.donations[0].id,
      donation_type: 'money',
    });
  
    // Log data to verify
    console.log('Form data before submission:', data);
  
    post(route('ayudas.donate', ayuda.id), {
      forceFormData: true,
      onSuccess: () => {
        setDonationModalVisible(false);
        message.success('Donation submitted successfully! Waiting for approval.');
        resetForm();
      },
      onError: (errors) => {
        console.error('Donation submission error:', errors);
        if (errors.donation_id) {
          message.error(errors.donation_id[0]);
        } else {
          message.error('Failed to submit donation');
        }
      },
      onFinish: () => {
        setIsSubmitting(false);
      },
    });
  };

  const resetForm = () => {
    setData({
      ...data,
      amount: '',
      reference_number: '',
      receipt: null,
    });
    setFileList([]);
  };

  const handleReceiptChange = ({ fileList }) => {
    setFileList(fileList);
    const file = fileList[0];
    if (file) {
      setData('receipt', file.originFileObj);
    } else {
      setData('receipt', null);
    }
  };



  const handleVolunteer = () => {
    if (!selectedOpportunity) {
      message.error('Please select a volunteer position');
      return;
    }
  
    post(route('ayudas.volunteer', ayuda.id), {
      data: {
        volunteer_opportunity_id: selectedOpportunity,
        notes: volunteerNotes,
      },
      onSuccess: () => {
        message.success('Volunteer application submitted successfully!');
        setVolunteerModalVisible(false);
        // Reset form fields if necessary
        setSelectedOpportunity(null);
        setVolunteerNotes('');
      },
      onError: (errors) => {
        console.error('Volunteer submission error:', errors);
        message.error('Failed to submit volunteer application.');
      },
    });
  };
useEffect(() => {
  console.log('Volunteer Opportunities:', volunteerOpportunities);
}, [volunteerOpportunities]);

  const renderActionButton = () => {
    if (assistanceReceivedState) {
      return <Button type="primary" disabled icon={<FileDoneOutlined />} style={{ width: '100%' }}>Assistance Received</Button>;
    }
    if (applicationStatus === 'pending') {
      return <Button type="primary" danger icon={<ExclamationCircleOutlined />} style={{ width: '100%' }}>Pending Approval</Button>;
    }
    if (applicationStatus === 'approved') {
      return <Button type="primary" disabled icon={<CheckCircleOutlined />} style={{ width: '100%' }}>Application Approved</Button>;
    }
    return <Button type="primary" onClick={handleApply} icon={<UploadOutlined />} style={{ width: '100%' }}>Apply for Ayuda</Button>;
  };

  return (
    <AuthenticatedLayout user={usePage().props.auth}>
      <Head title={ayuda?.title || 'Ayuda Details'} />

      <Layout.Content className="container mx-auto p-4">
        <Card bordered={false} style={{ marginBottom: '24px', backgroundColor: '#f0f2f5' }}>
          <Image src={`/storage/${ayuda?.header || 'default-banner.jpg'}`} alt="Ayuda Banner" width="100%" height={300} style={{ objectFit: 'cover', borderRadius: '8px' }} />
        </Card>

        <Card bordered={false} style={{ padding: '24px', borderRadius: '8px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={16}>
              <Title level={3}>{ayuda?.title || 'No Title'}</Title>
              <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Text><strong>Start Date:</strong> {new Date(ayuda.date_start).toLocaleDateString()}</Text>
                <Text><strong>End Date:</strong> {new Date(ayuda.date_end).toLocaleDateString()}</Text>
                <Text><strong>Sector:</strong> {ayuda?.sector || 'N/A'}</Text>
                <Text><strong>Filter:</strong> {ayuda?.filter || 'N/A'}</Text>
                <Text><strong>Requirements Needed:</strong> {ayuda?.requirements && ayuda.requirements.length > 0 ? 'Yes' : 'No'}</Text>
              </Space>
              <Divider />

              <Title level={4}>Upload Requirements</Title>
              <Alert
                message="Upload Guidelines"
                description="Please upload all required documents to apply for this Ayuda. Accepted formats are: .jpg, .png, .pdf."
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
                style={{ marginBottom: '16px' }}
              />

              {ayuda?.requirements && ayuda.requirements.length > 0 && (
                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                  {ayuda.requirements.map((requirement) => (
                    <div key={requirement.id} className="mb-4">
                      <Text>{requirement.requirement_name}</Text>
                      <Upload
                        beforeUpload={(file) => {
                          handleFileChange(requirement.id, file);
                          return false;
                        }}
                        maxCount={1}
                        fileList={data.files[requirement.id] ? [data.files[requirement.id]] : []}
                        onRemove={() => handleFileChange(requirement.id, null)}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                      {errors && errors[`files.${requirement.id}`] && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors[`files.${requirement.id}`]}
                        </div>
                      )}
                      {filePreviews[requirement.id] && (
                        <div className="mt-2">
                          <Image
                            src={filePreviews[requirement.id]}
                            alt="Preview"
                            width={200}
                            height={100}
                            style={{ borderRadius: '8px' }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </Space>
              )}
            </Col>

            {/* Application Status and Action Button */}
            <Col xs={24} md={8}>
              <Card style={{ textAlign: 'center', borderRadius: '8px', backgroundColor: '#fafafa' }}>
                <Title level={4}>Application Status</Title>
                <div style={{ marginTop: '24px' }}>
                  {applicationStatus === 'approved' ? (
                    <Tag color="green" icon={<CheckCircleOutlined />}>Approved</Tag>
                  ) : applicationStatus === 'pending' ? (
                    <Tag color="orange" icon={<ExclamationCircleOutlined />}>Pending Approval</Tag>
                  ) : (
                    <Tag color="red" icon={<ExclamationCircleOutlined />}>Not Applied</Tag>
                  )}
                </div>
                <Divider />
                <div style={{ marginTop: '24px' }}>
                  {renderActionButton()}
                </div>

                {/* Donation Section */}
                <Divider />
                <Title level={4}>Donate to this Program</Title>
                <Text>Goal: {ayuda?.donation_goal} | Raised: {ayuda?.donation_raised}</Text>
                <Button 
                  type="primary" 
                  icon={<DollarCircleOutlined />} 
                  onClick={() => setDonationModalVisible(true)} 
                  disabled={!needsDonations}
                >
                  Donate Now
                </Button>
                <Modal
                  title="Make a Donation"
                  open={isDonationModalVisible}
                  onCancel={() => setDonationModalVisible(false)}
                  footer={[
                    <Button key="cancel" onClick={() => setDonationModalVisible(false)}>
                      Cancel
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      onClick={handleDonate}
                      loading={isSubmitting}
                      disabled={!data.amount || !data.reference_number || isSubmitting}
                    >
                      Confirm Donation
                    </Button>,
                  ]}
                >
                  {/* ... */}
                  <InputNumber
                    placeholder="Enter Donation Amount"
                    value={data.amount}
                    onChange={(value) => setData('amount', value)}
                    min={1}
                    className="mb-4 w-full"
                    formatter={(value) => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/₱\s?|(,*)/g, '')}
                  />

                  <Input
                    placeholder="Enter GCash Reference Number"
                    value={data.reference_number}
                    onChange={(e) => setData('reference_number', e.target.value)}
                    className="mb-4"
                  />

                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleReceiptChange}
                    beforeUpload={() => false}
                  >
                    {fileList.length >= 1 ? null : (
                      <div>
                        <PlusOutlined />
                        <div className="mt-2">Upload Receipt</div>
                      </div>
                    )}
                  </Upload>
                </Modal>

               {/* Volunteer Section */}
                <Divider />
                <Title level={4}>Volunteer for this Program</Title>
                <Text>{ayuda?.volunteer_slots} slots available</Text>

                {hasAppliedToVolunteer ? (
                  <Button 
                    type="primary" 
                    disabled 
                    icon={<ExclamationCircleOutlined />} 
                  >
                    Application Pending
                  </Button>
                ) : (
                  <Button 
                    type="primary" 
                    icon={<HeartOutlined />} 
                    onClick={() => setVolunteerModalVisible(true)} 
                    disabled={!needsVolunteer}
                  >
                    Apply to Volunteer
                  </Button>
                )}
                <Modal
                  title="Volunteer Application"
                  open={isVolunteerModalVisible}
                  onCancel={() => setVolunteerModalVisible(false)}
                  onOk={handleVolunteer}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Select a volunteer position"
                    value={selectedOpportunity}
                    onChange={(value) => setSelectedOpportunity(value)}
                  >
                    {volunteerOpportunities?.map(opportunity => (
                      <Select.Option key={opportunity.id} value={opportunity.id}>
                        {opportunity.role_title} ({opportunity.slots} slots)
                      </Select.Option>
                    ))}
                  </Select>
                  <Input.TextArea
                    placeholder="Why would you like to volunteer? (Optional)"
                    value={volunteerNotes}
                    onChange={(e) => setVolunteerNotes(e.target.value)}
                    rows={4}
                  />
                  </Space>
                </Modal>
              </Card>
            </Col>
          </Row>
        </Card>
      </Layout.Content>
    </AuthenticatedLayout>
  );
};

export default AyudaShow;
