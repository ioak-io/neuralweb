import React from 'react';

import { Route } from 'react-router-dom';
import './RouterView.scss';
import OaLogin from '../Auth/OaLogin';
import OakRouteApp from '../Auth/OakRouteApp';
import OakRouteGraph from '../Auth/OakRouteGraph';
import Login from '../Login';
import ExternLogin from '../Auth/ExternLogin';
import OneAuth from '../Login/OneAuth';
import LandingPage from '../Page/LandingPage';
import EditCompanyPage from '../Page/EditCompanyPage';
import SettingsPage from '../Page/SettingsPage';
import UnauthorizedPage from '../Page/UnauthorizedPage';
import NotePage from '../Page/NotePage';
import EditCompany from '../Page/SettingsPage/EditCompany';
import Permissions from '../Page/SettingsPage/Permissions';
import BackupAndRestore from '../Page/SettingsPage/BackupAndRestore';
import GraphPage from '../Page/GraphPage';
import SearchPage from '../Page/SearchPage';

interface Props {
  cookies: any;
}

const RouterView = (props: Props) => {
  return (
    <div className="router-view">
      <Route
        path="/login"
        render={(propsLocal) => (
          <OakRouteApp {...propsLocal} {...props} component={OaLogin} />
        )}
      />
      <Route
        path="/home"
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={LandingPage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/company/edit"
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={EditCompanyPage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/unauthorized"
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={UnauthorizedPage}
            middleware={['isAuthenticated']}
          />
        )}
      />
      <Route
        path="/"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={LandingPage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/graph"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={GraphPage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/search"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={SearchPage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/note"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={NotePage}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/settings/company"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={EditCompany}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/settings/user"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={Permissions}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/settings/backup"
        exact
        render={(propsLocal) => (
          <OakRouteApp
            {...propsLocal}
            {...props}
            component={BackupAndRestore}
            middleware={['authenticate']}
          />
        )}
      />
    </div>
  );
};

export default RouterView;
