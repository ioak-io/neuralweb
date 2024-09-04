import React, { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import "./RouterView.scss";
import Home from "../Home";
import { loginPageSubject } from "../../events/LoginPageEvent";
import ProtectedRouteApp from "../ProtectedRouteApp";
import LandingPage from "../Page/LandingPage";
import OaLogin from "../Auth/OaLogin";
import EditCompanyPage from "../Page/EditCompanyPage";
import UnauthorizedPage from "../Page/UnauthorizedPage";
import ExpensePage from "../Page/ExpensePage";
import EditCompany from "../Page/SettingsPage/EditCompany";
import Permissions from "../Page/SettingsPage/Permissions";
import BackupAndRestore from "../Page/SettingsPage/BackupAndRestore";
import GraphPage from "../Page/GraphPage";
import NotePage from "../Page/NotePage";
import MetadataDefinitionPage from "../Page/MetadataDefinitionPage";
import IndexPage from "../Page/IndexPage";
import NewNotePage from "../Page/NewNotePage";
import ColorfilterPage from "../Page/ColorfilterPage";
import EditColorFilterPage from "../Page/EditColorfilterPage";
import StopwordsPage from "../Page/StopwordsPage";
import LoginPage from "../Page/LoginPage";
import SearchPage from "../Page/SearchPage";
import BrowseByGroupPage from "../Page/BrowseByGroupPage";
import LibraryPage from "../Page/LibraryPage";
import BrowsePage from "../Page/BrowsePage";
import BookChapterPage from "../Page/BookChapterPage";
import ChapterPage from "../Page/ChapterPage";
import BookConceptPage from "../Page/BookConceptPage";
import ConceptPage from "../Page/ConceptPage";

interface Props {}

const RouterView = (props: Props) => {
  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => {
    loginPageSubject.subscribe((message) => {
      setLoginPage(message.state);
    });
  }, []);

  return (
    <div
      className={`router-view ${
        loginPage ? "on-login-page" : "not-on-login-page"
      }`}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={LandingPage}
            />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={LandingPage}
            />
          }
        />
        <Route
          path="/login"
          element={<ProtectedRouteApp middleware={[]} component={LoginPage} />}
        />
        <Route
          path="/confirm-email"
          element={
            <ProtectedRouteApp
              middleware={[]}
              component={LoginPage}
              additionalProps={{ view: "confirmemail" }}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteApp
              middleware={[]}
              component={LoginPage}
              additionalProps={{ view: "resetpassword" }}
            />
          }
        />
        <Route
          path="/company/edit"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={EditCompanyPage}
            />
          }
        />
        <Route
          path="/:space/unauthorized"
          element={
            <ProtectedRouteApp
              middleware={["isAuthenticated"]}
              component={UnauthorizedPage}
            />
          }
        />
        <Route
          path="/:space/home"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={ExpensePage}
            />
          }
        />
        <Route
          path="/:space/new-note"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={NewNotePage}
            />
          }
        />
        <Route
          path="/:space/note/:id"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={NotePage}
            />
          }
        />
        <Route
          path="/:space/index"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={IndexPage}
            />
          }
        />
        <Route
          path="/:space/browse"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={BrowsePage}
            />
          }
        />
        <Route
          path="/:space/library"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={LibraryPage}
            />
          }
        />
        <Route
          path="/:space/book/:bookref/chapter"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={BookChapterPage}
            />
          }
        />
        <Route
          path="/:space/book/:bookref/chapter/:chapterref"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={ChapterPage}
            />
          }
        />
        <Route
          path="/:space/book/:bookref/concept"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={BookConceptPage}
            />
          }
        />
        <Route
          path="/:space/book/:bookref/concept/:conceptref"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={ConceptPage}
            />
          }
        />
        <Route
          path="/:space/browse/:group"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={BrowseByGroupPage}
            />
          }
        />
        <Route
          path="/:space/search"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={SearchPage}
            />
          }
        />
        <Route
          path="/:space/graph"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={GraphPage}
            />
          }
        />
        <Route
          path="/:space/metadata-definition"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={MetadataDefinitionPage}
            />
          }
        />
        <Route
          path="/:space/color-filter"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={ColorfilterPage}
            />
          }
        />
        <Route
          path="/:space/color-filter/:id"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={EditColorFilterPage}
            />
          }
        />
        <Route
          path="/:space/stopwords"
          element={
            <ProtectedRouteApp
              middleware={["readAuthentication"]}
              component={StopwordsPage}
            />
          }
        />
        <Route
          path="/:space/settings/company"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={EditCompany}
            />
          }
        />
        <Route
          path="/:space/settings/user"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={Permissions}
            />
          }
        />
        <Route
          path="/:space/settings/backup"
          element={
            <ProtectedRouteApp
              middleware={["authenticate"]}
              component={BackupAndRestore}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default RouterView;
