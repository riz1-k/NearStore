import { useState, useRef, useContext } from 'react';
import { IoAlertCircleSharp, IoClose, IoLocation } from 'react-icons/io5';
import axios from 'axios';
import { SellerAuthContext } from '@/components/sellerGlobalState.jsx';

function CreateStoreAddress({ setAddress, setCreateCard }) {
  const [storeInfo, setStoreInfo] = useState({});
  const ref = useRef();
  const { seller } = useContext(SellerAuthContext);

  const changeHandler = e => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
  };

  const body = {
    address: {
      Street: storeInfo.street,
      Area: storeInfo.area,
      PostOffice: storeInfo.postoffice,
      City: storeInfo.city,
      District: storeInfo.district,
      PinCode: storeInfo.pincode,
      State: storeInfo.state,
      Country: storeInfo.country,
    },
    store: seller.sellerStore._id,
  };

  const submitHandler = e => {
    e.preventDefault();
    axios
      .post('/api/seller/storeAddress', body)
      .then(e => {
        alert('Address successfully uploaded');
        setAddress(false);
        setCreateCard(false);
      })
      .catch(e => {
        alert('Error while trying to store address');
      });
  };

  return (
    <>
      <div className='flex  animate__animated animate__zoomIn animate__faster '>
        <div className='m-auto '>
          <div>
            <div className='mt-5 bg-white rounded-lg shadow'>
              <div
                onClick={() => setAddress(false)}
                className='flex justify-end mr-2 h-12  items-center  '
              >
                <IoClose className='text-2xl text-gray-600  cursor-pointer' />
              </div>
              <div className='flex'>
                <div className='flex-1 py-5 pl-5 overflow-hidden'>
                  <h1 className='flex  text-2xl font-semibold font-sans leading-none'>
                    <IoLocation className='xl' /> Store Address
                  </h1>
                </div>
              </div>
              <form onSubmit={submitHandler} ref={ref}>
                <div className='px-5 pb-5'>
                  <div className='my-8'>
                    <input
                      onChange={changeHandler}
                      name='street'
                      placeholder='Street'
                      className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                    />
                    <input
                      onChange={changeHandler}
                      name='area'
                      placeholder='Area'
                      className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                    />
                    <div className='flex'>
                      <div className='flex-grow w-1/4 pr-2'>
                        <input
                          onChange={changeHandler}
                          name='postoffice'
                          placeholder='Post Office'
                          className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                        />
                      </div>
                      <div className='flex-grow'>
                        <input
                          name='city'
                          onChange={changeHandler}
                          placeholder='City'
                          className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                        />
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='flex-grow w-1/4 pr-2'>
                        <input
                          onChange={changeHandler}
                          placeholder='PinCode'
                          name='pincode'
                          type='number'
                          className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                        />
                      </div>
                      <div className='flex-grow'>
                        <input
                          onChange={changeHandler}
                          name='district'
                          placeholder='District'
                          className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                        />
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='flex-grow w-1/4 pr-2'>
                        <input
                          onChange={changeHandler}
                          name='state'
                          placeholder='State'
                          className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                        />
                      </div>
                      <div className='flex-grow'>
                        <input
                          onChange={changeHandler}
                          name='country'
                          placeholder='Country'
                          className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-300 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='mt-4' />
                <div className='flex flex-row-reverse p-3'>
                  <div className=''>
                    <button
                      type='submit'
                      className='focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 px-6'
                    >
                      <span className='pl-2 mx-1'>Create</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateStoreAddress;
