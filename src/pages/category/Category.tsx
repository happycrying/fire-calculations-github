import React, { useCallback, useState } from "react";
import Switch from "~/components/ui/Switch/Switch";
import { Tooltip } from "flowbite-react";
import categoryDescriptions from "./categoryDescriptions.json"
import { Icon } from "~/components/icons";
interface ICategoryZeroInputs {
  a: boolean,
  b: boolean,
  c: boolean,
  d: boolean,
  e: boolean,
  f: boolean,
  g: boolean,
  i: boolean,
  j: boolean,
  k: boolean,
  l: boolean,
  m: boolean,
  n: boolean,
  o: boolean,
  p: boolean,
}

interface IBasicInfo {
  name: string;
  place: string;
  investor: string;
}

interface IBuildingInformation {
  area: number,
  aboveground: number,
  buildingHeight:number,
  underground:number,
  oneFloorHeight:number,
  sleepPlaces:boolean,
  asistancePlaces:boolean,
  publicPlaces: boolean,
  assistancePeople: number
}

type PresentValueType = {present: boolean, value:number}
type BigTanksType = {present: boolean,category1:number,category2:number}
interface IBuildingSpecification {
  forLiving: boolean,
  projPeople: number,
  placesUnderground: boolean,
  livingPeople: number,
  culturalBuilding: boolean,
  flammableLiquids: PresentValueType,
  waterSource: boolean,
  flammableGas: PresentValueType,
  communication: boolean,
  gasTank: PresentValueType,
  pyrotechnic:boolean ,
  highwayTunnel: PresentValueType,
  toxic: boolean,
  bigTanks: BigTanksType,
  ammunition: PresentValueType,
  explosives: boolean,
  shelter: boolean,
  metro: boolean,
  complex: boolean
}

