import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import NoteModel from "../../../../model/NoteModel";
import {
  Button,
  ButtonVariantType,
  IconButton,
  Input,
  Label,
  Textarea,
} from "basicui";
import LabelEditor from "../../sections/LabelEditor";
import TypeEditor from "../TypeEditor";
import {
  BlockQuote,
  Bold,
  BulletList,
  ClearFormatting,
  Editor,
  HighlightColor,
  Italic,
  OrderedList,
  Underline,
} from "writeup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophoneAlt,
  faStop,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import AiAssist from "../../../../components/NewNote/AiAssist";
import { getEditorConfig } from "../../../../utils/EditorUtils";

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
  // Other properties as needed
}

interface SpeechRecognitionResultList
  extends Array<SpeechRecognitionResult[]> {}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface Props {
  space: string;
  note: NoteModel;
  onChange: any;
  editor: any;
}

const HeadEditor = (props: Props) => {
  const [recognition, setRecognition] = useState<any>(null);
  const [listeningFor, setListeningFor] = useState<"name" | "content">();

  const [isAiAssistOpen, setIsAiAssistOpen] = useState(false);

  const onReplaceContentFromAssist = (_text: string) => {
    props.editor?.commands.setContent(_text);
  };

  const startRecording = (fieldName: "name" | "content") => {
    const _recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    _recognition.interimResults = true;
    _recognition.lang = "en-US";
    _recognition.continuous = true;

    let final_transcript = props.note[fieldName];
    if (fieldName === "content") {
      final_transcript = props.editor?.getHTML();
    }
    let lastUpdateTime = Date.now();

    _recognition.onresult = (event: any) => {
      let interim_transcript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;

          // Detecting the silence by checking the time difference between results
          const _now = Date.now();
          if (_now - lastUpdateTime > 1000) {
            // 1000ms pause threshold
            final_transcript = final_transcript?.trim() + ". ";
          }
          lastUpdateTime = _now;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      if (fieldName === "name") {
        props.onChange({ ...props.note, name: final_transcript || "" });
      }

      if (fieldName === "content") {
        props.editor?.commands.setContent(final_transcript || "");
      }
    };

    _recognition.onend = () => {
      if (listeningFor) {
        _recognition.start();
      }
    };

    _recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error);
      if (listeningFor) {
        _recognition.start();
      }
    };

    setRecognition(_recognition);
    _recognition.start();
    setListeningFor(fieldName);
  };

  const stopRecording = () => {
    setListeningFor(undefined);
    if (recognition) {
      recognition.stop();
    }
  };

  const handleChange = (event: any) => {
    props.onChange({
      ...props.note,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <>
      <div className="head-editor">
        <TypeEditor note={props.note} onChange={handleChange} />
        <Input
          autoFocus
          name="name"
          value={props.note.name}
          // label="Name"
          onInput={handleChange}
        />
        <div>
          {listeningFor !== "name" && (
            <IconButton
              onClick={() => startRecording("name")}
              circle
              // loading={isRecording}
              disabled={listeningFor === "content"}
              variant={ButtonVariantType.transparent}
              // theme={ThemeType.danger}
            >
              <FontAwesomeIcon icon={faMicrophoneAlt} />
            </IconButton>
          )}
          {listeningFor === "name" && (
            <IconButton
              onClick={stopRecording}
              circle
              // loading={isRecording}
              variant={ButtonVariantType.transparent}
            >
              <FontAwesomeIcon icon={faStop} />
            </IconButton>
          )}
        </div>
        <Editor editor={props.editor}>
          <Bold editor={props.editor} />
          <Italic editor={props.editor} />
          <Underline editor={props.editor} />
          <BulletList editor={props.editor} />
          <OrderedList editor={props.editor} />
          <BlockQuote editor={props.editor} />
          <HighlightColor editor={props.editor} />
          <ClearFormatting editor={props.editor} />
        </Editor>
        <div className="head-editor__controls">
          {listeningFor !== "content" && (
            <IconButton
              onClick={() => startRecording("content")}
              circle
              // loading={isRecording}
              disabled={listeningFor === "name"}
              variant={ButtonVariantType.transparent}
              // theme={ThemeType.danger}
            >
              <FontAwesomeIcon icon={faMicrophoneAlt} />
            </IconButton>
          )}
          {listeningFor === "content" && (
            <IconButton
              onClick={stopRecording}
              circle
              // loading={isRecording}
              variant={ButtonVariantType.transparent}
            >
              <FontAwesomeIcon icon={faStop} />
            </IconButton>
          )}
          {listeningFor !== "content" && listeningFor !== "name" && (
            <Button
              onClick={() => setIsAiAssistOpen(true)}
              // loading={isRecording}
              variant={ButtonVariantType.transparent}
            >
              <FontAwesomeIcon icon={faWandMagicSparkles} />
              AI assist
            </Button>
          )}
        </div>
        {/* <LabelEditor note={props.note} onChange={handleLabelChange} /> */}
      </div>
      <AiAssist
        space={props.space}
        isOpen={isAiAssistOpen}
        setIsOpen={setIsAiAssistOpen}
        initialContent={props.editor?.getHTML()}
        onUpdate={onReplaceContentFromAssist}
      />
    </>
  );
};

export default HeadEditor;
