import { useState, useContext, useEffect } from 'react';
import SellerNavbar from '@/components/SellerNavbar';
import { SellerAuthContext } from '@/components/sellerGlobalState';
import CreateStoreInfoCard from '@/components/CreateStoreInfo';
import { useRouter } from 'next/dist/client/router';
import BackDrop from '@/components/BackDrop';

function Createstore() {
  const [CreateCard, setCreateCard] = useState(false);
  const { user } = useContext(SellerAuthContext);
  const router = useRouter();
  // useEffect(() => {
  //   if (!user) {
  //     router.push('/sellersignin');
  //   }
  // });
  return (
    <>
      {CreateCard && (
        <BackDrop loading={false}>
          <CreateStoreInfoCard setCreateCard={setCreateCard} />
        </BackDrop>
      )}
      <SellerNavbar />
      <header className='text-3xl font-sans font-bold flex justify-center mt-8'>
        Welcome!
      </header>
      <div className='flex justify-center mt-4'>
        <button
          onClick={() => setCreateCard(true)}
          className='focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 px-8 '
        >
          Create a Website for your Store
        </button>
      </div>
    </>
  );
}

export default Createstore;
