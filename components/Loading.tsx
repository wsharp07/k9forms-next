import loading from '../public/loading.svg';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className="loading">
      <Image src={loading} alt="Loading Image" />
    </div>
  );
};

export default Loading;
