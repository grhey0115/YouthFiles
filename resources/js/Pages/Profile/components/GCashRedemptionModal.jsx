import React from 'react';
import { Modal, Descriptions, Input } from 'antd';

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
      title="GCash Points Redemption"
      open={isVisible}
      onOk={onRedeem}
      onCancel={onClose}
      okText="Redeem Points"
      okButtonProps={{ 
        type: "primary", 
        style: { backgroundColor: "#52c41a", borderColor: "#52c41a" } 
      }}
      cancelButtonProps={{ type: "default" }}
    >
      {selectedOption && (
        <div className="space-y-4">
          <p className="text-lg">
            Redeem <strong>{selectedOption.points} points</strong> for <strong>₱{selectedOption.amount}</strong>.
          </p>
          <Descriptions bordered size="small">
            <Descriptions.Item label="GCash Registered Name">
              <Input
                value={gcashName}
                onChange={(e) => setGcashName(e.target.value)}
                placeholder="Enter Full Name on GCash"
                required
              />
            </Descriptions.Item>
            <Descriptions.Item label="GCash Registered Number">
              <Input
                type="tel"
                value={gcashNumber}
                onChange={(e) => setGcashNumber(e.target.value)}
                placeholder="09XXXXXXXXX"
                pattern="(09|\+639)\d{9}"
                required
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Modal>
  );
}