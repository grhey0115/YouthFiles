import React from 'react';
import { Modal, Form, Input, Alert, Typography } from 'antd';
import { WalletOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function GCashRedemptionModal({
  isVisible,
  onClose,
  selectedOption,
  gcashName,
  setGcashName,
  gcashNumber,
  setGcashNumber,
  onRedeem
}) {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <WalletOutlined className="text-blue-500" />
          <span>GCash Points Redemption</span>
        </div>
      }
      open={isVisible}
      onOk={onRedeem}
      onCancel={onClose}
      okText="Confirm Redemption"
      okButtonProps={{ 
        type: "primary", 
        className: "bg-blue-500 hover:bg-blue-600",
        disabled: !gcashName || !gcashNumber
      }}
      cancelButtonProps={{ type: "default" }}
      width={500}
    >
      {selectedOption && (
        <div className="space-y-6">
          <Alert
            message={
              <div className="text-center">
                <Text strong>Redeeming {selectedOption.points} points</Text>
                <br />
                <Text className="text-lg">
                  You will receive <Text strong className="text-green-500">₱{selectedOption.amount}</Text>
                </Text>
              </div>
            }
            type="info"
            showIcon
            className="mb-6"
          />

          <Form layout="vertical">
            <Form.Item 
              label="GCash Registered Name"
              required
              tooltip="Enter the name registered with your GCash account"
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                value={gcashName}
                onChange={(e) => setGcashName(e.target.value)}
                placeholder="Enter Full Name on GCash"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item 
              label="GCash Number"
              required
              tooltip="Enter your GCash registered mobile number"
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400" />}
                type="tel"
                value={gcashNumber}
                onChange={(e) => setGcashNumber(e.target.value)}
                placeholder="09XXXXXXXXX"
                pattern="(09|\+639)\d{9}"
                className="rounded-md"
              />
            </Form.Item>
          </Form>

          <Text type="secondary" className="block text-sm">
            Note: Please ensure all details are correct. Points redemption cannot be reversed once processed.
          </Text>
        </div>
      )}
    </Modal>
  );
}