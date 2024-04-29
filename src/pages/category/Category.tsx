import React, { useCallback, useEffect, useState } from 'react';
import Switch from '~/components/ui/Switch/Switch';
import { Tooltip } from 'flowbite-react';
import categoryDescriptions from './categoryDescriptions.json';
import { Icon } from '~/components/icons';
import { PDFDownloadLink } from "@react-pdf/renderer";
import CategoryPDF from "~/components/documents/CategoryPDF";

export interface ICategoryZeroInputs {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
  f: boolean;
  g: boolean;
  i: boolean;
  j: boolean;
  k: boolean;
  l: boolean;
  m: boolean;
  n: boolean;
  o: boolean;
  p: boolean;
}

export interface IBasicInfo {
  name: string;
  place: string;
  investor: string;
  windowName?: string;
}

export interface IBuildingInformation {
  area: number;
  aboveground: number;
  buildingHeight: number;
  underground: number;
  oneFloorHeight: number;
  sleepPlaces: boolean;
  asistancePlaces: boolean;
  publicPlaces: boolean;
  assistancePeople: number;
}

type PresentValueType = { present: boolean; value: number };
type ToxicTanksType = { present: boolean; category1: number; category2: number };

export interface IBuildingSpecification {
  forLiving: boolean;
  placesUnderground: boolean;
  projPeople: number;
  livingPeople: number;
  culturalBuilding: boolean;
  waterSource: boolean;
  communication: boolean;
  pyrotechnic: boolean;
  bigTanks: PresentValueType
  flammableLiquids: PresentValueType;
  flammableGas: PresentValueType;
  gasTank: PresentValueType;
  highwayTunnel: PresentValueType;
  toxicTanks: ToxicTanksType;
  ammunition: PresentValueType;
  explosives: boolean;
  shelter: boolean;
  metro: boolean;
  complex: boolean;
}

const categ = {
  KAT1: 1,
  KAT2: 2,
  KAT3: 3,
}

const categoryToRome = {
  0: "0",
  1: "I",
  2: "II",
  3: "III"
}

