/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useContext, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/dist/client/link';
import { SellerAuthContext } from './sellerGlobalState.jsx';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Your Store', href: '/notes', current: false },
  //   { name: 'Home', href: '/', current: false },
  //   { name: 'Todo', href: '/todo', current: false },
  //   { name: ' Blogs', href: '/blogs', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SellerNavbar = () => {
  const { seller } = useContext(SellerAuthContext);
  const router = useRouter();
  return (
    <>
      <Disclosure as='nav' className='bg-gray-800'>
        {({ open }) => (
          <>
            <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative '>
              <div className='relative flex items-center justify-between h-16'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button*/}
                  <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex-shrink-0 flex items-center'>
                    <Link href='/'>
                      <div>
                        <h1 className='text-2xl font-sans text-white font-bold  '>
                          Logo
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className={`  sm:block sm:ml-6`}>
                  <div
                    className={`${seller ? 'block' : 'hidden'} flex space-x-4`}
                  >
                    {navigation.map(item => (
                      <Link
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        key={item.name}
                      >
                        <div
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-100 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                          )}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  {/* Profile dropdown */}
                  <Menu
                    as='div'
                    className={`${seller ? 'block' : 'hidden'} ml-3 relative`}
                  >
                    <div>
                      <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                        <span className='sr-only'>Open seller menu</span>

                        <div className='h-8 w-8 rounded-full '>
                          <img className='h-8 w-8 rounded-full' src='' alt='' />
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='  origin-top-right cursor-pointer absolute z-30 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={`${
                                seller ? 'block' : 'hidden'
                              } px-4 py-2 bg-white hover:bg-gray-100 text-sm text-gray-700`}
                            >
                              Your Account
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          <div
                            onClick={() => {
                              localStorage.removeItem('token');
                              router.reload();
                            }}
                            className={` ${
                              seller ? 'block' : 'hidden'
                            }  px-4 py-2 bg-white hover:bg-gray-100 text-sm text-gray-700`}
                          >
                            Sign out
                          </div>
                        </Menu.Item>
                        <Menu.Item>
                          <div
                            className={`${
                              seller ? 'hidden' : 'block'
                            } px-4 py-2 bg-white hover:bg-gray-200 text-sm text-gray-700`}
                          >
                            <Link href='/sellersignin'>Login</Link>
                          </div>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='px-2 pt-2 pb-3 space-y-1 '>
                {navigation.map(item => (
                  <Link
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    key={item.name}
                  >
                    <div
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                      )}
                    >
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default SellerNavbar;
