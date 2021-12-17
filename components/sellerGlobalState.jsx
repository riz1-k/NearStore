import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
const SellerAuthContext = createContext();

const SellerAuthProvider = props => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const getSellerData = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setSeller(null);
    } else {
      const options = {
        headers: {
          'x-auth-token': token,
        },
      };
      axios
        .get(`/api/seller/getSellerInfo`, options)
        .then(res => {
          setSeller(res.data.seller);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setSeller(null);
          localStorage.removeItem('token');
        });
    }
  };
  useEffect(() => {
    getSellerData();
  }, []);

  return (
    <SellerAuthContext.Provider value={{ seller, loading, getSellerData }}>
      {props.children}
    </SellerAuthContext.Provider>
  );
};

export { SellerAuthProvider, SellerAuthContext };