const Category = () => {
  const [basicInfo, setBasicInfo] = useState<IBasicInfo>({
    name: '',
    place: '',
    investor: '',
  });
  const [categoryZeroInputs, setCategoryZeroInputs] = useState<ICategoryZeroInputs>({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    i: false,
    j: false,
    k: false,
    l: false,
    m: false,
    n: false,
    o: false,
    p: false,
  });
  const [buildingInfo, setBuildingInfo] = useState<IBuildingInformation>({
    area: 0,
    buildingHeight: 0,
    aboveground: 0,
    underground: 0,
    oneFloorHeight: 0,
    sleepPlaces: false,
    publicPlaces: false,
    asistancePlaces: false,
    assistancePeople: 0,
  });
  const [buildingSpecification, setBuildingSpecification] = useState<IBuildingSpecification>({
    forLiving: false,
    placesUnderground: false,
    projPeople: 0,
    livingPeople: 0,
    culturalBuilding: false,
    waterSource: false,
    communication: false,
    pyrotechnic: false,
    bigTanks: { present: false, value: 0 },
    flammableLiquids: { present: false, value: 0 },
    flammableGas: { present: false, value: 0 },
    gasTank: { present: false, value: 0 },
    highwayTunnel: { present: false, value: 0 },
    toxicTanks: { present: false, category1: 0, category2: 0 },
    ammunition: { present: false, value: 0 },
    explosives: false,
    shelter: false,
    metro: false,
    complex: false,
  });

  const isFieldDisabled = useCallback(
    (name: string) => {
      return (
        (name === 'assistancePeople' && !buildingInfo.asistancePlaces) ||
        (name === 'oneFloorHeight' && buildingInfo.underground + buildingInfo.aboveground > 1)
      );
    },
    [buildingInfo],
  );

  const convertToPresentValueType = (name: string) => {
    return buildingSpecification[name as keyof typeof buildingSpecification] as PresentValueType;
  };
  const convertToToxicTanksType = (name: string) => {
    return buildingSpecification[name as keyof typeof buildingSpecification] as ToxicTanksType;
  };

  const generateInputFields = (name: string) => {
    if (typeof buildingSpecification[name as keyof typeof buildingSpecification] === 'number') {
      return (
        <>
          <div className={"flex flex-col gap-1"}>
            <span className={`block mb-2 text-xl font-semibold text-gray-900`}>
            {categoryDescriptions.full[name as keyof typeof buildingSpecification]}
          </span>
            <div className={'flex items-center gap-1'}>
              <input
                type="number"
                id={name}
                onChange={(e) => {
                  setBuildingSpecification({
                    ...buildingSpecification,
                    [name as keyof typeof buildingSpecification]: +e.target.value
                  });
                }}
                className={`bg-gray-50 border-orange-500 border w-[200px] text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
                required
              />
              osob
            </div>
          </div>
        </>
      );
    } else if (
      typeof buildingSpecification[name as keyof typeof buildingSpecification] === "boolean"
    ) {
      return (
        <>
        <Switch
            isOn={buildingSpecification[name as keyof typeof buildingSpecification] as boolean}
            handleToggle={() =>
              setBuildingSpecification({
                ...buildingSpecification,
                [name as keyof typeof buildingSpecification]:
                  !buildingSpecification[name as keyof typeof buildingSpecification]
              })
            }
          />
          <span className="text-xl font-bold mr-5">
            {categoryDescriptions.short[name as keyof typeof buildingSpecification]}
          </span>
        </>
      );
    } else if (
      typeof buildingSpecification[name as keyof typeof buildingSpecification] === 'object'
    ) {
      if (name !== 'toxicTanks') {
        return (
          <>
            <Switch
              isOn={convertToPresentValueType(name).present}
              handleToggle={() =>
                setBuildingSpecification({
                  ...buildingSpecification,
                  [name as keyof typeof buildingSpecification]: {
                    present: !convertToPresentValueType(name).present,
                    value: convertToPresentValueType(name).value,
                  },
                })
              }
            />
            <div className={'flex flex-col gap-1'}>
              <span className="text-xl font-bold mr-5">
              {categoryDescriptions.short[name as keyof typeof buildingSpecification]}
            </span>
              <input
                type="number"
                id={name}
                onChange={(e) =>
                  setBuildingSpecification({
                    ...buildingSpecification,
                    [name as keyof typeof buildingSpecification]: {
                      present: convertToPresentValueType(name).present,
                      value: e.target.value
                    }
                  })
                }
                className={`${
                  convertToPresentValueType(name).present
                    ? "bg-gray-50 border-orange-500"
                    : "bg-orange-100 border-orange-500"
                } border w-[200px] text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
                required
                disabled={!convertToPresentValueType(name).present}
              />
            </div>

          </>
        );
      } else {
        return (
          <>
            <Switch
              isOn={convertToToxicTanksType(name).present}
              handleToggle={() =>
                setBuildingSpecification({
                  ...buildingSpecification,
                  [name as keyof typeof buildingSpecification]: {
                    present: !convertToToxicTanksType(name).present,
                    category1: convertToToxicTanksType(name).category1,
                    category2: convertToToxicTanksType(name).category2
                  }
                })
              }
            />
            <div className="flex flex-col h-full w-[20%]">
              <div className="flex flex-row items-center gap-2 mb-2">
                <input
                  type="number"
                  id={name}
                  onChange={(e) =>
                    setBuildingSpecification({
                      ...buildingSpecification,
                      [name as keyof typeof buildingSpecification]: {
                        present: convertToToxicTanksType(name).present,
                        category1: e.target.value,
                        category2: convertToToxicTanksType(name).category2,
                      },
                    })
                  }
                  className={`${
                    convertToToxicTanksType(name).present
                      ? 'bg-gray-50 border-orange-500'
                      : 'bg-orange-100 border-orange-500'
                  } border w-1/2 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
                  required
                  disabled={!convertToToxicTanksType(name).present}
                />
                <span className='text-m font-semibold w-1/3'>Kategorie 1</span>
              </div>
              <div className='flex flex-row items-center gap-2 mb-2'>
                <input
                  type='number'
                  id={name}
                  onChange={(e) =>
                    setBuildingSpecification({
                      ...buildingSpecification,
                      [name as keyof typeof buildingSpecification]: {
                        present: convertToToxicTanksType(name).present,
                        category1: convertToToxicTanksType(name).category1,
                        category2: e.target.value,
                      },
                    })
                  }
                  className={`${
                    convertToToxicTanksType(name).present
                      ? 'bg-gray-50 border-orange-500'
                      : 'bg-orange-100 border-orange-500'
                  } border w-1/2 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
                  required
                  disabled={!convertToToxicTanksType(name).present}
                />
                <span className='text-m font-semibold w-1/3'>Kategorie 2</span>
              </div>
            </div>
            <span className='text-xl font-bold'>
              {categoryDescriptions.short[name as keyof typeof buildingSpecification]}
            </span>
          </>
        );
      }
    }
  };

  const [_class, setClass] = useState(1);
  const [category, setCategory] = useState('I');
  const [zeroCategoryActive, setZeroCategoryActive] = useState(false);

  useEffect(() => {
    setClass(zeroCategoryActive ? -1 : calculateClass);
    setCategory(zeroCategoryActive ? '0' : categoryToRome[calculateCategory() as keyof typeof categoryToRome]);
  }, [
    JSON.stringify(buildingSpecification),
    JSON.stringify(buildingInfo),
    zeroCategoryActive,
  ]);

  useEffect(() => {
    Object.entries(categoryZeroInputs).filter(([_, value]) => value).length !== 0
      ? setZeroCategoryActive(true)
      : setZeroCategoryActive(false);
  }, [JSON.stringify(categoryZeroInputs)]);

  const calculateClass = (): number => {
    let A = buildingInfo.sleepPlaces ? 1 : 0;
    let B = buildingInfo.asistancePlaces ? 2 : 0;
    let C = buildingInfo.publicPlaces ? 4 : 0;
    let Class = A + B + C;
    switch (Class) {
      case 0:
        return 1;
      case 1:
        return 3;
      case 4:
        return 2;
      case 5:
        return 4;
      default:
        return 5;
    }
  };

  const calculateCategory = () : number => {
    if(
      (buildingInfo.buildingHeight > 22.5 && (_class === 4 || _class === 5)) ||
      (buildingInfo.buildingHeight > 45 && (_class === 1 || _class === 2 || _class === 3)) ||
      (buildingInfo.buildingHeight > 6 && _class === 5 && buildingInfo.assistancePeople > 10) ||
      buildingInfo.underground > 2 ||
      buildingSpecification.projPeople > 1000 ||
      buildingSpecification.livingPeople > 1000 ||
      buildingInfo.assistancePeople > 100 ||
      buildingSpecification.bigTanks.value > 5000 ||
      buildingSpecification.highwayTunnel.value > 1000 ||
      buildingSpecification.metro ||
      buildingSpecification.explosives ||
      buildingSpecification.ammunition.value > 200000
    ){
      return categ.KAT3
    }

    if(
      buildingSpecification.culturalBuilding ||
      buildingSpecification.flammableLiquids.value > 5 ||
      buildingSpecification.flammableGas.value > 600 ||
      buildingSpecification.gasTank.value > 5 ||
      buildingSpecification.pyrotechnic ||
      (buildingSpecification.toxicTanks.present && (buildingSpecification.toxicTanks.category1 > 100 || buildingSpecification.toxicTanks.category2 > 1000)) ||
      buildingSpecification.shelter
    ){
      return categ.KAT2
    }

    if(buildingInfo.buildingHeight <= 9
      && (buildingSpecification.projPeople <= 100 || buildingSpecification.forLiving)
      && (
        buildingInfo.area <= 200
        ||
        buildingInfo.area <= 500 && _class === 1 && buildingInfo.underground <= 1 && buildingInfo.aboveground <= 2
        ||
        buildingInfo.area <= 600 && _class === 2 && buildingInfo.oneFloorHeight <= 12 && buildingInfo.aboveground === 1
        ||
        buildingInfo.area <= 800 && buildingSpecification.forLiving
        ||
        buildingInfo.area <= 1000 && _class === 1 && buildingInfo.aboveground === 1 && buildingInfo.oneFloorHeight <= 12
      )
      && buildingInfo.underground <= 1
      && (_class === 1 || _class === 2 || _class === 3 || (_class === 4 && buildingInfo.aboveground <= 2 && buildingSpecification.projPeople <= 20))
    ){
      return categ.KAT1
    }

    if(
      (buildingSpecification.highwayTunnel.present && buildingSpecification.highwayTunnel.value <= 100)
      ||
      (buildingSpecification.waterSource)
      ||
      (buildingSpecification.communication)
      ||
      (buildingSpecification.complex)
    ){
      return categ.KAT1
    }
    return 2
  };

  return (
    <div className='flex flex-col w-[80%] self-center mb-7'>
      <div className='z-1 hidden sm:block fixed right-0 top-[30vh] '>
        <div
          className={
            'w-[350px] h-fit rounded-xl bg-[#fff] py-4 px-4 border-solid border-orange-500 border-[1px] flex flex-col gap-2'
          }
        >
          <div className={'flex flex-col gap-5 w-[95%]'}>
            <div className={'flex gap-3 justify-between items-center'}>
              <h2 className={'text-[#000000] font-[500] text-[24px]'}>Třída využití</h2>
              <div
                className={
                  'bg-[#fff] border-[1px] border-[#E7E7E7] border-solid flex items-center justify-center w-[80px] h-[33px] rounded-xl text-[#000] text-[24px] font-[500]'
                }
              >
                {_class !== -1 ? _class : '---'}
              </div>
            </div>
          </div>

          <div className={'flex flex-col gap-5 w-[95%]'}>
            <div className={'flex gap-3 justify-between items-center'}>
              <h2 className={'text-[#000000] font-[500] text-[24px]'}>Kategorie</h2>
              <div
                className={
                  'bg-[#fff] border-[1px] border-[#E7E7E7] border-solid flex items-center justify-center w-[80px] h-[33px] rounded-xl text-[#000] text-[24px] font-[500]'
                }
              >
                {category}
              </div>
            </div>
          </div>
          <PDFDownloadLink
            document={
              <CategoryPDF
                {...categoryZeroInputs}
                {...buildingInfo}
                {...basicInfo}
                {...buildingSpecification}
                _class={_class}
                category={category}
              />
            }
            fileName='Classification'
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
              className='bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </div>
          <div>
            <label htmlFor='last_name' className='block mb-2 text-[20px] font-semibold text-gray-900'>
              Místo akce
            </label>
            <input
              type='text'
              id='last_name'
              onChange={(e) => setBasicInfo({ ...basicInfo, place: e.target.value })}
              className='bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </div>
          <div>
            <label
              htmlFor='last_name'
              className='block mb-2 text-[20px] font-semibold text-gray-900 dark:text-white'
            >
              Investor
            </label>
            <input
              type='text'
              id='last_name'
              onChange={(e) => setBasicInfo({ ...basicInfo, investor: e.target.value })}
              className='bg-gray-50 border border-orange-500 text-gray-900 text-[20px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </div>
        </div>
      </form>
      {/*----------------------------*/}

      {/*---Specifikace kategorie 0---*/}
      <h2 className='text-3xl font-extrabold border-b-2 pb-2 mb-4'>Specifikace kategorie 0</h2>
      {Object.keys(categoryZeroInputs).map((name) => (
        <div className='flex items-center gap-3 border-b-[1px] pb-2 mb-4'>
          <Switch
            isOn={categoryZeroInputs[name as keyof typeof categoryZeroInputs]}
            handleToggle={() =>
              setCategoryZeroInputs({
                ...categoryZeroInputs,
                [name as keyof typeof categoryZeroInputs]:
                  !categoryZeroInputs[name as keyof typeof categoryZeroInputs],
              })
            }
          />
          <span className='text-xl font-bold mr-5'>
            {categoryDescriptions.short[name as keyof typeof categoryZeroInputs]}
          </span>
          <Tooltip
            className='rounded-none text-m justify-self-end'
            content={categoryDescriptions.full[name as keyof typeof categoryZeroInputs]}
            style='light'
            animation='duration-300'
          >
            <div className={'rounded-full border-orange-500 border-[1px]'}>
              <Icon name='questionMark' size={20} />
            </div>
          </Tooltip>
        </div>
      ))}
      {/*-----------------------------*/}

      {/*-------Údaje o stavbě-------*/}
      <h2 className='text-3xl font-extrabold border-b-2 pb-2 mb-2 pt-4'>Údaje o stavbě</h2>
      {Object.keys(buildingInfo).map((name) => (
        <div className='flex items-center gap-3 border-b-[1px] pb-2 mb-4'>
          {name === 'sleepPlaces' || name === 'asistancePlaces' || name === 'publicPlaces' ? (
            <>
              <Switch
                isOn={buildingInfo[name as keyof typeof buildingInfo] as boolean}
                handleToggle={() =>
                  setBuildingInfo({
                    ...buildingInfo,
                    [name as keyof typeof buildingInfo]:
                      !buildingInfo[name as keyof typeof buildingInfo],
                  })
                }
              />
              <span className='text-xl font-bold mr-5'>
                {categoryDescriptions.short[name as keyof typeof buildingInfo]}
              </span>
            </>
          ) : (
            <>
              <input
                type='number'
                id={name}
                onChange={(e) =>
                  setBuildingInfo({
                    ...buildingInfo,
                    [name as keyof typeof buildingInfo]: e.target.value,
                  })
                }
                className={`${
                  isFieldDisabled(name)
                    ? 'bg-orange-100 border-orange-500'
                    : 'bg-gray-50 border-orange-500'
                } border w-[10%] text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
                required
                disabled={isFieldDisabled(name)}
              />
              {name === 'area' ? 'm²' : name === 'buildingHeight' ? 'm' : <></>}
              <label htmlFor={name} className={`block mb-2 text-xl font-semibold text-gray-900`}>
                {categoryDescriptions.full[name as keyof typeof buildingInfo]}
              </label>
            </>
          )}
          <Tooltip
            className='rounded-none text-m'
            content={categoryDescriptions.full[name as keyof typeof buildingInfo]}
            style='light'
            animation='duration-300'
          >
            <div className={'rounded-full border-orange-500 border-[1px]'}>
              <Icon name='questionMark' size={20} />
            </div>
          </Tooltip>
        </div>
      ))}
      {/*----------------------------*/}

      {/*-------Specifikace stavby-------*/}
      <h2 className='text-3xl font-extrabold border-b-2 pb-2 mb-2 pt-4'>Specifikace stavby</h2>
      {Object.keys(buildingSpecification).map((name) => (
        <div className='flex items-center gap-3 border-b-[1px] pb-2 mb-4'>
          {generateInputFields(name)}
          <Tooltip
            className='rounded-none text-m self-end'
            content={categoryDescriptions.full[name as keyof typeof buildingSpecification]}
            style='light'
            animation='duration-300'
          >
            <div className={'rounded-full border-orange-500 border-[1px]'}>
              <Icon name='questionMark' size={20} />
            </div>
          </Tooltip>
        </div>
      ))}
      {/*--------------------------------*/}
      <div className={'w-full h-fit flex sm:hidden rounded-xl bg-[#fff] py-4 px-4 border-solid border-orange-500 border-[1px] flex-col gap-2'}>
        <div className={'flex flex-col gap-5 w-[95%]'}>
          <div className={'flex gap-3 justify-between items-center'}>
            <h2 className={'text-[#000000] font-[500] text-[24px]'}>Třída využití</h2>
            <div
              className={
                'bg-[#fff] border-[1px] border-[#E7E7E7] border-solid flex items-center justify-center w-[80px] h-[33px] rounded-xl text-[#000] text-[24px] font-[500]'
              }
            >
              {_class !== -1 ? _class : '---'}
            </div>
          </div>
        </div>

        <div className={'flex flex-col gap-5 w-[95%]'}>
          <div className={'flex gap-3 justify-between items-center'}>
            <h2 className={'text-[#000000] font-[500] text-[24px]'}>Kategorie</h2>
            <div
              className={
                'bg-[#fff] border-[1px] border-[#E7E7E7] border-solid flex items-center justify-center w-[80px] h-[33px] rounded-xl text-[#000] text-[24px] font-[500]'
              }
            >
              {category}
            </div>
          </div>
        </div>
        <PDFDownloadLink
          document={
            <CategoryPDF
              {...categoryZeroInputs}
              {...buildingInfo}
              {...basicInfo}
              {...buildingSpecification}
              _class={_class}
              category={category}
            />
          }
          fileName='Classification'
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

export default Category;
