import {
  faBalanceScaleRight,
  faCalendarAlt,
  faChartArea,
  faChartBar,
  faClone,
  faCog,
  faCogs,
  faCoins,
  faCopy,
  faDatabase,
  faFileExport,
  faFileImport,
  faFingerprint,
  faHome,
  faMoneyBillWave,
  faMoneyBillWaveAlt,
  faReceipt,
  faShoppingBag,
  faShoppingCart,
  faSignOutAlt,
  faTable,
  faTag,
  faTags,
  faTh,
  faThLarge,
  faUniversity,
  faUserShield,
  faWallet,
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
import FileExplorer from '../../../components/FileExplorer';

interface Props {
  space: string;
  children: any;
}

const ContextContent = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  return (
    <div
      className={`context-content ${
        profile.contextbar
          ? 'context-content__contextbar-active'
          : 'context-content__contextbar-inactive'
      } bg-light-300 dark:bg-dark-400`}
    >
      {props.children}
    </div>
  );
};

export default ContextContent;
