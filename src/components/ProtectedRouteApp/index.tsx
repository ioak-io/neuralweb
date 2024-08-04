import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  getSessionValue,
  removeSessionValue,
  setSessionValue,
} from "../../utils/SessionUtils";
import { sendMessage } from "../../events/MessageService";
import { addAuth } from "../../store/actions/AuthActions";
import { httpGet, httpPost } from "../Lib/RestTemplate";

interface Props {
  middleware: string[];
  redirectPath?: string;
  children?: any;
  component?: any;
  additionalProps?: any;
}

const appRealm = process.env.REACT_APP_ONEAUTH_APPSPACE_ID || "";

const ProtectedRouteApp = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const dispatch: any = useDispatch();
  const params = useParams();
  const navigate: any = useNavigate();

  const applyMiddlewares = () => {
    props.middleware?.forEach((middlewareName) => {
      if (!applyMidleware(middlewareName)) {
        return false;
      }
    });
    return true;
  };

  const applyMidleware = (middlewareName: string) => {
    sendMessage("spaceChange", true, "");
    // sendMessage('realmChange', true, '');
    switch (middlewareName) {
      case "readAuthentication":
        return readAuthenticationSpace();
      case "authenticate":
        return authenticateSpace();
      case "isAdmin":
        return isAdmin();
      default:
        return true;
    }
  };

  const authenticateSpace = () => {
    return authenticate("space");
  };
  const readAuthenticationSpace = () => {
    return authenticate("space", false);
  };
  const readSpace = () => {
    sendMessage("spaceChange", true, params.space);
  };

  const authenticate = async (type: string, redirect = true) => {
    sendMessage("spaceChange", true, params.space);
    if (authorization.isAuth) {
      if (
        params.space &&
        (!authorization.permissions ||
          !authorization.permissions["COMPANY_ADMIN"] ||
          !authorization.permissions["COMPANY_ADMIN"].includes(params.space))
      ) {
        console.log("**redirect to unauthorized page", params.space);
        redirectToUnauthorized();
        return false;
      }
      return true;
    }
    const accessToken = getSessionValue(`neuralweb-access_token`);
    const refreshToken = getSessionValue(`neuralweb-refresh_token`);
    if (accessToken && refreshToken) {
      httpPost(
        `/${appRealm}/user/auth/token`,
        { grant_type: "refresh_token", refresh_token: refreshToken },
        null,
        process.env.REACT_APP_ONEAUTH_API_URL
      )
        .then((response: any) => {
          if (response.status === 200) {
            let newAccessToken = accessToken;
            if (response.data?.access_token) {
              newAccessToken = response.data.access_token;
              setSessionValue(`neuralweb-access_token`, newAccessToken);
            }
            dispatch(
              addAuth({
                isAuth: true,
                ...response.data.claims,
                access_token: newAccessToken,
                refresh_token: refreshToken,
                space: response.data.space,
              })
            );
            return true;
          }
        })
        .catch((error: any) => {
          removeSessionValue(`neuralweb-access_token`);
          removeSessionValue(`neuralweb-refresh_token`);
          redirectToLogin(appRealm);
        });
    } else if (redirect) {
      redirectToLogin(appRealm);
    } else {
      return true;
    }
  };

  const isAdmin = () => {
    redirectToUnauthorized();
    return false;
  };

  const redirectToLogin = (space: string) => {
    // window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/realm/${appRealm}/login/${process.env.REACT_APP_ONEAUTH_API_KEY}`;
    navigate(`/login`);
  };

  const redirectToUnauthorized = () => {
    navigate(`/${params.space}/unauthorized`);
  };

  if (!applyMiddlewares()) {
    return <Navigate to={props.redirectPath || "/landing"} replace />;
  }

  if (props.children) {
    return React.cloneElement(props.children, { ...params });
  } else {
    return <props.component {...(props.additionalProps || {})} {...params} />;
  }
};

export default ProtectedRouteApp;
