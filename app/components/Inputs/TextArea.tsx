'use client';

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

type Props = {
  id: string;
  label: string;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const TextArea = ({ id, label, placeholder, rows, cols, disabled, required, register, errors }: Props) => {
  return (
    <>
      <div className="w-full relative">
        <label htmlFor={id} className={`block text-md left-4 ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}>
          {label}
        </label>
        <textarea
          id={id}
          disabled={disabled}
          style={{ resize: 'none' }}
          {...register(id, { required })}
          placeholder={placeholder || ' '}
          className={`w-full p-2 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} ${
            errors[id] ? 'focus:border-rose-500' : 'focus:border-black'
          }`}
          rows={rows || 4}
          cols={cols || 50}
        ></textarea>
      </div>
    </>
  );
};

export default TextArea;
