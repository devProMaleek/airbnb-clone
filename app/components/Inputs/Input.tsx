'use client';

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { TbCurrencyNaira } from 'react-icons/tb';

type Props = {
  id: string;
  label: string;
  type?: string;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Input = ({
  id,
  type = 'text',
  label,
  disabled,
  formatPrice,
  onChangeHandler,
  required,
  register,
  errors,
}: Props) => {
  return (
    <>
      <div className="w-full relative">
        {formatPrice && <TbCurrencyNaira size={25} className="text-neutral-700 absolute top-6 left-2" />}
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          onChange={onChangeHandler}
          placeholder=" "
          type={type}
          className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
            formatPrice ? 'pl-9' : 'pl-4'
          } ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} ${
            errors[id] ? 'focus:border-rose-500' : 'focus:border-black'
          }`}
        />
        <label
          htmlFor={id}
          className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
            formatPrice ? 'left-9' : 'left-4'
          } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
            errors[id] ? 'text-rose-500' : 'text-zinc-400'
          }`}
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default Input;
