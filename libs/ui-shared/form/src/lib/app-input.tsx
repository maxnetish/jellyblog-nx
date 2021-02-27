import React, { FunctionComponent, InputHTMLAttributes, PropsWithChildren } from 'react';

import styles from './app-input.module.scss';

/* eslint-disable-next-line */
export interface AppInputProps extends InputHTMLAttributes<Element> {

}

const AppInput: FunctionComponent<AppInputProps> =
  function(props: PropsWithChildren<AppInputProps>) {
    const {
      className: classFromProps,
      ...restProps
    } = props;
    const combinedClass = `${styles.appInput} ${classFromProps || ''}`;

    return (
      <input type='text' className={combinedClass} {...restProps} />
    );
  };

export default AppInput;
