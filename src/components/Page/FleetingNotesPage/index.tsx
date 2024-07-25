import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Topbar from "../../../components/Topbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, IconButton, Input, ThemeType } from "basicui";
import MainSection from "../../../components/MainSection";
import { SearchOptionType } from "src/components/BrowseNotes/SearchInput/SearchOptionType";
import MetadataDefinitionModel from "src/model/MetadataDefinitionModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faTimes } from "@fortawesome/free-solid-svg-icons";
import { setMilliseconds } from "date-fns";

interface Props {
  location: any;
  space: string;
}

const capitalize = (text: string): string => {
  if (!text || text.length === 0) return text;
  return `${text[0].toUpperCase()}${text.slice(1)}`;
};

const FleetingNotesPage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const _transcript = event.results[0][0].transcript;
      setTranscript(
        (transcript ? `${transcript}. ` : "") + capitalize(_transcript)
      );
      setIsRecording(false);
    };

    recognition.start();
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  return (
    <div className="page-animate">
      <Topbar title="Fleeting notes (coming soon)" space={props.space} />
      <MainSection>
        <div className="fleeting-notes-page">
          <div className="fleeting-notes-page__record">
            <IconButton
              onClick={startRecording}
              circle
              theme={ThemeType.primary}
              loading={isRecording}
            >
              <FontAwesomeIcon icon={faMicrophone} />
            </IconButton>
            {transcript && !isRecording && (
              <IconButton onClick={clearTranscript} circle>
                <FontAwesomeIcon icon={faTimes} />
              </IconButton>
            )}
          </div>
          <div className="fleeting-notes-page__transcript">{transcript}</div>
        </div>
      </MainSection>
    </div>
  );
};

export default FleetingNotesPage;
