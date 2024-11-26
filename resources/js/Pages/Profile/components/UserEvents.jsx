import React from 'react';
import { List, Card, Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/react';

export default function UserEvents({ userEvents, isLoadingEvents }) {
  const events = Array.isArray(userEvents) ? userEvents : [];

  if (isLoadingEvents) {
    return (
      <div className="p-6 bg-white flex justify-center items-center h-64">
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} 
          tip="Loading events..." 
        />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="p-6 bg-white text-center">
        <p className="text-gray-500">No events joined yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Your Joined Events</h3>
      <List
        grid={{ gutter: 24, column: 3 }}
        dataSource={events}
        renderItem={(event) => (
          <List.Item key={event.id}>
            <Card
              cover={
                event.image_url && (
                  <img
                    alt={event.name}
                    src={event.image_url}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                )
              }
              bordered={false}
              hoverable
              className="shadow-lg transition-transform transform hover:scale-105"
              actions={[
                <Link 
                  key="view" 
                  href={route("events.show", event.id)}
                  className="flex justify-center items-center"
                >
                  <Button type="primary" ghost>
                    View Details
                  </Button>
                </Link>,
              ]}
            >
              <Card.Meta
                title={<span className="text-lg font-bold text-gray-900">{event.name}</span>}
                description={
                  <>
                    <p className="text-sm text-gray-700">{event.description}</p>
                    <p className="text-sm text-gray-600">
                      <strong>Date:</strong> {new Date(event.start_time).toLocaleDateString()}
                    </p>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}