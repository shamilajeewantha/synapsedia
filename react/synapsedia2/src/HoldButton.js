import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HoldButton = () => {
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    const sendToRabbitMQ = async (action) => {
      try {
        const response = await axios.post(`http://localhost:3001/publish`, {
          message: action
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error sending message to RabbitMQ:', error);
      }
    };

    if (isHolding) {
      console.log('Button pressed and held');
      sendToRabbitMQ('move');
    } else {
      console.log('Button released or pointer moved away');
      sendToRabbitMQ('stop');
    }
  }, [isHolding]);

  const handleMouseDown = () => {
    setIsHolding(true);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
  };

  const handleMouseLeave = () => {
    setIsHolding(false);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ padding: '10px 20px', fontSize: '16px' }}
    >
      Hold me
    </button>
  );
};

export default HoldButton;
