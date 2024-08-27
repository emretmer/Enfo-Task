// Butonu eklemek için gerekli kod
import React from 'react';
import './App.css'; // Buton stilini eklemek için

const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      +
    </button>
  );
};

export default AddButton;
