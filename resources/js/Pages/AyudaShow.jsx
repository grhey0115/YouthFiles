import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Upload, Button, message, Layout, Card, Row, Col, Typography, Image, Divider, Space, Tag, Alert } from 'antd';
import { UploadOutlined, FileDoneOutlined, CheckCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const { Title, Text, Paragraph } = Typography;

const AyudaShow = ({ ayuda, auth, ayudaApplicant, assistanceReceived }) => {
  const { post, data, setData, errors } = useForm({
    files: {},
  });

  const [filePreviews, setFilePreviews] = useState({});
  const [applicationStatus, setApplicationStatus] = useState(ayudaApplicant?.status || 'not_applied');
  const [assistanceReceivedState, setAssistanceReceivedState] = useState(ayudaApplicant?.assistance_received || false);

  useEffect(() => {
    if (ayudaApplicant?.status && ayudaApplicant?.status !== applicationStatus) {
      setApplicationStatus(ayudaApplicant.status);
    }
    if (ayudaApplicant?.assistance_received) {
      setAssistanceReceivedState(true);
    }
  }, [ayudaApplicant]);

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

  const handleCancel = () => {
    post(route('ayudas.cancel', ayuda.id), {
      onSuccess: () => {
        setApplicationStatus(null);
        message.info('Application canceled.');
      },
      onError: () => {
        message.error('Failed to cancel application.');
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

  const renderActionButton = () => {
    if (assistanceReceived === 'received') {
      return (
        <Button type="primary" disabled icon={<FileDoneOutlined />} style={{ width: '100%' }}>
          Assistance Received
        </Button>
      );
    } else if (applicationStatus === 'pending') {
      return (
        <Button type="primary" danger onClick={handleCancel} icon={<ExclamationCircleOutlined />} style={{ width: '100%' }}>
          Pending Approval (Cancel Application)
        </Button>
      );
    } else if (applicationStatus === 'approved') {
      return (
        <Button type="primary" disabled icon={<CheckCircleOutlined />} style={{ width: '100%' }}>
          Application Approved (Wait for Announcement)
        </Button>
      );
    } else {
      return (
        <Button type="primary" onClick={handleApply} icon={<UploadOutlined />} style={{ width: '100%' }}>
          Apply for Ayuda
        </Button>
      );
    }
  };

  const handleMarkAssistanceReceived = () => {
    if (applicationStatus !== 'approved') {
      message.error('You can only mark assistance as received once your application is approved.');
      return;
    }

    post(route('ayudas.markAssistanceReceived', ayuda.id), {
      onSuccess: () => {
        setApplicationStatus('assistance_received');
        setAssistanceReceivedState(true);
        message.success('Assistance received successfully.');
      },
      onError: () => {
        message.error('Failed to mark assistance as received.');
      },
    });
  };

  if (!ayuda) {
    return <div>Loading Ayuda details...</div>;
  }

  return (
    <AuthenticatedLayout user={auth} header={<Title level={2}>Ayuda Details</Title>}>
      <Head title={ayuda?.title || 'Ayuda Details'} />

      <Layout.Content className="container mx-auto p-4">
        {/* Ayuda Banner */}
        <Card bordered={false} style={{ marginBottom: '24px', backgroundColor: '#f0f2f5' }}>
          <Image
            src={`/storage/${ayuda?.header || 'default-banner.jpg'}`}
            alt="Ayuda Banner"
            width="100%"
            height={300}
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        </Card>

        {/* Ayuda Details and Application */}
        <Card bordered={false} style={{ padding: '24px', borderRadius: '8px' }}>
          <Row gutter={[24, 24]}>
            {/* Ayuda Information */}
            <Col xs={24} md={16}>
              <Title level={3} style={{ marginBottom: '16px' }}>{ayuda?.title || 'No Title'}</Title>

              <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Text><strong>Start Date:</strong> {ayuda?.date_start ? new Date(ayuda.date_start).toLocaleDateString() : 'N/A'}</Text>
                <Text><strong>End Date:</strong> {ayuda?.date_end ? new Date(ayuda.date_end).toLocaleDateString() : 'N/A'}</Text>
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

            {/* Application Action Button */}
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
              </Card>
            </Col>
          </Row>
        </Card>
      </Layout.Content>
    </AuthenticatedLayout>
  );
};

export default AyudaShow;
