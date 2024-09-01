import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AiAssist.scss";
import {
  Button,
  ButtonVariantType,
  Checkbox,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSizeType,
  Textarea,
  ThemeType,
} from "basicui";
import { isEmptyOrSpaces } from "../Utils";
import AiAssistHistory, { AiAssistHistoryType } from "./AiAssistHistory";
import { brainstormWithAi } from "./service";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { copyHtmlToClipboard } from "../../utils/ClipboardUtils";

interface Props {
  space: string;
  isOpen: boolean;
  setIsOpen: any;
  onUpdate: any;
  initialContent?: string;
}

const _PREDEFINED_PROMPTS = [
  {
    label: "Elaborate",
    value: "Elaborate the text with more detailed content",
  },
  {
    label: "Concise",
    value:
      "Make the text concise, reduce redundancy without loosing its essence",
  },
  {
    label: "Organize",
    value: "Group into appropriate paragraphs and reduce redundancy",
  },
  {
    label: "Headings",
    value: "Logically sort the content and add relevant section headings",
  },
  {
    label: "Grammar",
    value: "Apply correct grammar, spelling and sentence formations",
  },
];

const AiAssist = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [isLoading, setIsLoading] = useState(false);
  const [instructionError, setInstructionError] = useState("");
  const [bookError, setBookError] = useState("");
  const editor = getEditorConfig();
  const [state, setState] = useState({
    useBookMode: false,
    instructions: "",
    bookName: "",
    authorName: "",
  });

  useEffect(() => {
    if (props.initialContent) {
      editor?.commands.setContent(props.initialContent);
    }
  }, [props.initialContent, editor]);

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleRefineBasedOnBookChange = (event: any) => {
    setState({ ...state, useBookMode: event.currentTarget.checked });
  };

  const predict = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    if (state.useBookMode && isEmptyOrSpaces(state.bookName)) {
      setBookError(
        "Provide book name and author name to refine based on the book's content"
      );
      setIsLoading(false);
      return;
    }
    brainstormWithAi(props.space, authorization, {
      ...state,
      text: editor?.getHTML() || "",
    }).then((response) => {
      if (response?.text?.startsWith("MORE_INFO_NEEDED")) {
        setBookError("");
        setInstructionError(
          _extractMoreInfoDetails(response?.text, "MORE_INFO_NEEDED")
        );
      } else if (response?.text?.startsWith("BOOK_NOT_FOUND")) {
        setInstructionError("");
        setBookError(_extractMoreInfoDetails(response?.text, "BOOK_NOT_FOUND"));
      } else if (response?.text) {
        setInstructionError("");
        setBookError("");
        setState({ ...state, instructions: "" });
        editor?.commands.setContent(response?.text);
      }
      setIsLoading(false);
    });
  };

  const _extractMoreInfoDetails = (input: string, prefix: string) => {
    let processedText = input;

    if (input.startsWith(prefix)) {
      processedText = input.substring(prefix.length).trim();
      // Remove the colon if it's the first character after the prefix
      if (processedText.startsWith(":")) {
        processedText = processedText.substring(1).trim();
      }
    }

    return processedText;
  };

  const applyPredefinedPrompt = (instructions: string) => {
    setState({ ...state, instructions });
  };

  const onUpdate = () => {
    props.onUpdate(editor?.getHTML());
    props.setIsOpen(false);
  };

  const onCopy = () => {
    copyHtmlToClipboard({
      htmlContent: editor?.getHTML(),
      textContent: editor?.getText(),
    });
    props.setIsOpen(false);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      size={ModalSizeType.large}
    >
      <ModalHeader
        onClose={() => props.setIsOpen(false)}
        heading="Generate content with AI assistance"
      />
      <ModalBody>
        <div className="ai-assist">
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
          <form className="ai-assist__form" onSubmit={predict}>
            <Input
              value={state.instructions}
              name="instructions"
              onInput={handleChange}
              autoFocus
              disabled={isLoading}
              placeholder="Instruction or command"
              errorMessage={instructionError}
            />
            <IconButton
              type="submit"
              theme={ThemeType.primary}
              variant={ButtonVariantType.transparent}
              loading={isLoading}
              disabled={
                !state.instructions
                // || (state.useBookMode && isEmptyOrSpaces(state.bookName))
              }
              circle
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </IconButton>
          </form>
          <div className="ai-assist__prompts">
            {_PREDEFINED_PROMPTS.map((item) => (
              <button
                className="button"
                onClick={() => applyPredefinedPrompt(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div>
            <Checkbox
              label="Refine content based on a book"
              onInput={handleRefineBasedOnBookChange}
            />
          </div>
          {state.useBookMode && (
            <div className="ai-assist__book">
              <Input
                value={state.bookName}
                name="bookName"
                onInput={handleChange}
                disabled={isLoading}
                // label="Book name"
                placeholder="Book name"
                errorMessage={bookError}
              />

              <Input
                value={state.authorName}
                name="authorName"
                onInput={handleChange}
                disabled={isLoading}
                // label="Author name"
                placeholder="Author name"
              />
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onUpdate} variant={ButtonVariantType.transparent}>
          {/* <FontAwesomeIcon icon={faPlus} /> */}
          Apply
        </Button>
        <Button onClick={onCopy} variant={ButtonVariantType.transparent}>
          {/* <FontAwesomeIcon icon={faPlus} /> */}
          Copy
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AiAssist;
