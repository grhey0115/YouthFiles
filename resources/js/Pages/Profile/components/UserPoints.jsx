import React from 'react';
import { Card, List, Spin, Empty, Progress, Tooltip } from 'antd';
import { 
  LoadingOutlined, 
  TrophyOutlined, 
  GiftOutlined,
  InfoCircleOutlined 
} from '@ant-design/icons';

export default function UserPoints({ 
  userPoints, 
  redemptionOptions, 
  isLoadingOptions, 
  handleOpenGCashModal 
}) {
  // Find the next achievable reward
  const nextReward = redemptionOptions
    ?.filter(option => option.points > userPoints)
    .sort((a, b) => a.points - b.points)[0];

  const calculateProgress = () => {
    if (!nextReward) return 100;
    const previousRewardPoints = redemptionOptions
      .filter(option => option.points <= userPoints)
      .reduce((max, option) => Math.max(max, option.points), 0);
    
    const progress = ((userPoints - previousRewardPoints) / (nextReward.points - previousRewardPoints)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <Card
        bordered={false}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Your Youth Points</h2>
            <div className="flex items-center gap-3">
              <TrophyOutlined className="text-4xl text-yellow-400" />
              <span className="text-4xl font-extrabold">
                {userPoints || 0}
                <span className="text-2xl ml-2 font-normal">Points</span>
              </span>
            </div>
          </div>
          
          {nextReward && (
            <div className="w-full md:w-1/2">
              <div className="flex justify-between mb-2">
                <span>Progress to Next Reward</span>
                <span>₱{nextReward.amount}</span>
              </div>
              <Progress 
                percent={calculateProgress()} 
                showInfo={false}
                strokeColor="#ffffff"
                trailColor="rgba(255,255,255,0.3)"
                className="custom-progress"
              />
              <div className="text-sm mt-1">
                {nextReward.points - userPoints} points needed
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Redemption Options */}
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GiftOutlined className="text-green-500" />
              <span>Available Rewards</span>
            </div>
            <Tooltip title="Points can be redeemed for GCash credits">
              <InfoCircleOutlined className="text-gray-400 cursor-help" />
            </Tooltip>
          </div>
        }
        bordered={false}
        className="shadow-md rounded-lg"
      >
        {isLoadingOptions ? (
          <div className="flex justify-center items-center h-32">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          </div>
        ) : redemptionOptions?.length ? (
          <List
            grid={{ 
              gutter: 24,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4
            }}
            dataSource={redemptionOptions}
            renderItem={(option) => {
              const isEnabled = userPoints >= option.points;
              return (
                <List.Item>
                  <Card
                    hoverable={isEnabled}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      isEnabled 
                        ? "shadow-md hover:shadow-xl hover:-translate-y-1" 
                        : "opacity-75 cursor-not-allowed"
                    }`}
                    onClick={() => isEnabled && handleOpenGCashModal(option)}
                    bordered={false}
                    style={{ borderRadius: '12px' }}
                  >
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="mb-4 relative">
                        <img
                          src="/gcash-logo.svg"
                          alt="GCash Logo"
                          className="w-16 h-16"
                          style={{ objectFit: "contain" }}
                        />
                        {isEnabled && (
                          <div className="absolute -top-2 -right-2">
                            <TrophyOutlined className="text-yellow-400 text-xl" />
                          </div>
                        )}
                      </div>

                      <p className="text-green-500 font-semibold text-lg mb-1">
                        {option.points} Points
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        ₱{option.amount}
                      </p>
                      
                      {!isEnabled && (
                        <div className="mt-3">
                          <Progress
                            percent={Math.round((userPoints / option.points) * 100)}
                            size="small"
                            status="active"
                            className="w-32"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            {option.points - userPoints} points needed
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </List.Item>
              );
            }}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No redemption options available at the moment."
          />
        )}
      </Card>
    </div>
  );
}