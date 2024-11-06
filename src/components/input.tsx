import type { NextPage } from 'next';
import { Input } from '@nextui-org/react';

const Field: NextPage = () => {
  return (
    <div className="w-[340px] h-[70px] flex-col justify-start items-start inline-flex">
      <div className="self-stretch pr-2 pb-3 justify-start items-center inline-flex">
        <div className="text-[#17c964] text-xs font-normal font-['Inter'] leading-none">label</div>
      </div>
      <div className="self-stretch px-1.5 py-2 rounded-xl shadow border-2 border-zinc-700 justify-start items-center inline-flex">
        <Input
          fullWidth
          placeholder="content"
          style={{ width: '276px', color: '#ecedee', fontFamily: 'Inter', fontSize: '1rem' }}
        />
      </div>
    </div>
  );
};

export default Field;