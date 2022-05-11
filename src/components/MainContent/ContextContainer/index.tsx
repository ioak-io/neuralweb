import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './style.scss';
import { removeAuth } from '../../../actions/AuthActions';
import { sendMessage } from '../../../events/MessageService';
import SideNavSubHeading from '../SideNavSubHeading';
import { setProfile } from '../../../actions/ProfileActions';
import ContextContent from '../ContextContent';
import ContextContentMini from '../ContextContentMini';

interface Props {
  children: any;
  space: string;
}

const ContextContainer = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  const toggleContextbar = () => {
    sessionStorage.setItem(
      'metamind_pref_contextbar_status',
      profile.contextbar ? 'collapsed' : 'expanded'
    );

    dispatch(setProfile({ ...profile, contextbar: !profile.contextbar }));
  };

  const chooseCompany = () => {
    history.push('/home');
  };

  return (
    <div>
      <ContextContent space={props.space}>{props.children}</ContextContent>
      <ContextContentMini space={props.space} />
    </div>
  );
};

export default ContextContainer;
