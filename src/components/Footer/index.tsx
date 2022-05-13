import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DisableContextBarCommand from '../../events/DisableContextBarCommand';
import { setProfile } from '../../actions/ProfileActions';
import './style.scss';

interface Props {
  children?: any;
}

const Footer = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const [disableContextBar, setDisableContextBar] = useState(false);

  useEffect(() => {
    DisableContextBarCommand.asObservable().subscribe((message) => {
      setDisableContextBar(message);
    });
  }, []);

  return (
    <div
      className={`footer ${
        profile.sidebar ? 'footer__sidebar-active' : 'footer__sidebar-inactive'
      } ${
        profile.contextbar
          ? 'footer__contextbar-active'
          : 'footer__contextbar-inactive'
      } ${
        disableContextBar ? 'footer__contextbar-off' : 'footer__contextbar-on'
      } bg-light-300 text-gray-900 dark:bg-dark-400 dark:text-gray-200`}
    >
      {props.children}
    </div>
  );
};

export default Footer;
