import React, { useEffect, useRef, useState } from "react";
import "./ItemView.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ConceptModel from "../../../../model/ConceptModel";
import ThemeModel from "../../../../model/ThemeModel";

interface Props {
  space: string;
  concept: ConceptModel;
  themes: ThemeModel[];
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
      {props.themes?.map((theme, index) => (
        <div key={theme.title} className="concept-list-item-view__sub">
          <a
            rel="noopener noreferrer"
            title={theme.title}
            href={`/#/${props.space}/book/${props.concept.bookref}/concept/${props.concept.reference}/theme/${theme.reference}`}
          >
            {`${props.index + 1}.${index + 1}. ${theme.title}`}
          </a>
          {/* {item.subThemes?.map((item2, index2) => (
            <div key={item2.title} className="concept-list-item-view__sub">
              <a
                rel="noopener noreferrer"
                title={item2.title}
                href={`/#/${props.space}/book/${props.concept.bookref}/concept/${props.concept.reference}/subtheme`}
              >
                {`${props.index + 1}.${index + 1}.${index2 + 1}. ${
                  item2.title
                }`}
              </a>
            </div>
          ))} */}
        </div>
      ))}
    </div>
  );
};

export default ItemView;
