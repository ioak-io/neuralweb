import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import ExpenseStateActions from '../../simplestates/ExpenseStateActions';
import { fetchAndSetCompanyItems } from '../../store/actions/CompanyActions';
import { fetchAndSetUserItems } from '../../store/actions/UserActions';
import { setProfile } from '../../store/actions/ProfileActions';
import ReceiptStateActions from '../../simplestates/ReceiptStateActions';
import IncomeStateActions from '../../simplestates/IncomeStateActions';
import { fetchAndSetNoteItems } from '../../store/actions/NoteActions';
import { fetchAndSetLabelItems } from '../../store/actions/LabelActions';
import { fetchAndSetMetadataDefinitionItems } from '../../store/actions/MetadataDefinitionActions';
import { fetchAndSetMetadataValueItems } from '../../store/actions/MetadataValueActions';
import { fetchAndSetNotelinkItems } from '../../store/actions/NotelinkActions';
import { fetchAndSetNotelinkAutoItems } from '../../store/actions/NotelinkAutoActions';
import { fetchAndSetColorfilterItems } from '../../store/actions/ColorfilterActions';

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
      initializeHttpInterceptor();
      dispatch(fetchAndSetUserItems(space, authorization));
      dispatch(fetchAndSetNoteItems(space, authorization));
      dispatch(fetchAndSetNotelinkItems(space, authorization));
      dispatch(fetchAndSetNotelinkAutoItems(space, authorization));
      dispatch(fetchAndSetLabelItems(space, authorization));
      dispatch(fetchAndSetMetadataDefinitionItems(space, authorization));
      dispatch(fetchAndSetMetadataValueItems(space, authorization));
      dispatch(fetchAndSetColorfilterItems(space, authorization));
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
      if (event.name === 'spaceChange') {
        // TODO
        setSpace(event.data);
      }
      if (event.name === 'spaceChange' && authorization.isAuth) {
        setSpace(event.data);
        initialize();
        initializeHttpInterceptor();
      }
    });
  }, []);

  // useEffect(() => {
  //   document.body.addEventListener('mousedown', () => {
  //     sendMessage('usingMouse', true);
  //   });

  //   // Re-enable focus styling when Tab is pressed
  //   document.body.addEventListener('keydown', (event: any) => {
  //     if (event.keyCode === 9) {
  //       sendMessage('usingMouse', false);
  //     }
  //   });
  // }, [profile]);

  useEffect(() => {
    if (profile.theme === 'basicui-light') {
      document.body.classList.add("basicui-light");
      document.body.classList.add("writeup-light");
      document.body.classList.remove("basicui-dark");
      document.body.classList.remove("writeup-dark");
      // document.body.style.backgroundColor = 'var(--theme-white-50)';
    } else {
      document.body.classList.add("basicui-dark");
      document.body.classList.add("writeup-dark");
      document.body.classList.remove("basicui-light");
      document.body.classList.remove("writeup-light");
      // document.body.style.backgroundColor = 'var(--theme-black-800)';
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
    const sidebarStatus = sessionStorage.getItem('neuralweb_pref_sidebar_status');

    if (colorMode || sidebarStatus) {
      dispatch(
        setProfile({
          theme: colorMode || 'basicui-dark basicui-dark',
          sidebar: sidebarStatus === 'expanded',
        })
      );
    }
  };

  const initializeHttpInterceptor = () => {
    console.log('HTTP Interceptor initialization');
    // TODO
    // axiosInstance.defaults.headers.authorization = authorization.access_token;
    // axiosInstance.interceptors.response.use(
    //   (response) => {
    //     return response;
    //   },
    //   (error) => {
    //     if (error.response.status !== 401) {
    //       return new Promise((resolve, reject) => {
    //         reject(error);
    //       });
    //     }
    //     httpPost(
    //       '/auth/token',
    //       {
    //         refresh_token: authorization.refresh_token,
    //         grant_type: 'refresh_token',
    //         realm: realm || 100,
    //       },
    //       null
    //     )
    //       .then((response) => {
    //         if (response.status === 200) {
    //           axiosInstance.defaults.headers.authorization =
    //             response.data.access_token;
    //           setSessionValue(
    //             `neuralweb-access_token`,
    //             response.data.access_token
    //           );
    //           dispatch(
    //             addAuth({
    //               ...authorization,
    //               access_token: response.data.access_token,
    //             })
    //           );
    //           if (!error.config._retry) {
    //             error.config._retry = true;
    //             error.config.headers.authorization = response.data.access_token;
    //             return axiosInstance(error.config);
    //           }
    //         } else {
    //           console.log('********redirect to login');
    //         }
    //       })
    //       .catch((error) => {
    //         Promise.reject(error);
    //       });
    //   }
    // );
  };

  return (
    <>
      <ExpenseStateActions space={space} />
      <ReceiptStateActions space={space} />
      <IncomeStateActions space={space} />
    </>
  );
};

export default Init;
