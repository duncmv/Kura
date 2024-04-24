import Image from 'next/image';
import React from 'react';

export default function HombePage({userData}: {userData: any}) {
  return (
    <div className='bg-white'>
      Welcome Home {userData.fName}
      <Image src={userData.avatar} alt={userData.fName} width={50} height={50} />
    </div>
  );
}