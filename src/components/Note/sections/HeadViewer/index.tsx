import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import NoteModel from "../../../../model/NoteModel";
import LabelViewer from "../../sections/LabelViewer";
import { Label } from "basicui";
import TypeViewer from "../TypeViewer";
import KeywordViewer from "../KeywordViewer";
import ColorViewer from "../ColorViewer";
import { isEmptyOrSpaces } from "../../../../components/Utils";
import BookLinkViewer from "../BookLinkViewer";

interface Props {
  note: NoteModel;
}

const HeadViewer = (props: Props) => {
  const [color, setColor] = useState<string | undefined>();
  const noteDictionary = useSelector((state: any) => state.note.map);

  useEffect(() => {
    if (props.note && noteDictionary) {
      setColor(noteDictionary[props.note.reference]?.color);
    }
  }, [props.note, noteDictionary]);

  return (
    <div className="head-viewer">
      <div>
        {/* <Label>Name</Label> */}
        <div className="head-viewer__title">
          {/* <ColorViewer color={color} /> */}
          <TypeViewer note={props.note} />
          <h4>{props.note.name}</h4>
          {!isEmptyOrSpaces(props.note.contentText) && (
            <div
              dangerouslySetInnerHTML={{ __html: props.note.content || "" }}
            />
          )}
          {isEmptyOrSpaces(props.note.contentText) && "-"}
        </div>
      </div>
      <div>
        <BookLinkViewer note={props.note} />
      </div>
    </div>
  );
};

export default HeadViewer;
