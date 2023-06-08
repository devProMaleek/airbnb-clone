'use client';

import React from 'react';
import { TbCurrencyNaira } from 'react-icons/tb';

type Props = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  formatPrice?: boolean;
  errors: boolean;
};

const PriceInput = ({
  id,
  type = 'text',
  label,
  disabled,
  formatPrice,
  onChangeHandler,
  value,
  errors,
}: Props) => {
  return (
    <>
      <div className="relative w-full">
        {formatPrice && <TbCurrencyNaira size={25} className="absolute text-neutral-700 top-6 left-2" />}
        <input
          id={id}
          disabled={disabled}
          value={value}
          onChange={onChangeHandler}
          placeholder=" "
          type={type}
          className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
            formatPrice ? 'pl-9' : 'pl-4'
          } ${errors ? 'border-rose-500' : 'border-neutral-300'} ${
            errors ? 'focus:border-rose-500' : 'focus:border-black'
          }`}
        />
        <label
          htmlFor={id}
          className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
            formatPrice ? 'left-9' : 'left-4'
          } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
            errors ? 'text-rose-500' : 'text-zinc-400'
          }`}
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default PriceInput;
