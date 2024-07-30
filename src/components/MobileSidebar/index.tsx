import React, { useEffect, useState } from "react";
import { useSelector, connect, useDispatch } from "react-redux";

import "./style.scss";

import { Profile } from "../Types/GeneralTypes";
import { receiveMessage, sendMessage } from "../../events/MessageService";

import Header from "./Header";
import NavElements from "./NavElements";
import Portal from "./Portal";
import DarkModeIcon from "../Navigation/DarkModeIcon";
import {
  faBalanceScaleRight,
  faCalendarAlt,
  faChartBar,
  faCircleNodes,
  faCogs,
  faCoins,
  faCopy,
  faDatabase,
  faFingerprint,
  faFolderOpen,
  faListUl,
  faMoneyBillWave,
  faPalette,
  faPlus,
  faPuzzlePiece,
  faReceipt,
  faSearch,
  faSignOutAlt,
  faStrikethrough,
  faTags,
  faTh,
  faUserShield,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import SideNavLink from "../MainContent/SideNavLink";
import SideNavSubHeading from "../MainContent/SideNavSubHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../Logo";
import { removeSessionValue } from "../../utils/SessionUtils";
import { removeAuth } from "../../store/actions/AuthActions";
import { useNavigate, useParams } from "react-router-dom";

export type MobileSidebarProps = {
  space?: string;
};

const MobileSidebar = (props: MobileSidebarProps) => {
  const params = useParams();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (
    event: any,
    type = "success",
    message = "You have been logged out"
  ) => {
    dispatch(removeAuth());
    removeSessionValue(`neuralweb-access_token`);
    removeSessionValue(`neuralweb-refresh_token`);
    navigate(`/`);
  };

  const login = (type: string) => {
    navigate("/login");
  };

  return (
    <div className="side-content__menu">
      {props.space && (
        <>
          <SideNavSubHeading short="Notes" long="Notes" />
          <SideNavLink
            link={`/${props.space}/new-note`}
            icon={faPlus}
            label="New note"
          />
          <SideNavLink
            link={`/${props.space}/browse`}
            icon={faFolderOpen}
            label="Browse"
          />
          <SideNavLink
            link={`/${props.space}/search`}
            icon={faSearch}
            label="Search"
          />
          <SideNavLink
            link={`/${props.space}/fleeting-notes`}
            icon={faPuzzlePiece}
            label="Fleeting notes"
          />
          <SideNavLink
            link={`/${props.space}/graph`}
            icon={faCircleNodes}
            label="Graph"
          />
          <SideNavSubHeading short="System" long="System" />
          <SideNavLink
            link={`/${props.space}/color-filter`}
            icon={faPalette}
            label="Color filter"
          />
          <SideNavLink
            link={`/${props.space}/metadata-definition`}
            icon={faListUl}
            label="Metadata"
          />
          <SideNavLink
            link={`/${props.space}/stopwords`}
            icon={faStrikethrough}
            label="Stopwords"
          />
          <SideNavLink
            link={`/${props.space}/settings/company`}
            icon={faCogs}
            label="Company setting"
          />
          <SideNavLink
            link={`/${props.space}/settings/user`}
            icon={faUserShield}
            label="User"
          />
          <SideNavLink
            link={`/${props.space}/settings/backup`}
            icon={faDatabase}
            label="Backup and restore"
          />
          {/* <SideNavLink
              link={`/${props.space}/settings?link=backup`}
              icon={faFileImport}
              label="Export and import"
            /> */}
        </>
      )}
    </div>
  );
};

export default MobileSidebar;
