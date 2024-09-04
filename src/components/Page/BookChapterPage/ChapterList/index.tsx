import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ItemView from "./ItemView";
import ChapterModel from "../../../../model/ChapterModel";

interface Props {
  space: string;
  chapters: ChapterModel[];
}

const ChapterList = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="chapter-list">
      {props.chapters.map((chapter) => (
        <ItemView key={chapter._id} space={props.space} chapter={chapter}/>
      ))}
    </div>
  );
};

export default ChapterList;
