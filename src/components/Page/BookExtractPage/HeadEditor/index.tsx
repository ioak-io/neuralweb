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
import ExtractModel from "../../../../model/ExtractModel";

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
  extract: ExtractModel;
  onChange: any;
  editor: any;
}

const HeadEditor = (props: Props) => {
  const [isAiAssistOpen, setIsAiAssistOpen] = useState(false);

  const handleChange = (event: any) => {
    props.onChange({
      ...props.extract,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onReplaceContentFromAssist = (_text: string) => {
    props.editor?.commands.setContent(_text);
  };

  return (
    <>
      <div className="head-editor">
        <Input
          autoFocus
          name="name"
          value={props.extract.name}
          // label="Name"
          onInput={handleChange}
        />
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
        <div>
          <Button
            onClick={() => setIsAiAssistOpen(true)}
            // loading={isRecording}
            variant={ButtonVariantType.transparent}
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            AI assist
          </Button>
        </div>
      </div>
      <AiAssist
        space={props.space}
        isOpen={isAiAssistOpen}
        setIsOpen={setIsAiAssistOpen}
        initialContent={props.extract.text}
        onUpdate={onReplaceContentFromAssist}
      />
    </>
  );
};

export default HeadEditor;
