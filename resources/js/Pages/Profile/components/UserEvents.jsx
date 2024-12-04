import React from 'react';
import { List, Card, Spin, Button, Empty, Tag } from 'antd';
import { LoadingOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/react';

export default function UserEvents({ userEvents, isLoadingEvents }) {
  const events = Array.isArray(userEvents) ? userEvents : [];

  if (isLoadingEvents) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} 
          tip="Loading your events..." 
        />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div className="space-y-4">
            <p className="text-gray-500">You haven't joined any events yet.</p>
            <Link href={route('events.index')}>
              <Button type="primary">Browse Events</Button>
            </Link>
          </div>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <List
        grid={{ 
          gutter: 24,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={events}
        renderItem={(event) => (
          <List.Item>
            <Card
              cover={
                <div className="relative h-48">
                  <img
                    alt={event.name}
                    src={event.header_image || '/default-event-image.jpg'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Tag color={event.status === 'upcoming' ? 'blue' : 'green'}>
                      {event.status}
                    </Tag>
                  </div>
                </div>
              }
              className="h-full shadow-md hover:shadow-xl transition-shadow"
            >
              <Card.Meta
                title={event.name}
                description={
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-gray-500">
                      <CalendarOutlined />
                      {new Date(event.start_time).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2 text-gray-500">
                      <EnvironmentOutlined />
                      {event.location}
                    </p>
                    <Link 
                      href={route("events.show", event.id)}
                      className="block mt-4"
                    >
                      <Button type="primary" block>
                        View Details
                      </Button>
                    </Link>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}