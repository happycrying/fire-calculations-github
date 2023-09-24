import React from 'react';
import cvut_logo from '~/assets/800px-CVUT_logo.webp';
import Button from '~/components/ui/Button/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className='flex justify-center items-center'>
        <img src={cvut_logo} alt='cvut' width='600' height='400' />
      </div>
      <h1 className='text-center text-xl pt-8 pl-8 pb-6 uppercase self-center'>
        Very very very cool description about website for fireforces.
      </h1>
      <div className='w-[30%] flex flex-row justify-between self-center'>
        <Link to={'category/'}>
          <Button>Category</Button>
        </Link>
        <Link to={'pnp/'}>
          <Button>PNP</Button>
        </Link>
      </div>
    </>
  );
};

export default Home;
