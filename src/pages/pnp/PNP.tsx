import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PnpPDF from "~/components/documents/PnpPDF";
import { IBasicInfo } from "~/pages/category/Category";
import pnpDescriptions from '../pnp/pnpDescriptions.json';

export interface IParameters {
  width: number;
  height: number;
  openness: number;
  critValue: 10 | 15 | 18.5;
  pv: number;
  system: 'Nehořlavý' | 'Smíšený' | 'Hořlavý DP2' | 'Hořlavý DP3';
}

export interface IResults {
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
  const [basicInfo, setBasicInfo] = useState<IBasicInfo>({
    name: '',
    place: '',
    investor: '',
    windowName: '',
  });
  const [FCrit, setFcrit] = useState<number>(0);
  const [results, setResults] = useState<IResults>({
    d_prima: 0,
    d_bocni: 0,
  });
  const [pvEdit, setPvEdit] = useState(0);

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
    setPvEdit(pv_edit)
  }, [parameters.pv,parameters.system]);

  useEffect(() => {
    let TNorm = 20 + 345 * getBaseLog(10, 8 * pvEdit + 1);
    let IMax =
      Math.pow(TNorm + 273.15, 4) * 5.67 * Math.pow(10, -11) * (parameters.openness * 0.01);
    let _FCrit = parameters.critValue / IMax;
    setFcrit(_FCrit);
  }, [parameters.pv,parameters.system,parameters.openness, parameters.critValue, pvEdit]);

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
      <div className='z-1 fixed right-0 top-[30vh] '>
        <div
          className={
            'w-[350px] hidden sm:flex h-fit rounded-xl bg-[#fff] py-4 px-4 border-solid border-orange-500 border-[1px] flex-col gap-2'
          }
        >
          <div className={'flex flex-col gap-5 w-[95%]'}>
            <div className={'flex gap-3 justify-between items-center'}>
              <h2 className={'text-[#000000] font-[500] text-[24px]'}>d</h2>
              <div
                className={
                  'bg-[#fff] border-[1px] border-[#E7E7E7] border-solid flex items-center justify-center w-[80px] h-[33px] rounded-xl text-[#000] text-[24px] font-[500]'
                }
              >
                {Math.floor(results.d_prima * 100) / 100}
              </div>
            </div>
          </div>

          <div className={'flex flex-col gap-5 w-[95%]'}>
            <div className={'flex gap-3 justify-between items-center'}>
              <h2 className={'text-[#000000] font-[500] text-[24px]'}>d'</h2>
              <div
                className={
                  'bg-[#fff] border-[1px] border-[#E7E7E7] border-solid flex items-center justify-center w-[80px] h-[33px] rounded-xl text-[#000] text-[24px] font-[500]'
                }
              >
                {Math.floor(results.d_bocni * 100 * 2) / 100}
              </div>
            </div>
          </div>

          <div className={'flex flex-col gap-5 w-[95%]'}>
            <div className={'flex gap-3 justify-between items-center'}>
              <h2 className={'text-[#000000] font-[500] text-[24px]'}>
                d'<sub>s</sub>
              </h2>
              <div
                className={
                  'bg-[#fff] border-[1px] border-[#E7E7E7] border-solid flex items-center justify-center w-[80px] h-[33px] rounded-xl text-[#000] text-[24px] font-[500]'
                }
              >
                {Math.floor(results.d_bocni * 100) / 100}
              </div>
            </div>
          </div>
          <PDFDownloadLink
            document={<PnpPDF {...parameters} {...results} {...basicInfo} pvEdit={pvEdit} />}
            fileName='Pnp'
          >
            {({ loading }) =>
              loading ? (
                <button
                  className='w-full rounded-xl text-[24px] bg-orange-400 border-solid border-[1px] border-[#000] p-2 disabled:bg-gray-100'
                  disabled={true}
                >
                  Loading PDF...
                </button>
              ) : (
                <button className='w-full rounded-xl text-[24px] bg-orange-400 border-solid border-[1px] border-[#000] p-2'>
                  Stáhnout PDF protokol
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>

      {/*--Základní údaje o zakázce--*/}
      <h2 className='text-3xl font-extrabold border-b-2 pb-2 mb-2'>Základní údaje o zakázce</h2>
      <form>
        <div className='grid gap-6 mb-6 md:grid-cols-2'>
          <div>
            <label
              htmlFor='nazev_akce'
              className='block mb-2 text-[20px] font-semibold text-gray-900 dark:text-white'
            >
              Název akce
            </label>
            <input
              type='text'
              id='nazev_akce'
              onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
              className='bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            />
          </div>
          <div>
            <label
              htmlFor='place'
              className='block mb-2 text-[20px] font-semibold text-gray-900 dark:text-white'
            >
              Místo akce
            </label>
            <input
              type='text'
              id='place'
              onChange={(e) => setBasicInfo({ ...basicInfo, place: e.target.value })}
              className='bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            />
          </div>
          <div>
            <label
              htmlFor='investor'
              className='block mb-2 text-[20px] font-semibold text-gray-900 dark:text-white'
            >
              Investor
            </label>
            <input
              type='text'
              id='investor'
              onChange={(e) => setBasicInfo({ ...basicInfo, investor: e.target.value })}
              className='bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            />
          </div>
          <div>
            <label
              htmlFor='windowName'
              className='block mb-2 text-[20px] font-semibold text-gray-900 dark:text-white'
            >
              Název otvoru
            </label>
            <input
              type='text'
              id='windowName'
              onChange={(e) => setBasicInfo({ ...basicInfo, windowName: e.target.value })}
              className='bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
            />
          </div>
        </div>
      </form>
      {/*----------------------------*/}

      <h2 className='text-3xl font-extrabold pb-2 mb-2 pt-4'>Parametry otvoru</h2>
      <div className='flex flex-col gap-3 border-b-[1px] border-orange-500 pb-4 mb-4'>
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>
          {pnpDescriptions.short['pV']}
        </label>
        <div className={'flex items-center gap-2'}>
          <input
            className={
              'bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5'
            }
            type='number'
            id='pv'
            onChange={(e) =>
              setParameters({
                ...parameters,
                pv: +e.target.value,
              })
            }
          />
          <span className={'text-l font-normal mr-5'}>kg/m&sup2;</span>
        </div>
      </div>
      <div className='flex flex-col gap-3 border-b-[1px] border-orange-500 pb-4 mb-4'>
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>
          {pnpDescriptions.short['width']}
        </label>
        <div className={'flex items-center gap-2'}>
          <input
            className={
              'bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5'
            }
            type='number'
            id='width'
            onChange={(e) =>
              setParameters({
                ...parameters,
                width: +e.target.value,
              })
            }
          />
          <span className={'text-l font-normal mr-5'}>m</span>
        </div>
      </div>
      <div className='flex flex-col gap-3 border-b-[1px] border-orange-500 pb-4 mb-4'>
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>
          {pnpDescriptions.short['height']}
        </label>
        <div className={'flex items-center gap-2'}>
          <input
            className={
              'bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5'
            }
            type='number'
            id='height'
            onChange={(e) =>
              setParameters({
                ...parameters,
                height: +e.target.value,
              })
            }
          />
          <span className={'text-l font-normal mr-5'}>m</span>
        </div>
      </div>
      <div className='flex flex-col gap-3 border-b-[1px] border-orange-500 pb-4 mb-4'>
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>
          {pnpDescriptions.short['p0']}
        </label>
        <div className={'flex items-center gap-2'}>
          <input
            className={
              'bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5'
            }
            type='number'
            id='openness'
            onChange={(e) =>
              setParameters({
                ...parameters,
                openness: +e.target.value,
              })
            }
          />
          <span className={'text-l font-normal mr-5'}>% [40; 100]</span>
        </div>
      </div>
      <div className='flex flex-col gap-3 border-b-[1px] border-orange-500 pb-4 mb-4'>
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>
          {pnpDescriptions.short['system']}
        </label>
        <select
          className={
            'bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5'
          }
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
      </div>
      <div className='flex flex-col gap-3 border-b-[1px] border-orange-500 pb-4 mb-4'>
        <label className={`block mb-2 text-xl font-semibold text-gray-900`}>
          {pnpDescriptions.short['qCrit']}
        </label>
        <div className={'flex items-center gap-2'}>
          <select
            className={
              'bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5'
            }
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
          <span className={'text-l font-normal mr-5'}>kW/m&sup2;</span>
        </div>
      </div>

      <div
        className={
          'w-full flex sm:hidden h-fit rounded-xl bg-[#fff] py-4 px-4 border-solid border-orange-500 border-[1px] flex-col gap-2'
        }
      >
        <div className={'flex flex-col gap-5 w-[95%]'}>
          <div className={'flex gap-3 justify-between items-center'}>
            <h2 className={'text-[#000000] font-[500] text-[24px]'}>d</h2>
            <div
              className={
                'bg-[#fff] border-[1px] border-[#E7E7E7] border-solid flex items-center justify-center w-[80px] h-[33px] rounded-xl text-[#000] text-[24px] font-[500]'
              }
            >
              {Math.floor(results.d_prima * 100) / 100}
            </div>
          </div>
        </div>

        <div className={'flex flex-col gap-5 w-[95%]'}>
          <div className={'flex gap-3 justify-between items-center'}>
            <h2 className={'text-[#000000] font-[500] text-[24px]'}>d'</h2>
            <div
              className={
                'bg-[#fff] border-[1px] border-[#E7E7E7] border-solid flex items-center justify-center w-[80px] h-[33px] rounded-xl text-[#000] text-[24px] font-[500]'
              }
            >
              {Math.floor(results.d_bocni * 100 * 2) / 100}
            </div>
          </div>
        </div>

        <div className={'flex flex-col gap-5 w-[95%]'}>
          <div className={'flex gap-3 justify-between items-center'}>
            <h2 className={'text-[#000000] font-[500] text-[24px]'}>
              d'<sub>s</sub>
            </h2>
            <div
              className={
                'bg-[#fff] border-[1px] border-[#E7E7E7] border-solid flex items-center justify-center w-[80px] h-[33px] rounded-xl text-[#000] text-[24px] font-[500]'
              }
            >
              {Math.floor(results.d_bocni * 100) / 100}
            </div>
          </div>
        </div>
        <PDFDownloadLink
          document={<PnpPDF {...parameters} {...results} {...basicInfo} pvEdit={pvEdit} />}
          fileName='Pnp'
        >
          {({ loading }) =>
            loading ? (
              <button
                className='w-full rounded-xl text-[24px] bg-orange-400 border-solid border-[1px] border-[#000] p-2 disabled:bg-gray-100'
                disabled={true}
              >
                Loading PDF...
              </button>
            ) : (
              <button className='w-full rounded-xl text-[24px] bg-orange-400 border-solid border-[1px] border-[#000] p-2'>
                Stáhnout PDF protokol
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PNP;
