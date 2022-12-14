import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import metamindWhiteSmall from '../../images/new.svg';
import metamindWhiteText from '../../images/metamind_white_text.svg';
import metamindBlackSmall from '../../images/metamind_black_small.svg';
import metamindBlackText from '../../images/metamind_black_text.svg';
import metamindBlack from '../../images/metamind_black.svg';

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
        {profile.theme === 'theme_light' && (
          <img src={metamindWhiteSmall} alt="Fortuna logo" />
        )}
        {profile.theme !== 'theme_light' && (
          <img src={metamindWhiteSmall} alt="Fortuna logo" />
        )}
      </div>
      {props.variant === 'full' && (
        <div className="logo--text">
          <img src={metamindWhiteText} alt="Fortuna logo" />
        </div>
      )}
    </div>
  );
};

export default Logo;
