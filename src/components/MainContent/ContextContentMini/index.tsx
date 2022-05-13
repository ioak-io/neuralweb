import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';
import { setProfile } from '../../../actions/ProfileActions';

interface Props {
  space: string;
}

const ContextContentMini = (props: Props) => {
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

  return (
    <div
      className={`context-content-mini ${
        profile.contextbar
          ? 'bg-light-400 dark:bg-dark-500'
          : 'bg-light-300 dark:bg-dark-400'
      }`}
    >
      <div className="context-content-mini__header">
        <div className="context-content-mini__header__button" />
      </div>
      <div className="context-content-mini__control">
        <button className="button" onClick={toggleContextbar}>
          {profile.contextbar && <FontAwesomeIcon icon={faChevronRight} />}
          {!profile.contextbar && <FontAwesomeIcon icon={faChevronLeft} />}
        </button>
      </div>
      <div className="context-content-mini__menu" />
    </div>
  );
};

export default ContextContentMini;
