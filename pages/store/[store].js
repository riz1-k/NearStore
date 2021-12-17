import React from 'react';
import { useRouter } from 'next/router';

const store = () => {
  const router = useRouter();
  const query = router.query.store;
  console.log(query);
  return <div>store</div>;
};

export default store;
