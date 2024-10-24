import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Form, Input, Button, Select, Steps, Checkbox, Row, Col } from 'antd';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';

const { Step } = Steps;
const { Option } = Select;

const steps = ['Request Details', 'Summary', 'Acknowledgement', 'Payment'];

const SKDocumentRequestForm = () => {
  const { auth, user } = usePage().props;
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    user_id: user.id,
    fullName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    contactNumber: '',
    email: '',
    documentType: '',
    numberOfCopies: 1,
    purpose: '',
    deliveryMethod: 'Pick-up',
    paymentMethod: 'Cash on Pick-up',
  });

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fullName: `${user.first_name || ''} ${user.middle_name || ''} ${user.last_name || ''}`.trim(),
        dateOfBirth: user.personal_information?.date_of_birth || '',
        gender: user.personal_information?.gender || '',
        address: user.personal_information?.sitio || '',
        contactNumber: user.contact_number || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault(); // Prevent default form submission
    }
  
    if (isSubmitting) return; // Prevent double submission
  
    if (activeStep === steps.length - 1) {
      setIsSubmitting(true);
      handleFormSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    const filteredFormData = {
      user_id: user.id,
      status: 'Pending',
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      contactNumber: formData.contactNumber,
      email: formData.email,
      documentType: formData.documentType,
      numberOfCopies: Number(formData.numberOfCopies),
      purpose: formData.purpose,
      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod,
      consentToTruth: formData.consentToTruth,
      consentToDataProcessing: formData.consentToDataProcessing,
    };
  
    Inertia.post(route('document.request.store'), filteredFormData, {
      onSuccess: () => {
        console.log('Form submitted successfully');
        setIsSubmitting(false);
      },
      onError: (errors) => {
        console.error(errors);
        alert('An error occurred:\n' + JSON.stringify(errors, null, 2));
        setIsSubmitting(false);
      },
    });
  };

  return (
    <AuthenticatedLayout user={auth}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
          <Steps current={activeStep} className="mb-8">
            {steps.map((label, index) => (
              <Step key={index} title={label} />
            ))}
          </Steps>

          <div>
            {activeStep === 0 && <StepOne formData={formData} setFormData={setFormData} />}
            {activeStep === 1 && <StepTwo formData={formData} />}
            {activeStep === 2 && <StepThree formData={formData} />}
            {activeStep === 3 && <StepFour formData={formData} setFormData={setFormData} />}
          </div>

          <div className="flex justify-between mt-5">
          {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
          <Button type="primary" onClick={handleNext} htmlType="button">
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
          {activeStep > 0 && (
            <Button onClick={handleBack} htmlType="button">
            
            </Button>
          )}
        </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

// Step 1: Request Details
const StepOne = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Type of Document Requested" required>
            <Select
              name="documentType"
              value={formData.documentType}
              onChange={(value) => setFormData((prevFormData) => ({
                ...prevFormData,
                documentType: value,
              }))}
              style={{ borderRadius: '8px' }}
            >
              <Option value="Barangay Clearance">Barangay Clearance</Option>
              <Option value="Certificate of Residency">Certificate of Residency</Option>
              <Option value="Certificate of Indigency">Certificate of Indigency</Option>
              <Option value="Certification of No Pending Case">Certification of No Pending Case</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Purpose of Document" required>
            <Input
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Full Name" required>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Date of Birth" required>
            <Input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Gender" required>
            <Select
              name="gender"
              value={formData.gender}
              onChange={(value) => setFormData((prevFormData) => ({
                ...prevFormData,
                gender: value,
              }))}
              style={{ borderRadius: '8px' }}
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Number of Copies" required>
            <Input
              name="numberOfCopies"
              type="number"
              value={formData.numberOfCopies}
              onChange={handleChange}
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="Address" required>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Contact Number" required>
            <Input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

// Step 2: Summary
const StepTwo = ({ formData }) => (
  <div>
    <h2 className="text-lg font-bold mb-4">Summary</h2>
    <p>Full Name: {formData.fullName}</p>
    <p>Date of Birth: {formData.dateOfBirth}</p>
    <p>Gender: {formData.gender}</p>
    <p>Address: {formData.address}</p>
    <p>Contact Number: {formData.contactNumber}</p>
    <p>Document Type: {formData.documentType}</p>
    <p>Number of Copies: {formData.numberOfCopies}</p>
    <p>Purpose: {formData.purpose}</p>
  </div>
);

// Step 3: Acknowledgement
const StepThree = ({ formData, setFormData }) => (
  <div>
    <h2 className="text-lg font-bold mb-4">Acknowledgement</h2>
    <Checkbox
      checked={formData.consentToTruth}
      onChange={(e) =>
        setFormData((prevFormData) => ({
          ...prevFormData,
          consentToTruth: e.target.checked,
        }))
      }
    >
      I hereby certify that the above information is true and correct.
    </Checkbox>
    <Checkbox
      checked={formData.consentToDataProcessing}
      onChange={(e) =>
        setFormData((prevFormData) => ({
          ...prevFormData,
          consentToDataProcessing: e.target.checked,
        }))
      }
    >
      I consent to the processing of my data.
    </Checkbox>
  </div>
);

// Step 4: Payment
const StepFour = ({ formData, setFormData }) => {
  const handleChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentMethod: value,
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Payment</h2>
      <Form.Item label="Payment Method" required>
        <Select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <Option value="Cash on Pick-up">Cash on Pick-up</Option>
          <Option value="GCash">GCash</Option>
        </Select>
      </Form.Item>

      {formData.paymentMethod === 'GCash' && (
        <div className="mt-3">
          <p>GCash Payment Number: 09XXXXXXXXX</p>
        </div>
      )}

      <div className="mt-3">
        <h3 className="text-lg font-bold">Receipt</h3>
        <p>Document Type: {formData.documentType}</p>
        <p>Number of Copies: {formData.numberOfCopies}</p>
        <p>Total Amount: ₱{formData.numberOfCopies * 50}</p>
      </div>
    </div>
  );
};

export default SKDocumentRequestForm;
