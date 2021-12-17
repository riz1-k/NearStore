import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

function Verify() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/verify?token=${token}`)
      .then(e => {
        setLoading(false);
      })
      .catch(e => {
        alert('Error');
      });
  });

  return (
    <>
      <Navbar />
      {!loading ? (
        <div>
          <h1 className='font-sans font-bold text-2xl flex justify-center mt-28'>
            Your email has been verified!
          </h1>
          <h2 className=' flex justify-center mt-5'>
            <button className='  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 px-5'>
              <a href='/'>Home</a>
            </button>{' '}
          </h2>
        </div>
      ) : (
        <h1 className='font-sans font-bold text-2xl flex justify-center mt-28'>
          Verifying...
        </h1>
      )}
    </>
  );
}

export default Verify;
