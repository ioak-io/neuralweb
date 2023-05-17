import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import neuralwebWhiteSmall from '../../images/neuralweb_white_small.svg';
import neuralwebWhiteText from '../../images/neuralweb_white_text.svg';
import neuralwebBlackSmall from '../../images/neuralweb_black_small.svg';
import neuralwebBlackText from '../../images/neuralweb_black_text.svg';
import neuralwebBlack from '../../images/neuralweb_black.svg';

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
        {profile.theme === 'basicui-light' && (
          <img src={neuralwebBlackSmall} alt="Neuralweb logo" />
        )}
        {profile.theme === 'basicui-dark' && (
          <img src={neuralwebWhiteSmall} alt="Neuralweb logo" />
        )}
      </div>
      {props.variant === 'full' && (
        <div className="logo--text">
          {profile.theme === 'basicui-light' && (
            <img src={neuralwebBlackText} alt="Neuralweb logo" />
          )}
          {profile.theme === 'basicui-dark' && (
            <img src={neuralwebWhiteText} alt="Neuralweb logo" />
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
