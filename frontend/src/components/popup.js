// import React, { useState } from 'react';
import Modal from 'react-modal';

const popup = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Popup Message"
      ariaHideApp={false} // This is important to prevent screen readers from reading background content
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default popup