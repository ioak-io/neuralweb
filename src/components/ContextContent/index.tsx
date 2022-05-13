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

import './style.scss';

interface Props {
  space: string;
  children: any;
  isExpanded: boolean;
}

const ContextContent = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  return (
    <div
      className={`context-content ${
        props.isExpanded
          ? 'context-content--active'
          : 'context-content--inactive'
      } bg-light-300 dark:bg-dark-400`}
    >
      {props.children}
    </div>
  );
};

export default ContextContent;
