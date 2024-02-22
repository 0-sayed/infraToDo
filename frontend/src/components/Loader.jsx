import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';

const Loader = ({color = "text-blue-500"})=>{
  return (
    <div className="flex justify-center items-center">
      <ArrowPathIcon className={`animate-spin h-5 w-5 ${color}`} />
    </div>
  );
}

export default Loader;