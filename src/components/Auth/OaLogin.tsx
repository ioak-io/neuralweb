import React, { useEffect } from 'react';
import { httpGet, httpPost } from '../Lib/RestTemplate';
import './Login.scss';

const queryString = require('query-string');

interface Props {
  cookies: any;
  history: any;
  location: any;
}

const appRealm = process.env.REACT_APP_ONEAUTH_APPSPACE_ID || '';

const OaLogin = (props: Props) => {
  useEffect(() => {
    if (props.location.search) {
      const query = queryString.parse(props.location.search);
      httpGet('/user/token/local', {
        headers: {
          Authorization: query.access_token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            console.log('**', response.data.token);
            props.cookies.set(`metamind-access_token`, response.data.token);
            props.cookies.set(`metamind-refresh_token`, query.refresh_token);
            props.history.push(query.from ? query.from : '/home');
          }
          return Promise.resolve({});
        })
        .catch((error) => {
          return Promise.resolve({});
        });
    }
  }, []);

  return <></>;
};

export default OaLogin;
