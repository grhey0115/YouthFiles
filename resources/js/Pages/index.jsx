// resources/js/Pages/Events/Index.jsx

import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';

const Index = () => {
    const { events } = usePage().props;

    return (
        <div className="container">
            <div className="row">
                {events.map(event => (
                    <div className="col-md-4" key={event.id}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{event.name}</h5>
                                <p className="card-text">{event.description}</p>
                                <Link href={route('events.show', event.id)} className="btn btn-primary">
                                    View Event
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
