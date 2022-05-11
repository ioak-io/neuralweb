import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHamburger } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

import Logo from '../Logo';
import RightNav from './RightNav';
import { setProfile } from '../../actions/ProfileActions';
// import RightNav from '../Topbar/RightNav';

interface Props {
  space: string;
  cookies: any;
  //   location: any;
  //   match: any;
  hideSidebarOnDesktop?: boolean;
}

const Navbar = (props: Props) => {
  const history = useHistory();
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  const [currentpath, setCurrentpath] = useState('');

  useEffect(() => {
    history.listen((_history: any) => {
      if (_history?.location?.pathname) {
        setCurrentpath(_history.location.pathname);
      }
    });
  }, []);

  const toggleSidebar = () => {
    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <div>
          <button className="button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {/* <div>
          <Logo />
        </div> */}

        <div className="navbar__left__links">
          {props.space && (
            <>
              <NavLink
                to={`/${props.space}/home`}
                className="navlink"
                activeClassName="navlink--active"
              >
                Home
              </NavLink>
              <NavLink
                to={`/${props.space}/expense`}
                className="navlink"
                activeClassName="navlink--active"
              >
                Expense
              </NavLink>
              <NavLink
                to={`/${props.space}/category`}
                className="navlink"
                activeClassName="navlink--active"
              >
                Category
              </NavLink>
              <NavLink
                to={`/${props.space}/report`}
                className="navlink"
                activeClassName="navlink--active"
              >
                Report
              </NavLink>
              <NavLink
                to={`/${props.space}/settings?link=general`}
                className="navlink"
                activeClassName="navlink--active"
              >
                Settings
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className="navbar--right">
        <RightNav cookies={props.cookies} />
      </div>
    </div>
  );
};

export default Navbar;
