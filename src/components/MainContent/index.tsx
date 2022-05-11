import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';

import Notification from '../Notification';
import NavigationContainer from '../App/NavigationContainer';
import BodyContainer from '../App/BodyContainer';
import SideContent from './SideContent';
import FileExplorer from '../FileExplorer';
import SideContentMini from './SideContentMini';
import DisableContextBarCommand from '../../events/DisableContextBarCommand';

interface Props {
  cookies: any;
  space: string;
}

const MainContent = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  const [disableContextBar, setDisableContextBar] = useState(false);

  useEffect(() => {
    DisableContextBarCommand.asObservable().subscribe((message) => {
      setDisableContextBar(message);
    });
  }, []);

  return (
    <>
      <SideContentMini cookies={props.cookies} space={props.space} />
      <SideContent cookies={props.cookies} space={props.space} />
      {/* <FileExplorer space={props.space} /> */}
      {/* <NavigationContainer
        cookies={props.cookies}
        space={props.space}
        transparent={false}
      /> */}
      <div
        className={`main-content ${
          profile.sidebar
            ? 'main-content__sidebar-active'
            : 'main-content__sidebar-inactive'
        } ${
          profile.contextbar
            ? 'main-content__contextbar-active'
            : 'main-content__contextbar-inactive'
        } ${
          disableContextBar
            ? 'main-content__contextbar-off'
            : 'main-content__contextbar-on'
        }`}
      >
        <BodyContainer {...props} />
      </div>
    </>
  );
};

export default MainContent;
