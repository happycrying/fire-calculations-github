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
      <h1 className='text-center text-2xl w-[60%] pt-8 pl-8 pb-6 uppercase self-center'>
        Vítejte na našem webu věnovaném výpočtům požární bezpečnosti. Pomůžeme vám určit kategorii budovy z hlediska
        požární bezpečnosti a hodnoty PNP (Požárně nebezpečného prostoru) pro vaše projekty.
        {<><br /><br /></>}
        Náš jednoduchý a intuitivní nástroj vám umožní provádět tyto důležité výpočty rychle a efektivně, což vám ušetří
        čas a energii.
      </h1>
      <div className='w-[40%] flex flex-row justify-between self-center'>
        <Link to={'category/'}>
          <Button className="w-[300px] h-[80px] text-xl">Category</Button>
        </Link>
        <Link to={'pnp/'}>
          <Button className="w-[300px] h-[80px] text-xl">PNP</Button>
        </Link>
      </div>

      <div className="bg-blue-500 text-white font-bold px-4 py-2 w-[500px] h-[300px] ml-5 m-5">
        <button className="bg-red-500 h-fit w-fit p-5 rounded-xl">This is a Tailwind button</button>
        <input className="bg-white h-fit w-fit p-5 rounded-xl text-black" />
        <p className="bg-black text-white text-sm w-fit p-2 m-2">Small text</p>
        <p className="bg-black text-white text-m w-fit p-2 m-2">Medium text</p>
        <p className="bg-black text-white text-lg w-fit p-2 m-2">Large text</p>
      </div>

    </>
  );
};

export default Home;
