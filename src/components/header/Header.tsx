import React from "react";
import logo from "~/assets/800px-CVUT_logo.webp"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='text-white z-[5000] h-fit w-full sm:w-[80%] self-center p-5 flex gap-10 items-center justify-between'>
      <div className={'flex gap-10 '}>
        <img
          src={logo}
          alt={'logo'}
          width={800}
          height={400}
          className={'w-[100px] h-[50px] sm:w-[180px] sm:h-[90px] cursor-pointer'}
          onClick={() => navigate('/')}
        />
        <h1
          className={
            'text-[#000000] text-[40px] hidden sm:block font-[600] pl-5 border-l-[2px] border-l-solid border-orange-500 py-3'
          }
        >
          Fire Safety Calculations
        </h1>
      </div>
      <div className={'flex gap-10 justify-self-end'}>
        <Link to={'/category'}
          className={
            'bg-[#fff] border-[1px] border-orange-500 border-solid flex items-center justify-center w-fit h-fit rounded-xl px-3 text-[#000] text-[20px] sm:text-[30px] font-[500]'
          }
        >
          Category
        </Link>
        <Link to={'/pnp'}
          className={
            'bg-[#fff] border-[1px] border-orange-500 border-solid flex items-center justify-center w-fit h-fit rounded-xl px-3 text-[#000]  text-[20px] sm:text-[30px] font-[500]'
          }
        >
          PNP
        </Link>
      </div>
    </header>
  );
};

export default Header;