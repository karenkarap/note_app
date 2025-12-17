'use client';

import { BeatLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div
      style={{
        height: '100vh',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BeatLoader color="#0d6efd" size={20} />
    </div>
  );
};

export default Loading;
