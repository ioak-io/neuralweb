import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import './style.scss';

import { Profile } from '../Types/GeneralTypes';
import { receiveMessage, sendMessage } from '../../events/MessageService';

import Header from './Header';
import NavElements from './NavElements';
import Portal from './Portal';
import DarkModeIcon from '../Navigation/DarkModeIcon';
import { faBalanceScaleRight, faCalendarAlt, faChartBar, faCircleNodes, faCogs, faCoins, faCopy, faDatabase, faFingerprint, faFolderOpen, faListUl, faMoneyBillWave, faPalette, faPlus, faReceipt, faSignOutAlt, faStrikethrough, faTags, faTh, faUserShield, faWallet } from '@fortawesome/free-solid-svg-icons';
import SideNavLink from '../MainContent/SideNavLink';
import SideNavSubHeading from '../MainContent/SideNavSubHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../Logo';
import { removeSessionValue } from '../../utils/SessionUtils';
import { removeAuth } from '../../store/actions/AuthActions';
import { useNavigate, useParams } from 'react-router-dom';

export type MobileSidebarProps = {
  isOpen: boolean;
  onClose: any;
}

const MobileSidebar = (props: MobileSidebarProps) => {

  const params = useParams();

  if (!props.isOpen) return null;
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (
    event: any,
    type = 'success',
    message = 'You have been logged out'
  ) => {
    dispatch(removeAuth());
    removeSessionValue(
      `neuralweb_${process.env.REACT_APP_ONEAUTH_APPSPACE_ID}`
    );
    navigate(`/`);
    sendMessage('notification', true, {
      type,
      message,
      duration: 3000,
    });
  };

  const login = (type: string) => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/realm/${process.env.REACT_APP_ONEAUTH_APPSPACE_ID}/login/${process.env.REACT_APP_ONEAUTH_API_KEY}`;
  };

  return (
    <Portal wrapperId='neuralweb-portal'>
      <div className="mobile-sidebar-overlay" onClick={props.onClose} />
      <div className="mobile-sidebar">
        <div className="side-content__header">
          <div className="side-content__header__logo">
            <Logo variant={profile.sidebar ? 'full' : 'short'} />
          </div>
        </div>
        <div className="side-content__menu">
          {params.space && (
            <>
              <SideNavSubHeading short="Notes" long="Notes" />
              <SideNavLink
                link={`/${params.space}/new-note`}
                icon={faPlus}
                label="New note"
              />
              <SideNavLink
                link={`/${params.space}/browse`}
                icon={faFolderOpen}
                label="Browse"
              />
              <SideNavLink
                link={`/${params.space}/graph`}
                icon={faCircleNodes}
                label="Graph"
              />
              <SideNavSubHeading short="System" long="System" />
              <SideNavLink
                link={`/${params.space}/color-filter`}
                icon={faPalette}
                label="Color filter"
              />
              <SideNavLink
                link={`/${params.space}/metadata-definition`}
                icon={faListUl}
                label="Metadata"
              />
              <SideNavLink
                link={`/${params.space}/stopwords`}
                icon={faStrikethrough}
                label="Stopwords"
              />
              <SideNavLink
                link={`/${params.space}/settings/company`}
                icon={faCogs}
                label="Company setting"
              />
              <SideNavLink
                link={`/${params.space}/settings/user`}
                icon={faUserShield}
                label="User"
              />
              <SideNavLink
                link={`/${params.space}/settings/backup`}
                icon={faDatabase}
                label="Backup and restore"
              />
            </>
          )}
        </div>
        <div className="side-content__footer">
          <div className="side-content__footer__left">
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
            {profile.sidebar && (
              <div>{`${authorization.given_name} ${authorization.family_name}`}</div>
            )}
          </div>
          <div className="side-content__footer__right">
            <DarkModeIcon />
          </div>
          {/* <NavAccountIcon logout={logout} login={login} /> */}
        </div>
      </div>
    </Portal>
  );
};

export default MobileSidebar;
