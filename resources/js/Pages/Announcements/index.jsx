import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const AnnouncementsIndex = ({ announcements }) => {
  return (
    <div className="container">
      <h1>Announcements</h1>
      {announcements.map((announcement) => (
        <div key={announcement.id} className="card mb-3">
          <div className="card-body">
            <h3>
              <InertiaLink href={`/announcements/${announcement.id}`}>
                {announcement.title}
              </InertiaLink>
            </h3>
            <p className="text-muted">
              Published on {new Date(announcement.published_at).toLocaleString()}
            </p>
            <p>
              {announcement.message.replace(/(<([^>]+)>)/gi, '').substring(0, 150)}...
            </p>
            <InertiaLink href={`/announcements/${announcement.id}`} className="btn btn-primary">
              Read More
            </InertiaLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementsIndex;
