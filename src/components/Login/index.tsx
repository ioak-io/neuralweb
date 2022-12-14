import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import LoginMethod from './LoginMethod';

interface Props {
  history: any;
  match: any;
  params: string;
  asset: string;
  location: any;
}

const queryString = require('query-string');

const Login = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const [from, setFrom] = useState<string | undefined>();
  const oaLogin = () => {
    props.history.push(
      `/${props.asset}/login/oa${from ? `?from=${from}` : ''}`
    );
  };
  const emailLogin = () => {
    props.history.push(
      `/${props.asset}/login/email${from ? `?from=${from}` : ''}`
    );
  };

  const neuralwebLogin = () => {
    console.log('not yet implemented');
  };

  useEffect(() => {
    if (authorization.isAuth) {
      props.history.push(`/${props.asset}/article`);
    }
  }, [authorization]);

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    query.from ? setFrom(query.from) : setFrom(undefined);
  }, [props.location.search]);

  return (
    <div>
      Sign in
      <br />
      Choose the preferred authentication method to continue
      <div className="view-asset-item">
        <div className="space-top-3 neuralweb-signin">
          <div className="login-home">
            <LoginMethod
              action={oaLogin}
              icon="corporate_fare"
              label="Enterprise Login"
            />
            <LoginMethod
              action={neuralwebLogin}
              icon="people"
              label="Individual Login"
            />
            <LoginMethod
              action={emailLogin}
              icon="email"
              label="OTP via Email"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
