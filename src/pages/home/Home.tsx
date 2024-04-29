import React from 'react';
import About from "~/components/about/About";

const Home = () => {
  return (
    <>
      <h1 className={'w-[80%] self-center text-[50px] font-[600] text-center'}>
        Výpočty požární bezpečnosti
      </h1>
      <About/>
    </>
  );
};

export default Home;
