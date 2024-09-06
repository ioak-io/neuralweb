import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ItemView from "./ItemView";
import ConceptModel from "../../../../model/ConceptModel";

interface Props {
  space: string;
  concepts: ConceptModel[];
}

const ConceptList = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="concept-list">
      {props.concepts.map((concept, index) => (
        <ItemView key={concept._id} index={index} space={props.space} concept={concept}/>
      ))}
    </div>
  );
};

export default ConceptList;
