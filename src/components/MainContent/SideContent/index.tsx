import {
  faBalanceScaleRight,
  faCalendarAlt,
  faChartArea,
  faChartBar,
  faCircleDot,
  faClone,
  faCog,
  faCogs,
  faCoins,
  faCopy,
  faDatabase,
  faFileExport,
  faFileImport,
  faFingerprint,
  faFolderOpen,
  faFolderPlus,
  faHome,
  faMagnifyingGlass,
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
  faThumbTack,
  faUniversity,
  faUserShield,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Subject } from 'rxjs';
import DarkModeIcon from '../../../components/Navigation/DarkModeIcon';
import NavAccountIcon from '../../../components/Navigation/NavAccountIcon';
import Logo from '../../../components/Logo';
import SideNavLink from '../SideNavLink';

import './style.scss';
import { removeAuth } from '../../../actions/AuthActions';
import { sendMessage } from '../../../events/MessageService';
import SideNavSubHeading from '../SideNavSubHeading';
import FileExplorer from '../../../components/FileExplorer';
import FilterExplorer from '../../../components/FilterExplorer';

const queryString = require('query-string');

interface Props {
  cookies: any;
  space: string;
}

const SideContent = (props: Props) => {
  const location = useLocation();
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const [queryParam, setQueryParam] = useState({
    id: '',
  });
  const [view, setView] = useState<'file' | 'search' | 'pin'>('file');
  const [addFolderCommand, setAddFolderCommand] = useState(0);
  const [locateFolderCommand, setLocateFolderCommand] = useState(0);

  useEffect(() => {
    const queryParam = queryString.parse(location.search);
    setQueryParam(queryParam);
  }, [location]);

  const logout = (
    event: any,
    type = 'success',
    message = 'You have been logged out'
  ) => {
    dispatch(removeAuth());
    props.cookies.remove(
      `metamind_${process.env.REACT_APP_ONEAUTH_APPSPACE_ID}`
    );
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

  const handleAddFolder = () => {
    setAddFolderCommand(addFolderCommand + 1);
  };

  const handleLocateFolder = () => {
    setLocateFolderCommand(locateFolderCommand + 1);
  };

  const changeToFileView = () => {
    setAddFolderCommand(0);
    setLocateFolderCommand(0);
    setView('file');
  };

  return (
    <div
      className={`side-content ${
        profile.sidebar
          ? 'side-content__sidebar-active'
          : 'side-content__sidebar-inactive'
      } bg-light-300 dark:bg-dark-400`}
    >
      <div className="side-content__header">
        <div className="side-content__header__left">
          <button
            className={`button ${view === 'file' ? 'active' : ''}`}
            onClick={changeToFileView}
          >
            <FontAwesomeIcon icon={faFolderOpen} />
          </button>
          <button
            className={`button ${view === 'search' ? 'active' : ''}`}
            onClick={() => setView('search')}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button
            className={`button ${view === 'pin' ? 'active' : ''}`}
            onClick={() => setView('pin')}
          >
            <FontAwesomeIcon icon={faThumbTack} />
          </button>
        </div>
        {view === 'file' && (
          <div className="side-content__header__right">
            <button className="button" onClick={handleLocateFolder}>
              <FontAwesomeIcon icon={faCircleDot} />
            </button>
            <button className="button" onClick={handleAddFolder}>
              <FontAwesomeIcon icon={faFolderPlus} />
            </button>
          </div>
        )}
      </div>
      <div className="side-content__body">
        {view === 'search' && (
          <FilterExplorer space={props.space} selectedNoteId={queryParam?.id} />
        )}
        {view === 'file' && (
          <FileExplorer
            space={props.space}
            selectedNoteId={queryParam?.id}
            addFolderCommand={addFolderCommand}
            locateFolderCommand={locateFolderCommand}
          />
        )}
      </div>
    </div>
  );
};

export default SideContent;
