import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.scss";
import Logo from "./Logo";
import { setSessionValue } from "../../../utils/SessionUtils";
import {
  AuthliteComponents,
  AuthliteTypes,
  AuthliteAuthenticationService,
} from "authlite-form-widgets";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndSetCompanyItems } from "../../../store/actions/CompanyActions";
import { isEmptyOrSpaces } from "../../../components/Utils";
import {
  ValidateConfirmEmailLinkRequest,
  ValidateConfirmEmailLinkResponse,
} from "authlite-form-widgets/components/types";

interface Props {
  view?: string;
}

const appRealm = process.env.REACT_APP_ONEAUTH_APPSPACE_ID || "";
const environment: any = process.env.REACT_APP_ENVIRONMENT || "local";
const emailConfirmationPageLink: any =
  process.env.REACT_APP_REDIRECT_CONFIRM_EMAIL || undefined;

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const authorization = useSelector((state: any) => state.authorization);

  const [view, setView] = useState<AuthliteTypes.PageView>(
    AuthliteTypes.PageView.signin
  );
  const [successPage, setSuccessPage] = useState<
    | "signin"
    | "signup"
    | "resetpassword"
    | "resendverifylink"
    | "confirmemail"
    | null
  >(null);
  const [forgotPasswordFormErrorMessages, setForgotPasswordFormErrorMessages] =
    useState<AuthliteTypes.ForgotPasswordFormErrorMessages>({});
  const [
    resendVerifyLinkFormErrorMessages,
    setResendVerifyLinkFormErrorMessages,
  ] = useState<AuthliteTypes.ResendVerifyLinkFormErrorMessages>({});
  const [signinFormErrorMessages, setSigninFormErrorMessages] =
    useState<AuthliteTypes.SigninFormErrorMessages>({});
  const [signupFormErrorMessages, setSignupFormErrorMessages] =
    useState<AuthliteTypes.SignupFormErrorMessages>({});
  const [
    validateConfirmEmailLinkMessages,
    setValidateConfirmEmailLinkMessages,
  ] = useState<AuthliteTypes.ValidateConfirmEmailLinkMessages>({});

  const onSignin = (payload: AuthliteTypes.SigninRequest) => {
    AuthliteAuthenticationService.signin(environment, appRealm, payload).then(
      (response: AuthliteTypes.SigninResponse) => {
        console.log(response);
        setSigninFormErrorMessages(response.errorMessages);
        if (response.outcome === "SUCCESS") {
          setSessionValue(`neuralweb-access_token`, response.data.access_token);
          setSessionValue(
            `neuralweb-refresh_token`,
            response.data.refresh_token
          );
          navigate(searchParams.get("from") || "/home");
          dispatch(fetchAndSetCompanyItems(authorization));
        }
      }
    );
  };

  const onSignup = (data: AuthliteTypes.SignupRequest) => {
    AuthliteAuthenticationService.signup(
      environment,
      appRealm,
      data,
      "78b4e61d-de91-4700-9404-3a9a0924ba8a"
    ).then((response: AuthliteTypes.SignupResponse) => {
      console.log(response);
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("signup");
      }
      setSignupFormErrorMessages(response.errorMessages);
    });
  };

  const onForgotPassword = (data: AuthliteTypes.SignupRequest) => {
    AuthliteAuthenticationService.resetPasswordLink(
      environment,
      appRealm,
      data
    ).then((response: AuthliteTypes.ForgotPasswordResponse) => {
      console.log(response);
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("resetpassword");
      }
      setForgotPasswordFormErrorMessages(response.errorMessages);
    });
  };

  const onResendVerifyLink = (data: AuthliteTypes.ResendVerifyLinkRequest) => {
    AuthliteAuthenticationService.resendVerifyLink(
      environment,
      appRealm,
      data,
      emailConfirmationPageLink
    ).then((response: AuthliteTypes.ResendVerifyLinkResponse) => {
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("resendverifylink");
      }
      setResendVerifyLinkFormErrorMessages(response.errorMessages);
    });
  };

  const onValidateConfirmEmailLink = (
    data: ValidateConfirmEmailLinkRequest
  ) => {
    AuthliteAuthenticationService.confirmEmailLink(
      environment,
      appRealm,
      data
    ).then((response: ValidateConfirmEmailLinkResponse) => {
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("confirmemail");
      }
      setValidateConfirmEmailLinkMessages(response.errorMessages);
    });
  };

  const clearErrorMessages = () => {
    setSigninFormErrorMessages({});
    setSignupFormErrorMessages({});
  };

  useEffect(() => {
    if (!isEmptyOrSpaces(props.view)) {
      setView(getPageViewTypeFromString(props.view));
    }
  }, [props.view]);

  const getPageViewTypeFromString = (
    pageViewString?: string
  ): AuthliteTypes.PageView => {
    switch (pageViewString) {
      case "confirmemail":
        return AuthliteTypes.PageView.confirmemail;
      default:
        return AuthliteTypes.PageView.signin;
    }
  };

  return (
    <AuthliteComponents.Login
      onSignin={onSignin}
      onSignup={onSignup}
      onForgotPassword={onForgotPassword}
      onResendVerifyLink={onResendVerifyLink}
      signinFormErrorMessages={signinFormErrorMessages}
      signupFormErrorMessages={signupFormErrorMessages}
      forgotPasswordFormErrorMessages={forgotPasswordFormErrorMessages}
      resendVerifyLinkFormErrorMessages={resendVerifyLinkFormErrorMessages}
      onValidateConfirmEmailLink={onValidateConfirmEmailLink}
      validateConfirmEmailLinkMessages={validateConfirmEmailLinkMessages}
      clearErrorMessages={clearErrorMessages}
      view={view}
      changeView={setView}
      code={searchParams?.get("code") || ""}
    >
      <AuthliteComponents.Logo>
        <Logo variant="full" />
      </AuthliteComponents.Logo>
      <AuthliteComponents.Placeholder>
        {successPage === "signin" && (
          <AuthliteComponents.InfoPage heading="Authentication successful!">
            <AuthliteComponents.InfoPageDescription>
              Posuere ipsum tellus ornare rutrumaliquam torquent fermentum
              euismod musvestibulum tincidunt cursus quisque elitsuspendisse
              augue. rutrumaliquam commodo{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              parturient rutrumaliquam nec varius sociosqu.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Commodo nullam et facilisis hendrerit pharetra platea duis commodo
              nascetur libero aptent
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
        {successPage === "signup" && (
          <AuthliteComponents.InfoPage heading="User account created!">
            <AuthliteComponents.InfoPageDescription>
              Gravida dolor suscipit urna sagittis per{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              parturient eu. laoreet congue fermentum ipsum tincidunt elementum
              auctor aptent aliquam feugiat interdum. porta sem metus convallis
              donec nam sodales.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
        {successPage === "resetpassword" && (
          <AuthliteComponents.InfoPage heading="Password reset link sent!">
            <AuthliteComponents.InfoPageDescription>
              Gravida dolor suscipit urna sagittis per{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              parturient eu. laoreet congue fermentum ipsum tincidunt elementum
              auctor aptent aliquam feugiat interdum. porta sem metus convallis
              donec nam sodales.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
        {successPage === "resendverifylink" && (
          <AuthliteComponents.InfoPage heading="Email confirmation link sent!">
            <AuthliteComponents.InfoPageDescription>
              Please check your email for{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              parturient eu. laoreet congue fermentum ipsum tincidunt elementum
              auctor aptent aliquam feugiat interdum. porta sem metus convallis
              donec nam sodales.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
        {successPage === "confirmemail" && (
          <AuthliteComponents.InfoPage heading="Email account verified!">
            <AuthliteComponents.InfoPageDescription>
              Your email is verified and the account setup process is complete.
              You can{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              to your account.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
      </AuthliteComponents.Placeholder>
    </AuthliteComponents.Login>
  );
};

export default LoginPage;
