import { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { 
  Upload, Button, message, Layout, Card, Row, Col, Select, 
  Typography, Image, Divider,Statistic, Space, Tag, Alert, InputNumber, 
  Modal, Input,Empty,Badge, Progress,Form, Steps, Tooltip, Timeline 
} from 'antd';
import { 
  UploadOutlined, FileDoneOutlined, CheckCircleOutlined, 
  PlusOutlined, ExclamationCircleOutlined, InfoCircleOutlined, 
  DollarCircleOutlined, HeartOutlined, ClockCircleOutlined,
  FileTextOutlined, TeamOutlined, CalendarOutlined,EnvironmentOutlined,
  FacebookFilled,
    TwitterOutlined,
    LinkedinFilled,
    WhatsAppOutlined 
} from '@ant-design/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const { Title, Text, Paragraph } = Typography;

export default function AyudaShow({ 
  ayuda, 
  donation,
  ayudaApplicant, 
  assistanceReceived, 
  needsDonations, 
  needsVolunteer, 
  volunteerOpportunities, 
  userVolunteerApplications 
}) {
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

  

  const getUploadButtonState = (requirementId) => {  
    if (data.files[requirementId]) {  
     return (  
      <Button icon={<CheckCircleOutlined />} type="primary">  
        Uploaded  
      </Button>  
     );  
    }  
    return (  
     <Button icon={<UploadOutlined />}>  
      Upload  
     </Button>  
    );  
  };  

  // Add Share Buttons Component
const ShareButtons = ({ event }) => {
  const shareUrl = window.location.href;
  const title = event.name;

  const shareLinks = [
      {
          name: 'Facebook',
          icon: <FacebookFilled className="text-xl" />,
          url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
          color: 'bg-[#1877f2] hover:bg-[#166fe5]'
      },
      {
          name: 'Twitter',
          icon: <TwitterOutlined className="text-xl" />,
          url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`,
          color: 'bg-[#1da1f2] hover:bg-[#1a94da]'
      },
      {
          name: 'LinkedIn',
          icon: <LinkedinFilled className="text-xl" />,
          url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}`,
          color: 'bg-[#0a66c2] hover:bg-[#095fb8]'
      },
      {
          name: 'WhatsApp',
          icon: <WhatsAppOutlined className="text-xl" />,
          url: `https://wa.me/?text=${title}%20${shareUrl}`,
          color: 'bg-[#25d366] hover:bg-[#22c35e]'
      }
  ];

  return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Share This Event</h3>
          <div className="flex gap-3">
              {shareLinks.map((platform) => (
                  <button
                      key={platform.name}
                      onClick={() => window.open(platform.url, '_blank')}
                      className={`${platform.color} text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110`}
                      aria-label={`Share on ${platform.name}`}
                  >
                      {platform.icon}
                  </button>
              ))}
          </div>
      </div>
  );
};

  const handleFileChange = (requirementId, file) => {
    setData('files', { ...data.files, [requirementId]: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreviews((prev) => ({ ...prev, [requirementId]: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleDonate = async () => {
    if (!data.amount || !data.reference_number) {
      message.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('amount', data.amount);
    formData.append('reference_number', data.reference_number);
    if (data.receipt) {
      formData.append('receipt', data.receipt);
    }

    post(route('ayudas.donate', ayuda.id), {
      onSuccess: () => {
        setIsSubmitting(false);
        setDonationModalVisible(false);
        reset();
        setFileList([]);
        message.success('Donation submitted successfully!');
      },
      onError: (errors) => {
        setIsSubmitting(false);
        Object.keys(errors).forEach(key => {
          message.error(errors[key]);
        });
      }
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

  const handleReceiptChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      setData('receipt', newFileList[0].originFileObj);
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

  const getApplicationStatus = () => {
    if (assistanceReceivedState) return 'completed';
    if (applicationStatus === 'approved') return 'approved';
    if (applicationStatus === 'pending') return 'pending';
    return 'not_applied';
  };

  const statusSteps = [
    { title: 'Not Applied', status: 'not_applied' },
    { title: 'Pending', status: 'pending' },
    { title: 'Approved', status: 'approved' },
    { title: 'Completed', status: 'completed' }
  ];

  const currentStep = statusSteps.findIndex(step => step.status === getApplicationStatus());

  return (
    <AuthenticatedLayout user={usePage().props.auth.user}>
      <Head title={ayuda?.title || 'Ayuda Details'} />

      <Layout.Content className="container mx-auto p-4">
        {/* Hero Section */}
        <Card 
          bordered={false} 
          className="mb-6 overflow-hidden"
          cover={
            <div className="relative h-[400px] w-full">
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    <img
                        src={`/storage/${ayuda.header}`}
                        alt="Event Banner"
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Event Title Overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">{ayuda.title}</h1>
                        <div className="flex flex-wrap justify-center gap-6 text-lg">
                            <span className="flex items-center gap-2">
                                <CalendarOutlined />
                                {new Date(ayuda.assistance_date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-2">
                                <EnvironmentOutlined />
                                {ayuda.location}
                            </span>
                            <span className="flex items-center gap-2">
                                <TeamOutlined />
                                <Badge 
                                    count={`${ayuda.max_beneficiaries - ayuda.current_beneficiaries} Slots Left`}
                                    style={{ 
                                        backgroundColor: ayuda.max_beneficiaries - ayuda.current_beneficiaries > 0 ? '#52c41a' : '#ff4d4f',
                                        fontSize: '14px',
                                        padding: '0 8px'
                                    }}
                                />
                            </span>
                        </div>
                    </div>
                </div>
          }
        >
          <Card className="mb-6" bordered={false}>  
            <Title level={4}>About this Ayuda Program</Title>  
            <Paragraph>{ayuda?.description}</Paragraph>  
            <Row gutter={[16, 16]} className="mt-4">  
            <Col span={8}>  
              <Statistic  
                title="Accepted Beneficiaries"  
                value={ayuda.current_beneficiaries || 0}  
                prefix={<TeamOutlined />}  
              />  
            </Col>  
            <Col span={8}>  
              <Statistic  
                title="Duration"  
                value={`${ayuda?.duration || 1} days`}  
                prefix={<ClockCircleOutlined />}  
              />  
            </Col>  
            <Col span={8}>  
              <Statistic  
                title="Status"  
                value={ayuda?.status}  
                valueStyle={{ color: ayuda?.status === 'Active' || 'open' ? '#52c41a' : '#cf1322' }}  
              />  
            </Col>  
            </Row>  
          </Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              {/* Application Progress */}
              <Card className="mb-6" bordered={false}>
                <Steps
                  current={currentStep}
                  items={statusSteps.map(step => ({
                    title: step.title,
                    status: getApplicationStatus() === step.status ? 'process' : 
                           statusSteps.findIndex(s => s.status === step.status) < currentStep ? 'finish' : 'wait'
                  }))}
                />
              </Card>

              {/* Requirements Section */}
              <Card 
                title={
                  <Space>
                    <FileTextOutlined />
                    <span>Requirements</span>
                  </Space>
                }
                className="mb-6"
                bordered={false}
              >
                <Alert
                  message="Upload Guidelines"
                  description="Please upload all required documents to apply for this Ayuda. Accepted formats are: .jpg, .png, .pdf."
                  type="info"
                  showIcon
                  icon={<InfoCircleOutlined />}
                  className="mb-6"
                />

                {ayuda?.requirements?.length > 0 ? (
                  <Timeline className="mt-4">
                    {ayuda.requirements.map((requirement) => (
                      <Timeline.Item 
                        key={requirement.id}
                        dot={<FileTextOutlined className="text-blue-500" />}
                      >
                        <Card className="mb-4" size="small">
                          <div className="flex justify-between items-start">
                            <div>
                              <Text strong>{requirement.requirement_name}</Text>
                              <Text type="secondary" className="block mt-1">
                                Required document
                              </Text>
                            </div>
                            <Upload  
                                beforeUpload={(file) => {  
                                handleFileChange(requirement.id, file);  
                                return false;  
                                }}  
                                maxCount={1}  
                                fileList={data.files[requirement.id] ? [data.files[requirement.id]] : []}  
                                onRemove={() => handleFileChange(requirement.id, null)}  
                                showUploadList={false}  
                              >  
                                {getUploadButtonState(requirement.id)}  
                              </Upload>
                          </div>
                          {filePreviews[requirement.id] && (
                            <Image
                              src={filePreviews[requirement.id]}
                              alt="Preview"
                              className="mt-4"
                              width={200}
                            />
                          )}
                          {errors && errors[`files.${requirement.id}`] && (
                            <Text type="danger" className="mt-2">
                              {errors[`files.${requirement.id}`]}
                            </Text>
                          )}
                        </Card>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                ) : (
                  <Empty description="No requirements needed" />
                )}
                {/* Share Buttons */}
               
              </Card>
              <ShareButtons event={ayuda} />
            </Col>
                 

            <Col xs={24} lg={8}>
              {/* Action Card */}
              <Card bordered={false} className="sticky top-24">
                {/* Application Status */}
                <div className="text-center mb-6">
                  <Title level={4}>Application Status</Title>
                  {renderActionButton()}
                </div>

                <Divider />

                {/* Donation Section */}
                <div className="mb-6">
                  <Title level={4}>Support this Program</Title>
                  {needsDonations && (
                    <>
                      <Progress  
                        percent={Math.round((ayuda?.donation_raised / ayuda?.donation?.goal) * 100)}  
                        status="active"  
                        className="mb-4"  
                      /> 
                     <Paragraph className="text-center">  
                      <Text strong>₱{ayuda?.donation_raised}</Text> raised of{' '}  
                      <Text strong>₱{ayuda?.donation?.goal}</Text> goal  
                    </Paragraph>
                      <Button 
                        type="primary" 
                        icon={<DollarCircleOutlined />} 
                        onClick={() => setDonationModalVisible(true)}
                        block
                      >
                        Donate Now
                      </Button>
                    </>
                  )}
                </div>

                <Divider />

                {/* Volunteer Section */}
                <div>
                  <Title level={4}>Volunteer Opportunities</Title>
                  {needsVolunteer ? (
                    <>
                      <Paragraph>
                        <Text strong>{ayuda?.volunteer_slots}</Text> slots available
                      </Paragraph>
                      {hasAppliedToVolunteer ? (
                        <Button 
                          block
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
                          block
                        >
                          Apply to Volunteer
                        </Button>
                      )}
                    </>
                  ) : (
                    <Empty description="No volunteer opportunities available" />
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </Card>

       <Divider />
              
              <Modal
                title="Make a Donation"
                open={isDonationModalVisible}
                onCancel={() => {
                  setDonationModalVisible(false);
                  reset();
                  setFileList([]);
                }}
                footer={[
                  <Button 
                    key="cancel" 
                    onClick={() => {
                      setDonationModalVisible(false);
                      reset();
                      setFileList([]);
                    }}
                  >
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
                <Form layout="vertical">
                  <Form.Item 
                    label="Donation Amount" 
                    required
                    validateStatus={!data.amount && 'error'}
                    help={!data.amount && 'Please enter donation amount'}
                  >
                    <InputNumber
                      placeholder="Enter Donation Amount"
                      value={data.amount}
                      onChange={(value) => setData('amount', value)}
                      min={1}
                      className="w-full"
                      formatter={(value) => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/₱\s?|(,*)/g, '')}
                    />
                  </Form.Item>

                  <Form.Item 
                    label="GCash Reference Number" 
                    required
                    validateStatus={!data.reference_number && 'error'}
                    help={!data.reference_number && 'Please enter reference number'}
                  >
                    <Input
                      placeholder="Enter GCash Reference Number"
                      value={data.reference_number}
                      onChange={(e) => setData('reference_number', e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item 
                    label="Upload Receipt" 
                    validateStatus={fileList.length === 0 && 'warning'}
                    help="Optional: Upload receipt for verification"
                  >
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={handleReceiptChange}
                      beforeUpload={() => false}
                      maxCount={1}
                    >
                      {fileList.length >= 1 ? null : (
                        <div>
                          <PlusOutlined />
                          <div className="mt-2">Upload Receipt</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                </Form>
              </Modal>

              <Divider />
               <Modal
                  title="Volunteer Application"
                  open={isVolunteerModalVisible}
                  onCancel={() => setVolunteerModalVisible(false)}
                  onOk={handleVolunteer}
                  footer={[
                    <Button key="cancel" onClick={() => setVolunteerModalVisible(false)}>
                      Cancel
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      onClick={handleVolunteer}
                      disabled={!selectedOpportunity || isSubmitting}
                    >
                      Apply
                    </Button>,
                  ]}
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
            
          
       
      </Layout.Content>
    </AuthenticatedLayout>
  );
}
