import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Topbar from "../../../components/Topbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, IconButton, Input, Textarea, ThemeType } from "basicui";
import MainSection from "../../../components/MainSection";
import { SearchOptionType } from "src/components/BrowseNotes/SearchInput/SearchOptionType";
import MetadataDefinitionModel from "src/model/MetadataDefinitionModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faRocket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { setMilliseconds } from "date-fns";
import QuickContentEditor from "../../../components/Note/sections/QuickContentEditor";
import { getEditorConfig } from "../../../utils/EditorUtils";
import { getFleetingnotes, saveFleetingnote } from "./service";
import ConsoleSection from "./ConsoleSection";

interface Props {
  location: any;
  space: string;
}

const FleetingNotesPage = (props: Props) => {
  const editor = getEditorConfig();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [fleetingnotes, setFleetingnotes] = useState<any[]>([]);

  useEffect(() => {
    if (authorization.isAuth) {
      getFleetingnotes(props.space, authorization).then((response: any[]) => {
        setFleetingnotes(response);
      });
    }
  }, [authorization]);

  return (
    <div className="page-animate">
      <Topbar title="Fleeting notes (coming soon)" space={props.space} />
      <MainSection>
        <div className="fleeting-notes-page">
          <div className="fleeting-notes-page__list">
            {fleetingnotes.map((item: any, index: number) => (
              <div key={index}>{item.content}</div>
            ))}
          </div>
        </div>
      </MainSection>
      <ConsoleSection space={props.space} location={props.location} />
    </div>
  );
};

export default FleetingNotesPage;
