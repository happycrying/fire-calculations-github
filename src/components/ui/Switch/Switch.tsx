import React from 'react';
interface ISwitchProps {
  isOn: boolean,
  handleToggle: () => void
}

const Switch = (props: ISwitchProps) => {
  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={props.isOn} onChange={props.handleToggle} className="sr-only peer"/>
        <div className="w-11 h-6 bg-orange-100 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700
         peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white
          after:border-orange-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
      </label>
    </>
  );
};

export default Switch;