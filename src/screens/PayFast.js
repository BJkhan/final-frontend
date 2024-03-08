import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../apiConf';

const PayFast = ({amount, orderId, name, email}) => {
  const [payFastForm, setPayFastForm] = useState('');
  useEffect(()=>{
    const fetchPayFastForm = async () => {
      try {
        const response = await axios.post(`${apiUrl}/api/orders/payfast`,{
          amount,
          orderId,
          name,
          email,
        });
        setPayFastForm(response.data);
      } catch (error) {
        console.error('Error fetching PayFast form:', error.response?.data || error.message);
      }
    };
    fetchPayFastForm();
  }, [orderId,amount,name,email])
  
  return <div dangerouslySetInnerHTML={{ __html: payFastForm }} />;
};

export default PayFast;



