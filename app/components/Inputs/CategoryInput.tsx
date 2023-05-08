'use client';

import React from 'react';
import { IconType } from 'react-icons';

type Props = {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
};

const CategoryInput = ({ icon: Icon, selected, onClick, label }: Props) => {
  return (
    <>
      <div
        onClick={() => onClick(label)}
        className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
          selected ? 'border-black' : 'border-neutral-200'
        }`}
      >
        <Icon size={30} />
        <div className="font-semibold">{label}</div>
      </div>
    </>
  );
};

export default CategoryInput;
