import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './NavigationContainer.scss';
import Topbar from '../Topbar';
import { receiveMessage } from '../../events/MessageService';
import Navbar from '../Navbar';

interface Props {
  cookies: any;
  space: string;
  transparent?: boolean;
}

const NavigationContainer = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);

  return (
    <div
      className={`navigation-container ${
        props.transparent ? 'navigation-container--transparent' : ''
      } ${
        profile.sidebar
          ? 'navigation-container__sidebar-active'
          : 'navigation-container__sidebar-inactive'
      }`}
    >
      <Navbar
        space={props.space}
        cookies={props.cookies}
        hideSidebarOnDesktop={profile.hideSidebarOnDesktop}
      />
    </div>
  );
};

export default NavigationContainer;
