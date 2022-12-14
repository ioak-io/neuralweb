import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import { fetchAndSetCompanyItems } from '../../actions/CompanyActions';
import { fetchAndSetUserItems } from '../../actions/UserActions';
import { setProfile } from '../../actions/ProfileActions';
import IncomeStateActions from '../../simplestates/IncomeStateActions';
import { fetchAndSetFolderItems } from '../../actions/FolderActions';
import { fetchAndSetNoteItems } from '../../actions/NoteActions';
import { fetchAndSetTagItems } from '../../actions/TagActions';

const Init = () => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const [previousAuthorizationState, setPreviousAuthorizationState] =
    useState<any>();
  const [space, setSpace] = useState<string>();
  const [previousSpace, setPreviousSpace] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authorization?.isAuth && space) {
      //  && !previousAuthorizationState?.isAuth) {
      initialize();
      dispatch(fetchAndSetUserItems(space, authorization));
      dispatch(fetchAndSetFolderItems(space, authorization));
      dispatch(fetchAndSetNoteItems(space, authorization));
      dispatch(fetchAndSetTagItems(space, authorization));
    }
  }, [authorization, space]);

  useEffect(() => {
    if (authorization?.isAuth && !previousAuthorizationState?.isAuth) {
      dispatch(fetchAndSetCompanyItems(authorization));
      setPreviousAuthorizationState(authorization);
    }
  }, [authorization]);

  useEffect(() => {
    if (space && previousSpace !== space) {
      setPreviousSpace(space);
    }
  }, [space]);

  useEffect(() => {
    initializeProfileFromSession();
    receiveMessage().subscribe((event: any) => {
      console.log(event);
      if (event.name === 'spaceChange') {
        setSpace(event.data);
      }
      if (event.name === 'spaceChange' && authorization.isAuth) {
        initialize();
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log('profile.theme');
  //   if (profile.theme === 'theme_light') {
  //     document.body.style.backgroundColor = 'var(--color-global-lightmode)';
  //   } else {
  //     document.body.style.backgroundColor = 'var(--color-global-darkmode)';
  //   }
  // }, [profile.theme]);

  useEffect(() => {
    if (profile.theme === 'theme_light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [profile.theme]);

  const initialize = () => {
    console.log('Initialization logic here');
    if (space) {
      // dispatch(fetchAllCategories(space, authorization));
    }
  };

  const initializeProfileFromSession = () => {
    const colorMode = sessionStorage.getItem('neuralweb_pref_profile_colormode');
    const sidebarStatus = sessionStorage.getItem(
      'neuralweb_pref_sidebar_status'
    );

    if (colorMode || sidebarStatus) {
      dispatch(
        setProfile({
          theme: colorMode || 'theme_dark',
          sidebar: sidebarStatus === 'expanded',
        })
      );
    }
  };

  return (
    <>
      <IncomeStateActions space={space} />
    </>
  );
};

export default Init;
