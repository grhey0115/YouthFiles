import React from 'react';

const AnnouncementShow = ({ announcement }) => {
  return (
    <div className="container">
      <h1>{announcement.title}</h1>
      <p className="text-muted">
        Published on {new Date(announcement.published_at).toLocaleString()}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: announcement.message }}
      ></div>
    </div>
  );
};

export default AnnouncementShow;
