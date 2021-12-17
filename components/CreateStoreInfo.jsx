import { useState, useRef, useContext } from 'react';
import { IoClose, IoInformationCircle } from 'react-icons/io5';
import CreateStoreAddress from './CreateStoreAddress';
import BackDrop from './BackDrop';
import axios from 'axios';
import { SellerAuthContext } from '@/components/sellerGlobalState.jsx';

function CreateStoreInfoCard({ setCreateCard }) {
  const [storeInfo, setStoreInfo] = useState({
    storename: '',
    storetype: '',
    itemcategories: '',
  });
  const [address, setAddress] = useState(false);

  const { seller } = useContext(SellerAuthContext);

  const ref = useRef();

  const changeHandler = e => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
  };

  const body = {
    form: {
      StoreName: storeInfo.storename,
      StoreType: storeInfo.storetype,
      ItemCategories: storeInfo.itemcategories.split(','),
    },
    user: {
      _id: seller._id,
    },
  };

  const submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/seller/createStore', body).then(e => {
      alert('Your store has been create successfully!');
      setAddress(true);
    });
  };

  return (
    <>
      {address && (
        <BackDrop loading={false}>
          <CreateStoreAddress
            setAddress={setAddress}
            setCreateCard={setCreateCard}
          />
        </BackDrop>
      )}
      <div className='flex  animate__animated animate__zoomIn animate__faster '>
        <div className='m-auto '>
          <div>
            <div className='mt-5 bg-white rounded-lg shadow'>
              <div
                onClick={() => setCreateCard(false)}
                className='flex justify-end mr-2 h-12  items-center  '
              >
                <IoClose className='text-2xl text-gray-600  cursor-pointer' />
              </div>
              <div className='flex'>
                <div className='flex-1 py-5 pl-5 overflow-hidden'>
                  <h1 className='flex  text-2xl font-semibold font-sans leading-none'>
                    <IoInformationCircle className='text-2xl ' /> Store Info
                  </h1>
                </div>
              </div>
              <div className='px-5 pb-5'>
                <form ref={ref} onSubmit={submitHandler}>
                  <input
                    name='storename'
                    onChange={changeHandler}
                    required
                    placeholder='Store Name'
                    className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                  />
                  <input
                    name='storetype'
                    required
                    onChange={changeHandler}
                    placeholder='Store Type'
                    className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                  />
                  <input
                    name='itemcategories'
                    required
                    onChange={changeHandler}
                    placeholder='Item Categories (Seperate each with ",") '
                    className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                  />
                  <hr className='mt-4' />
                  <div className='flex flex-row-reverse p-3'>
                    <div className=''>
                      <button
                        type='submit'
                        className='focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 px-6'
                      >
                        <span className='pl-2 mx-1'>Create</span>
                      </button>
                      <button
                        onClick={() => setAddress(true)}
                        className='focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 px-6'
                      >
                        <span className='pl-2 mx-1'>Address</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateStoreInfoCard;
