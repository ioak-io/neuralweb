import {
  faCogs,
  faDatabase,
  faFingerprint,
  faSignOutAlt,
  faTh,
  faUserShield,
  faCircleNodes,
  faSearch,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import DarkModeIcon from '../../../components/Navigation/DarkModeIcon';
import NavAccountIcon from '../../../components/Navigation/NavAccountIcon';
import Logo from '../../../components/Logo';
import SideNavLink from '../SideNavLink';

import './style.scss';
import { removeAuth } from '../../../actions/AuthActions';
import { sendMessage } from '../../../events/MessageService';
import SideNavSubHeading from '../SideNavSubHeading';
import { setProfile } from '../../../actions/ProfileActions';

interface Props {
  cookies: any;
  space: string;
}

const SideContentMini = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    sessionStorage.setItem(
      'metamind_pref_sidebar_status',
      profile.sidebar ? 'collapsed' : 'expanded'
    );

    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  const logout = (
    event: any,
    type = 'success',
    message = 'You have been logged out'
  ) => {
    dispatch(removeAuth());
    props.cookies.remove(`metamind-access_token`);
    props.cookies.remove(`metamind-refresh_token`);
    history.push(`/`);
    sendMessage('notification', true, {
      type,
      message,
      duration: 3000,
    });
  };

  const login = (type: string) => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/realm/${process.env.REACT_APP_ONEAUTH_APPSPACE_ID}/login/${process.env.REACT_APP_ONEAUTH_APP_ID}`;
  };

  const chooseCompany = () => {
    history.push('/home');
  };

  return (
    <div
      className={`side-content-mini ${
        profile.sidebar
          ? 'bg-light-400 dark:bg-dark-500'
          : 'bg-light-300 dark:bg-dark-400'
      }`}
    >
      <div className="side-content-mini__header">
        <div className="side-content-mini__header__button">
          <Logo variant="short" />
        </div>
      </div>
      <div className="side-content-mini__control">
        <button className="button" onClick={toggleSidebar}>
          {!profile.sidebar && <FontAwesomeIcon icon={faChevronRight} />}
          {profile.sidebar && <FontAwesomeIcon icon={faChevronLeft} />}
        </button>
      </div>
      <div className="side-content-mini__menu">
        {props.space && (
          <>
            <SideNavLink
              link={`/${props.space}/graph`}
              icon={faCircleNodes}
              label="Graph"
            />
            <SideNavLink
              link={`/${props.space}/search`}
              icon={faSearch}
              label="Search"
            />
            <SideNavLink
              link={`/${props.space}/settings/company`}
              icon={faCogs}
              label="Network setting"
            />
            <SideNavLink
              link={`/${props.space}/settings/user`}
              icon={faUserShield}
              label="User"
            />
            <SideNavLink
              link={`/${props.space}/settings/backup`}
              icon={faDatabase}
              label="Backup and restore"
            />
          </>
        )}
      </div>
      <div className="side-content-mini__footer">
        <div className="side-content-mini__footer__left">
          {authorization.isAuth && (
            <button className="button" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}
          {!authorization.isAuth && (
            <button className="button" onClick={() => login('signin')}>
              <FontAwesomeIcon icon={faFingerprint} />
            </button>
          )}
        </div>
        <div className="side-content-mini__footer__right">
          <DarkModeIcon />
        </div>
        <button className="button" onClick={chooseCompany}>
          <FontAwesomeIcon icon={faTh} />
        </button>
        {/* <NavAccountIcon logout={logout} login={login} /> */}
      </div>
    </div>
  );
};

export default SideContentMini;
