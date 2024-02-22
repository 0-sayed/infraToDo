import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';

const Loader = ()=>{
  return (
    <div className="flex justify-center items-center">
      <ArrowPathIcon className="animate-spin h-5 w-5 text-blue-500" />
    </div>
  );
}

export default Loader;