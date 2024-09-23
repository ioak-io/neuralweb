import React, { useEffect, useRef, useState } from "react";
import "./ItemView.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SectionModel from "../../../../model/SectionModel";
import ThemeModel from "../../../../model/ThemeModel";

interface Props {
  space: string;
  section: SectionModel;
  index: number;
}

const ItemView = (props: Props) => {
  const navigate = useNavigate();

  const onOpen = () => {
    navigate(
      `/${props.space}/book/${props.section.bookref}/section/${props.section.reference}`
    );
  };

  return (
    <div className="section-list-item-view">
      <a
        rel="noopener noreferrer"
        title={props.section.title}
        href={`/#/${props.space}/book/${props.section.bookref}/section/${props.section.reference}`}
      >
        {`${props.index + 1}. ${props.section.title}`}
      </a>
      <div
        dangerouslySetInnerHTML={{ __html: props.section.description || "" }}
      />
    </div>
  );
};

export default ItemView;
