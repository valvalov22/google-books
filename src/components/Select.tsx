import React from 'react';
import { store } from '../store/Store';

type Props = {
    name: string;
    options: string[];
}

const Select: React.FC<Props> = ({name, options}) => {
  return (
    <div className="flex items-center whitespace-nowrap gap-2 justify-center">
    <label htmlFor="select">{name}</label>
    <select
        defaultValue={options[0]}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            options.length > 2
                ? store.changeType(e.target.value)
                : store.changeSort(e.target.value);
        }}
        id="select"
        className="form-select appearance-none
        md:max-w-[45%]
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-white-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-white-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
  )
}

export default Select