import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>&#128543;</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.discription}>К сожалению данная страница пока отсутствует</p>
    </div>
  );
};

export default NotFoundBlock;
