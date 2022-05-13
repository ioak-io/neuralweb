import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../actions/ProfileActions';
import './style.scss';

interface Props {
  title: string;
  children?: any;
}

const Topbar = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const toggleSidebar = () => {
    sessionStorage.setItem(
      'metamind_pref_sidebar_status',
      profile.sidebar ? 'collapsed' : 'expanded'
    );

    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  return (
    <div className="topbar bg-light-300 text-gray-900 dark:bg-dark-400 dark:text-gray-200">
      <div className="topbar__left">
        <div>{props.title}</div>
      </div>
      <div className="topbar__right">{props.children}</div>
    </div>
  );
};

export default Topbar;
