'use client'
import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
        <ScaleLoader height={50} width={7} color="red" />
    </div>
  );
};

export default Loader;
