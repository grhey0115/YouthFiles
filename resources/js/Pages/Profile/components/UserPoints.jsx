import React from 'react';
import { Card, List, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function UserPoints({ 
  userPoints, 
  redemptionOptions, 
  isLoadingOptions, 
  handleOpenGCashModal 
}) {
  return (
    <div className="p-6 bg-white space-y-6">
      {/* Points Overview */}
      <Card
        bordered={false}
        bodyStyle={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <div>
          <h2 className="text-2xl font-bold">Your Youth Points</h2>
          <p className="text-4xl font-extrabold text-green-400">
            {userPoints || 0}
            <span className="text-2xl ml-3">Points</span>
          </p>
        </div>
      </Card>

      {/* Redemption Options */}
      <Card
        title="Redeem Your Points"
        bordered={false}
        className="shadow-md rounded-lg"
      >
        {isLoadingOptions ? (
          <div className="flex justify-center items-center h-32">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          </div>
        ) : (
          <List
            grid={{ gutter: 24, column: 4 }}
            dataSource={redemptionOptions}
            locale={{ emptyText: "No redemption options available." }}
            renderItem={(option) => {
              const isEnabled = userPoints >= option.points;
              return (
                <List.Item>
                  <Card
                    hoverable={isEnabled}
                    className={`relative cursor-pointer transition-transform transform ${
                      isEnabled ? "shadow-md hover:shadow-xl hover:scale-105" : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => isEnabled && handleOpenGCashModal(option)}
                    bordered={false}
                    style={{ borderRadius: '12px' }}
                  >
                    <div className="flex flex-col items-center justify-center py-6">
                      <img
                        src="/gcash-logo.svg"
                        alt="GCash Logo"
                        className="w-12 h-12 mb-4"
                        style={{ objectFit: "contain" }}
                      />

                      <p className="text-green-500 font-semibold text-xl">{option.points} Points</p>
                      <p className="text-2xl font-bold text-gray-800">₱{option.amount}</p>
                    </div>
                    {!isEnabled && (
                      <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center rounded-lg">
                        <span className="text-white font-semibold text-sm">
                          Insufficient Points ({userPoints} / {option.points})
                        </span>
                      </div>
                    )}
                  </Card>
                </List.Item>
              );
            }}
          />
        )}
      </Card>
    </div>
  );
}