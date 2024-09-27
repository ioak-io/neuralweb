import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ItemView from "./ItemView";
import SectionModel from "../../../../model/SectionModel";
import ThemeModel from "../../../../model/ThemeModel";

interface Props {
  space: string;
  onRefresh: any;
  sections: SectionModel[];
  themeMap: { [key: string]: ThemeModel[] };
}

const SectionList = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="section-list">
      {props.sections.map((section, index) => (
        <ItemView
          key={section._id}
          index={index}
          space={props.space}
          section={section}
          onRefresh={props.onRefresh}
        />
      ))}
    </div>
  );
};

export default SectionList;
