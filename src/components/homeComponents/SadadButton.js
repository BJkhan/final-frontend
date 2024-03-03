import React, { useState } from 'react';
import { connect } from 'react-redux';
import { payOrder } from '../../Redux/Actions/OrderActions'; 
import PaymentForm from './PaymentForm'; 

const SadadButton = ({ orderId, order, dispatch }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    setShowPaymentForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowPaymentForm(true)}>Sadad Payment</button>
      {showPaymentForm && (
        <PaymentForm
          total={order.totalPrice}
          orderId={orderId}
          onSuccess={successPaymentHandler}
        />
      )}
    </div>
  );
};

export default connect(null)(SadadButton);
