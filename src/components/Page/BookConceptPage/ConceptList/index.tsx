import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ItemView from "./ItemView";
import ConceptModel from "../../../../model/ConceptModel";
import ThemeModel from "../../../../model/ThemeModel";

interface Props {
  space: string;
  concepts: ConceptModel[];
  themeMap: { [key: string]: ThemeModel[] };
}

const ConceptList = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="concept-list">
      {props.concepts.map((concept, index) => (
        <ItemView
          key={concept._id}
          index={index}
          space={props.space}
          concept={concept}
          themes={props.themeMap[concept.reference || ""]}
        />
      ))}
    </div>
  );
};

export default ConceptList;
