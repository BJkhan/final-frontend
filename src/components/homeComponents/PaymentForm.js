import React, { useState } from 'react';
import axios from 'axios';
import { payOrder } from "../../Redux/Actions/OrderActions";
import { useDispatch } from "react-redux";

const PaymentForm = ({ total, orderId, email}) => {
  const [Msisdn, setMsisdn] = useState('0913632323');
  const [BirthYear, setBirthYear] = useState('1992');
  const [otp, setOtp] = useState('111111');
  const [showForm, setShowForm] = useState(401);
  const [processId, setProcessId] = useState("");
  const dispatch = useDispatch();

  const successPaymentHandler = (orderId, paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const initiatePayment = async () => {
    try {
      const response = await axios.post(
        'api/api/orders/initiate-payment',
        {
          Msisdn,
          BirthYear,
          InvoiceNo: 1,
          Amount : total,
          Category: orderId,
        });
      const { status, result } =
        response.data;
        if(status === 200){
          setProcessId(result.process_id);
          setShowForm(200);
        }
    } catch (error) {
      console.error('Error validating identity:', error);
    }
  };

  const completePayment = async () => {
    try {
      const response = await axios.post(
        'api/api/orders/pay-invoice',
        {
          otp: '111111', 
          Amount: total,
          InvoiceNo: '1',
          process_id: processId,
        },
      );

      const {status, result } = response.data;
      if(status === 200){
        const paymentResult = {
          id: result.transaction_id,
          status: 'COMPLETED',
          update_time: Date.now(),
          email_address: email,
        }
        successPaymentHandler(orderId, paymentResult)
      }

    } catch (error) {
      console.error('Error paying invoice:', error);
    }
  };

  return (
    <div>
    {showForm !== 200 ? (
      <div className="container mt-1">
        <h4 className="mb-1 text-center">Sadad Payment</h4>
        <div className="mb-3">
          <label className="form-label">Mobile:*</label>
          <input
            type="text"
            className="form-control"
            value={Msisdn}
            onChange={(e) => setMsisdn(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Birth Year:*</label>
          <input
            type="text"
            className="form-control"
            value={BirthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>
        
        <button
          className="btn btn-primary mb-3 fs-5"
          onClick={initiatePayment}
        >
          PAY {total}
        </button>
        <p class="text-muted mb-2">Upon click you will recieve an OTP on Mobile Number: {Msisdn}</p>
      </div>
    ) : (
      <div>
        <p class="text-muted mb-2">Enter the OTP code you recieved on Mobile Number: {Msisdn}</p>
        <input
          type="text"
          className="form-control mb-2"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="btn btn-success" onClick={completePayment}>
          Complete Payment
        </button>
      </div>
    )}
  </div>
  );
};

export default PaymentForm;