const Category = () => {

  const [basicInfo, setBasicInfo] = useState<IBasicInfo>({
    name:"",
    place:"",
    investor:""
  })
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
  })
  const [buildingInfo, setBuildingInfo] = useState<IBuildingInformation>({
    area: 0,
    buildingHeight:0,
    aboveground: 0,
    underground:0,
    oneFloorHeight:0,
    sleepPlaces:false,
    publicPlaces: false,
    asistancePlaces:false,
    assistancePeople: 0
  })
  const [buildingSpecification, setBuildingSpecification] = useState<IBuildingSpecification>({
    forLiving: false,
    projPeople: 0,
    placesUnderground: false,
    livingPeople: 0,
    culturalBuilding: false,
    flammableLiquids: {present: false, value:0},
    waterSource: false,
    flammableGas: {present: false, value:0},
    communication: false,
    gasTank: {present: false, value:0},
    pyrotechnic:false ,
    highwayTunnel: {present: false, value:0},
    toxic: false,
    bigTanks: {present: false,category1:0,category2:0},
    ammunition: {present: false, value:0},
    explosives: false,
    shelter: false,
    metro: false,
    complex: false
  })

  const isFieldDisabled = useCallback((name: string) => {
    return (name === "assistancePeople" && !buildingInfo.asistancePlaces) || (name === "oneFloorHeight" && buildingInfo.underground + buildingInfo.aboveground > 1)
  }, [buildingInfo])

  const convertToPresentValueType = (name: string) => {
    return buildingSpecification[name as keyof typeof buildingSpecification] as PresentValueType
  }
  const convertToBigTanksType = (name: string) => {
    return buildingSpecification[name as keyof typeof buildingSpecification] as BigTanksType
  }

  const generateInputFields = (name: string) => {
    if(typeof buildingSpecification[name as keyof typeof buildingSpecification] === "number"){
      return <>
        <input type="number" id={name} onChange={(e) => setBuildingSpecification({...buildingSpecification, [name as keyof typeof buildingSpecification]:e.target.value})}
               className={`bg-gray-50 border-gray-300 border w-[10%] text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
               required/>
        osob
        <label htmlFor={name} className={`block mb-2 text-xl font-semibold text-gray-900`}>{categoryDescriptions.full[name as keyof typeof buildingSpecification]}</label>
      </>
    }
    else if(typeof buildingSpecification[name as keyof typeof buildingSpecification] === "boolean"){
      return <><Switch
        isOn={buildingSpecification[name as keyof typeof buildingSpecification] as boolean}
        handleToggle={() => setBuildingSpecification({...buildingSpecification, [name as keyof typeof buildingSpecification]:!buildingSpecification[name as keyof typeof buildingSpecification]})}
      /><span className="text-xl font-bold mr-5">{categoryDescriptions.short[name as keyof typeof buildingSpecification]}</span></>
    }
    else if(typeof buildingSpecification[name as keyof typeof buildingSpecification] === "object"){
      if(name !== "bigTanks"){
        return <>
          <Switch
            isOn={convertToPresentValueType(name).present}
            handleToggle={() =>
              setBuildingSpecification(
                {...buildingSpecification,
                  [name as keyof typeof buildingSpecification]:{
                  present:!convertToPresentValueType(name).present,
                    value:convertToPresentValueType(name).value,
                  }})}
          />
          <input type="number" id={name} onChange={(e) =>
            setBuildingSpecification(
              {...buildingSpecification,
                [name as keyof typeof buildingSpecification]:{
                  present:convertToPresentValueType(name).present,
                  value:e.target.value,
                }})}
                 className={`${convertToPresentValueType(name).present ? "bg-gray-50 border-gray-300" : "bg-gray-400 border-gray-300"} border w-[10%] text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
                 required disabled={!convertToPresentValueType(name).present}/>
          <span className="text-xl font-bold mr-5">{categoryDescriptions.short[name as keyof typeof buildingSpecification]}</span>
        </>
      }
      else {
        return <>
          <Switch
            isOn={convertToBigTanksType(name).present}
            handleToggle={() =>
              setBuildingSpecification(
                {...buildingSpecification,
                  [name as keyof typeof buildingSpecification]:{
                    present:!convertToBigTanksType(name).present,
                    category1:convertToBigTanksType(name).category1,
                    category2:convertToBigTanksType(name).category2,
                  }})}
          />
          <div className="flex flex-col h-full w-[20%]">
            <div className="flex flex-row items-center gap-2 mb-2">
              <input type="number" id={name} onChange={(e) =>
              setBuildingSpecification(
                {...buildingSpecification,
                  [name as keyof typeof buildingSpecification]:{
                    present:convertToBigTanksType(name).present,
                    category1:e.target.value,
                    category2:convertToBigTanksType(name).category2,
                  }})}
                   className={`${convertToBigTanksType(name).present ? "bg-gray-50 border-gray-300" : "bg-gray-400 border-gray-300"} border w-1/2 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
                   required disabled={!convertToBigTanksType(name).present}/>
              <span className="text-m font-semibold w-1/3">Kategorie 1</span>
            </div>
            <div className="flex flex-row items-center gap-2 mb-2">
              <input type="number" id={name} onChange={(e) =>
                setBuildingSpecification(
                  {...buildingSpecification,
                    [name as keyof typeof buildingSpecification]:{
                      present:convertToBigTanksType(name).present,
                      category1:convertToBigTanksType(name).category1,
                      category2:e.target.value,
                    }})}
                     className={`${convertToBigTanksType(name).present ? "bg-gray-50 border-gray-300" : "bg-gray-400 border-gray-300"} border w-1/2 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
                     required disabled={!convertToBigTanksType(name).present}/><span className="text-m font-semibold w-1/3">Kategorie 2</span></div>
          </div>
          <span className="text-xl font-bold">{categoryDescriptions.short[name as keyof typeof buildingSpecification]}</span>
        </>
      }
    }
  }

  return (
    <div className="flex flex-col w-[80%] self-center mb-7">

      {/*--Základní údaje o zakázce--*/}
      <h2 className="text-3xl font-extrabold border-b-2 pb-2 mb-2">Základní údaje o zakázce</h2>
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="nazev_akce" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Název akce</label>
            <input type="text" id="nazev_akce" onChange={(e) => setBasicInfo({...basicInfo, name:e.target.value})}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Místo akce</label>
            <input type="text" id="last_name" onChange={(e) => setBasicInfo({...basicInfo, place:e.target.value})}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Investor</label>
            <input type="text" id="last_name" onChange={(e) => setBasicInfo({...basicInfo, investor:e.target.value})}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
        </div>
      </form>
      {/*----------------------------*/}


      {/*---Specifikace kategorie 0---*/}
      <h2 className="text-3xl font-extrabold border-b-2 pb-2 mb-4">Specifikace kategorie 0</h2>
      {Object.keys(categoryZeroInputs).map((name) =>(
        <div className="flex items-center gap-3 border-b-[1px] pb-2 mb-4">
          <Tooltip className="rounded-none text-m" content={categoryDescriptions.full[name as keyof typeof categoryZeroInputs]} style="light" animation="duration-300">
            <Icon name="questionMark" size={ 30 }/>
          </Tooltip>
          <Switch
            isOn={categoryZeroInputs[name as keyof typeof categoryZeroInputs]}
            handleToggle={() => setCategoryZeroInputs({...categoryZeroInputs, [name as keyof typeof categoryZeroInputs]:!categoryZeroInputs[name as keyof typeof categoryZeroInputs]})}
          />
          <span className="text-xl font-bold mr-5">{categoryDescriptions.short[name as keyof typeof categoryZeroInputs]}</span>
        </div>
      ))}
      {/*-----------------------------*/}


      {/*-------Údaje o stavbě-------*/}
      <h2 className="text-3xl font-extrabold border-b-2 pb-2 mb-2 pt-4">Údaje o stavbě</h2>
      {Object.keys(buildingInfo).map((name) =>(
        <div className="flex items-center gap-3 border-b-[1px] pb-2 mb-4">
          <Tooltip className="rounded-none text-m" content={categoryDescriptions.full[name as keyof typeof buildingInfo]} style="light" animation="duration-300">
            <Icon name="questionMark" size={ 30 }/>
          </Tooltip>
          {(name === "sleepPlaces" || name === "asistancePlaces" || name === "publicPlaces") ? <><Switch
            isOn={buildingInfo[name as keyof typeof buildingInfo] as boolean}
            handleToggle={() => setBuildingInfo({...buildingInfo, [name as keyof typeof buildingInfo]:!buildingInfo[name as keyof typeof buildingInfo]})}
          />
            <span className="text-xl font-bold mr-5">{categoryDescriptions.short[name as keyof typeof buildingInfo]}</span>
          </> : <>
            <input type="number" id={name} onChange={(e) => setBuildingInfo({...buildingInfo, [name as keyof typeof buildingInfo]:e.target.value})}
                   className={`${isFieldDisabled(name) ? "bg-gray-400 border-gray-300" : "bg-gray-50 border-gray-300"} border w-[10%] text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`}
                   required disabled={isFieldDisabled(name)}/>
            {name === "area" || name === "buildingHeight" ? "m²" : <></>}
            <label htmlFor={name} className={`block mb-2 text-xl font-semibold text-gray-900`}>{categoryDescriptions.full[name as keyof typeof buildingInfo]}</label>
          </>}

        </div>
      ))}
      {/*----------------------------*/}

      {/*-------Specifikace stavby-------*/}
      <h2 className="text-3xl font-extrabold border-b-2 pb-2 mb-2 pt-4">Specifikace stavby</h2>
      {Object.keys(buildingSpecification).map((name) =>(
        <div className="flex items-center gap-3 border-b-[1px] pb-2 mb-4">
          <Tooltip className="rounded-none text-m" content={categoryDescriptions.full[name as keyof typeof buildingSpecification]} style="light" animation="duration-300">
            <Icon name="questionMark" size={ 30 }/>
          </Tooltip>
          {generateInputFields(name)}
        </div>
      ))}
      {/*--------------------------------*/}

    </div>
  );
};

export default Category;