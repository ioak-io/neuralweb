import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ItemView.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { IconButton, Link } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import ConceptModel from "../../../../model/ConceptModel";

interface Props {
  space: string;
  concept: ConceptModel;
  index: number;
}

const ItemView = (props: Props) => {
  const navigate = useNavigate();

  const onOpen = () => {
    navigate(
      `/${props.space}/book/${props.concept.bookref}/concept/${props.concept.reference}`
    );
  };

  return (
    // <div className="concept-list-item-view">
    //   <div>{`${props.index + 1}. ${props.concept.name}`}</div>
    //   <div>{props.concept.description}</div>
    //   <div>
    //     <IconButton circle onClick={onOpen}>
    //       <FontAwesomeIcon icon={faFileAlt} />
    //     </IconButton>
    //   </div>
    // </div>
    <div className="concept-list-item-view">
      <a
        rel="noopener noreferrer"
        title={props.concept.name}
        href={`/#/${props.space}/book/${props.concept.bookref}/concept/${props.concept.reference}`}
      >
        {`${props.index + 1}. ${props.concept.name}`}
      </a>
    </div>
  );
};

export default ItemView;
