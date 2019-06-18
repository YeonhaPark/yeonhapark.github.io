// @flow
import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';

type Props = {
  date: string
};

const Meta = ({ date }: Props) => (
  <div className={styles['meta']}>
    <p className={styles['meta__date']}>{moment(date).format('YYYY/MM/DD')}에 쓰여졌습니다</p>
  </div>
);

export default Meta;
