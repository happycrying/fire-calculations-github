import React, { useEffect, useState } from 'react';

interface IParameters {
  width: number;
  height: number;
  openness: number;
  critValue: 10 | 15 | 18.5;
  pv: number;
  system: 'Nehořlavý' | 'Smíšený' | 'Hořlavý DP2' | 'Hořlavý DP3';
}

interface IResults {
  d_prima: number;
  d_bocni: number;
}

function getBaseLog(x: number, y: number) {
  return Math.log(y) / Math.log(x);
}

const PNP = () => {
  const [parameters, setParameters] = useState<IParameters>({
    width: 0,
    height: 0,
    openness: 100,
    critValue: 15,
    pv: 0,
    system: 'Nehořlavý',
  });

  const [FCrit, setFcrit] = useState<number>(0);
  const [results, setResults] = useState<IResults>({
    d_prima: 0,
    d_bocni: 0,
  });

  useEffect(() => {
    let pv_edit = 0;
    switch (parameters.system) {
      case 'Nehořlavý':
        pv_edit = parameters.pv;
        break;
      case 'Smíšený':
        pv_edit = parameters.pv + 5;
        break;
      case 'Hořlavý DP2':
        pv_edit = parameters.pv + 10;
        break;
      case 'Hořlavý DP3':
        pv_edit = parameters.pv + 15;
        break;
    }

    let TNorm = 20 + 345 * getBaseLog(10, 8 * pv_edit + 1);
    let IMax =
      Math.pow(TNorm + 273.15, 4) * 5.67 * Math.pow(10, -11) * (parameters.openness * 0.01);
    let _FCrit = parameters.critValue / IMax;
    setFcrit(_FCrit);
  }, [parameters.pv,parameters.system,parameters.openness, parameters.critValue]);

  const calcDPrima = () => {
    for (let i = 0.01; i < 15; i += 0.001) {
      let A = parameters.height / 2 / i;
      let B = parameters.width / 2 / i;
      let Fd =
        4 *
        (1 / (2 * Math.PI)) *
        ((A / Math.sqrt(1 + A * A)) * Math.atan(B / Math.sqrt(1 + A * A)) +
          (B / Math.sqrt(1 + B * B)) * Math.atan(A / Math.sqrt(1 + B * B)));
      if (Fd - FCrit <= 0) {
        return i;
      }
    }
    return 0
  }

  const calcDBocni = () => {
    for (let i = 0.01; i < 15; i += 0.001) {
      let A = parameters.height / 2 / i;
      let B = parameters.width / i;
      let Fd =
        2 *
        (1 / (2 * Math.PI)) *
        ((A / Math.sqrt(1 + A * A)) * Math.atan(B / Math.sqrt(1 + A * A)) +
          (B / Math.sqrt(1 + B * B)) * Math.atan(A / Math.sqrt(1 + B * B)));
      if (Fd - FCrit <= 0) {
        return i
      }
    }
    return 0
  }


  useEffect(() => {
    let d_prim = calcDPrima()
    let d_bocni = calcDBocni()
    setResults({d_prima: d_prim, d_bocni:d_bocni / 2})
  }, [FCrit,parameters.height,parameters.width]);

  return (
    <div className='flex flex-col w-[80%] self-center mb-7'>
      <div className='z-1 fixed right-0 top-[30vh] w-[20vw] h-[20vh] bg-white border-black border-2'>
        <p className='3xl:text-5xl text-2xl p-2'>D prima = {Math.floor(results.d_prima * 100) / 100}</p>
        <p className='3xl:text-5xl text-2xl p-2'>D bocni / 2 = {Math.floor(results.d_bocni * 100) / 100}</p>
      </div>

      <h2 className='text-3xl font-extrabold border-b-2 pb-2 mb-2 pt-4'>Parametry otvoru</h2>
      <div className='flex items-center gap-3 border-b-[1px] pb-2 mb-4'>
        <input
          type='number'
          id='pv'
          onChange={(e) =>
            setParameters({
              ...parameters,
              pv: +e.target.value,
            })
          }
        />
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>Pv</label>
      </div>
      <div className='flex items-center gap-3 border-b-[1px] pb-2 mb-4'>
        <input
          type='number'
          id='width'
          onChange={(e) =>
            setParameters({
              ...parameters,
              width: +e.target.value,
            })
          }
        />
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>Width</label>
      </div>
      <div className='flex items-center gap-3 border-b-[1px] pb-2 mb-4'>
        <input
          type='number'
          id='height'
          onChange={(e) =>
            setParameters({
              ...parameters,
              height: +e.target.value,
            })
          }
        />
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>Height</label>
      </div>
      <div className='flex items-center gap-3 border-b-[1px] pb-2 mb-4'>
        <input
          type='number'
          id='openness'
          onChange={(e) =>
            setParameters({
              ...parameters,
              openness: +e.target.value,
            })
          }
        />
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>Openness</label>
      </div>
      <div className='flex items-center gap-3 border-b-[1px] pb-2 mb-4'>
        <select
          id='system'
          onChange={(e) =>
            setParameters({
              ...parameters,
              system: e.target.value as 'Nehořlavý' | 'Smíšený' | 'Hořlavý DP2' | 'Hořlavý DP3',
            })
          }
        >
          <option value='Nehořlavý'>Nehořlavý</option>
          <option value='Smíšený'>Smíšený</option>
          <option value='Hořlavý DP2'>Hořlavý DP2</option>
          <option value='Hořlavý DP3'>Hořlavý DP3</option>
        </select>
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>System</label>
      </div>
      <div className='flex items-center gap-3 border-b-[1px] pb-2 mb-4'>
        <select
          id='critValue'
          onChange={(e) =>
            setParameters({
              ...parameters,
              critValue: +e.target.value as 10 | 15 | 18.5,
            })
          }
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={18.5}>18.5</option>
        </select>
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>Crit value</label>
      </div>

    </div>
  );
};

export default PNP;
