import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleNodes,
  faICursor,
  faListUl,
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faPlus,
  faStop,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import Topbar from "../../components/Topbar";
import NoteModel from "../../model/NoteModel";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  ButtonVariantType,
  Checkbox,
  IconButton,
  Input,
  Textarea,
  ThemeType,
} from "basicui";
import MainSection from "../../components/MainSection";
import { getRecentlyCreatedNote } from "./service";
import RecentNote from "./RecentNote";
import { appendNoteItem } from "../../store/actions/NoteActions";
import { createNote, saveNote } from "../PreviewNote/service";
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
  HeadingDropdown,
} from "writeup";
import { getEditorConfig } from "../../utils/EditorUtils";
import AiAssist from "./AiAssist";
import MetadataDefinitionModel from "../../model/MetadataDefinitionModel";
import MetadataEditor from "../Note/sections/MetadataEditor";
import LabelEditor from "../Note/sections/LabelEditor";
import BookLinkEditor from "../Note/sections/BookLinkEditor";

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
  location: any;
  space: string;
}

const NewNote = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [errorMessage, setErrorMessage] = useState("");
  const [autoGenerateOtherDetails, setAutoGenerateOtherDetails] =
    useState(true);

  const [isAiAssistOpen, setIsAiAssistOpen] = useState(false);

  const metadataDefinitionList = useSelector(
    (state: any) => state.metadataDefinition.items
  );
  const [metadataDefinitionMap, setMetadataDefinitionMap] = useState<any>({});

  useEffect(() => {
    const _metadataDefinitionMap: any = {};
    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      if (_metadataDefinitionMap[item.group]) {
        _metadataDefinitionMap[item.group].push(item);
      } else {
        _metadataDefinitionMap[item.group] = [item];
      }
    });
    setMetadataDefinitionMap(_metadataDefinitionMap);
  }, [metadataDefinitionList]);

  const [state, setState] = useState<NoteModel>({
    _id: undefined,
    content: "",
    labels: [],
    name: "",
    reference: "",
  });
  const editor = getEditorConfig();

  const [recognition, setRecognition] = useState<any>(null);
  const [listeningFor, setListeningFor] = useState<"name" | "content">();

  const startRecording = (fieldName: "name" | "content") => {
    const _recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    _recognition.interimResults = true;
    _recognition.lang = "en-US";
    _recognition.continuous = true;

    let final_transcript = state[fieldName];
    if (fieldName === "content") {
      final_transcript = editor?.getHTML();
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
        setState({ ...state, name: final_transcript || "" });
      }

      if (fieldName === "content") {
        editor?.commands.setContent(final_transcript || "");
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
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleAutoGenerateOtherDetailsChange = (event: any) => {
    setAutoGenerateOtherDetails(event.currentTarget.checked);
  };

  const handleStateChange = (_note: NoteModel) => {
    console.log(_note);
    setState({ ...state, ..._note });
  };

  const save = () => {
    if (!editor?.getText() || editor?.getText()?.length < 10) {
      setErrorMessage("Should be more than 10 characters long");
    } else {
      setErrorMessage("");
      let _note = { ...state, content: editor?.getHTML() };
      createNote(
        props.space,
        { note: _note, autoGenerateOtherDetails },
        authorization
      ).then((response) => {
        dispatch(appendNoteItem(response.note));
        navigate(`/${props.space}/note/${response.note.reference}`);
      });
    }
  };

  const onReplaceContentFromAssist = (_text: string) => {
    editor?.commands.setContent(_text);
  };

  return (
    <>
      <div className="page-animate">
        <Topbar title="Create new note" />
        <MainSection>
          <form id="new-page" onSubmit={save} className="new-note-form">
            <div>
              {errorMessage && (
                <div className="basicui-form-element-error">{errorMessage}</div>
              )}
              <Editor editor={editor}>
                <HeadingDropdown editor={editor} />
                <Bold editor={editor} />
                <Italic editor={editor} />
                <Underline editor={editor} />
                <BulletList editor={editor} />
                <OrderedList editor={editor} />
                <BlockQuote editor={editor} />
                <HighlightColor editor={editor} />
                <ClearFormatting editor={editor} />
              </Editor>
            </div>
            <div className="new-note-form__controls">
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
            <BookLinkEditor
              space={props.space}
              note={state}
              onChange={handleStateChange}
            />
            {!autoGenerateOtherDetails && (
              <>
                <Input
                  name="name"
                  value={state.name}
                  onInput={handleChange}
                  label="Note name"
                  disabled={listeningFor === "name"}
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
                {Object.keys(metadataDefinitionMap).map((group) => (
                  <MetadataEditor
                    key={group}
                    onChange={handleStateChange}
                    note={state}
                    group={group}
                    metadataDefinitionList={metadataDefinitionMap[group]}
                  />
                ))}
                <LabelEditor note={state} onChange={handleStateChange} />
              </>
            )}
          </form>
          <div className="footer">
            <div className="new-note-footer">
              <Checkbox
                label="Generate details"
                defaultChecked
                onInput={handleAutoGenerateOtherDetailsChange}
              />
            </div>
            <div className="footer-right">
              <Button onClick={save}>
                <FontAwesomeIcon icon={faPlus} /> Create
              </Button>
            </div>
          </div>
        </MainSection>
      </div>
      <AiAssist
        space={props.space}
        isOpen={isAiAssistOpen}
        setIsOpen={setIsAiAssistOpen}
        initialContent={editor?.getHTML()}
        onUpdate={onReplaceContentFromAssist}
      />
    </>
  );
};

export default NewNote;
