import React from 'react';
import Modal from 'react-modal';


// Ensure this matches the ID of the element your React app is mounted on
Modal.setAppElement('#root');

const ProjectDetailsModal = ({ project, isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Project Details"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <h3>Procurements</h3>
            <ul>
                {project.procurements.map((item, index) => (
                    <li key={index}>
                        {item.procurement_item}: ₱{item.procurement_cost}
                    </li>
                ))}
            </ul>
            <h3>Disbursements</h3>
            <ul>
                {project.disbursements.map((item, index) => (
                    <li key={index}>
                        {item.recipient_name}: ₱{item.disbursed_amount}
                    </li>
                ))}
            </ul>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default ProjectDetailsModal;