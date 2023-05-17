import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import neuralwebBlack from '../../../../images/neuralweb_black.svg';

interface Props {
  variant: 'full' | 'short';
}

const Logo = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      <div className="logo--image">
        <img src={neuralwebBlack} alt="Neuralweb logo" />
      </div>
    </div>
  );
};

export default Logo;
