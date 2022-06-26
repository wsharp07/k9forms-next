import loading from '../public/loading.svg';
import Image from 'next/image';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Image src={loading} alt="Loading Image" />
    </div>
  );
};

export default Loading;
