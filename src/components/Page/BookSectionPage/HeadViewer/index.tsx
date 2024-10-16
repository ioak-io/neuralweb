import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { isEmptyOrSpaces } from "../../../../components/Utils";
import BookSectionDetailModel from "../../../../model/BookSectionDetailModel";
import SectionModel from "../../../../model/SectionModel";
import { Link, ThemeType } from "basicui";

interface Props {
  index: number;
  space: string;
  section: SectionModel;
}

const HeadViewer = (props: Props) => {
  return (
    <div className="book-section-page-head-viewer">
      <Link
        href={`/#/${props.space}/book/${props.section.bookref}/section/${props.section.reference}`}
        theme={ThemeType.primary}
      >
        {`${props.index + 1}. ${props.section.title}`}
      </Link>
      <div
        dangerouslySetInnerHTML={{ __html: props.section.description || "" }}
      />
    </div>
  );
};

export default HeadViewer;
