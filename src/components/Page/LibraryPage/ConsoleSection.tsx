import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConsoleSection.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  ButtonVariantType,
  IconButton,
  Input,
  Textarea,
  ThemeType,
} from "basicui";
import { getEditorConfig } from "../../../utils/EditorUtils";
import { getFleetingnotes, saveFleetingnote } from "./service";
import {
  faAdd,
  faCodeMerge,
  faEdit,
  faLayerGroup,
  faMicrophone,
  faMicrophoneAlt,
  faPaperPlane,
  faPen,
  faPenAlt,
  faPenClip,
  faPenNib,
  faRocket,
  faRss,
  faTag,
  faTags,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  location: any;
  space: string;
}

const capitalize = (text: string): string => {
  if (!text || text.length === 0) return text;
  return `${text[0].toUpperCase()}${text.slice(1)}`;
};

const ConsoleSection = (props: Props) => {
  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.profile);
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

  // const editor = getEditorConfig();
  // useEffect(() => {
  //   editor?.on("update", ({ editor }) => {
  //     setTranscript(editor?.getHTML());
  //   });
  // }, [editor]);
  // useEffect(() => {
  //   editor?.commands.setContent(transcript || "");
  // }, [transcript, editor]);

  const handleTextChange = (event: any) => {
    setTranscript(event.currentTarget.value);
  };

  const handleCreateNote = () => {
    saveFleetingnote(
      props.space,
      {
        content: transcript,
      },
      authorization
    ).then((response: any) => {
      console.log(response);
    });
  };

  return (
    <div
      className={`console-section ${
        profile.sidebar
          ? "console-section__sidebar-active"
          : "console-section__sidebar-inactive"
      }`}
    >
      {/* <QuickContentEditor text={transcript} editor={editor} /> */}
      <div className="console-section__editor">
        <Textarea value={transcript} onInput={handleTextChange} autoFocus />
        <IconButton onClick={startRecording} circle loading={isRecording}>
          <FontAwesomeIcon icon={faMicrophoneAlt} />
        </IconButton>
        <IconButton onClick={handleCreateNote} circle theme={ThemeType.primary}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </IconButton>
      </div>
      <div className="console-section__controls">
        <IconButton
          onClick={startRecording}
          circle
          loading={isRecording}
          variant={ButtonVariantType.transparent}
        >
          <FontAwesomeIcon icon={faPen} />
        </IconButton>
        <IconButton
          onClick={handleCreateNote}
          circle
          variant={ButtonVariantType.transparent}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
        <IconButton
          onClick={startRecording}
          circle
          variant={ButtonVariantType.transparent}
          loading={isRecording}
        >
          <FontAwesomeIcon icon={faLayerGroup} />
        </IconButton>
        <IconButton
          onClick={startRecording}
          circle
          variant={ButtonVariantType.transparent}
          loading={isRecording}
        >
          <FontAwesomeIcon icon={faCodeMerge} />
        </IconButton>
        <IconButton
          onClick={handleCreateNote}
          variant={ButtonVariantType.transparent}
          circle
        >
          <FontAwesomeIcon icon={faTags} />
        </IconButton>
        <IconButton
          onClick={handleCreateNote}
          variant={ButtonVariantType.transparent}
          circle
        >
          <FontAwesomeIcon icon={faAdd} />
        </IconButton>
      </div>
    </div>
  );
};

export default ConsoleSection;
