import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  createBook,
  getBooks,
  getChapters,
  validateBookName,
} from "../service";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
  ThemeType,
} from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronRight,
  faPlus,
  faSpellCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import BookModel from "../../../../model/BookModel";
import { isEmptyOrSpaces } from "../../../../components/Utils";

interface Props {
  space: string;
  isOpen: boolean;
  onClose: any;
  initialTitle?: string;
}

const _EMPTY_BOOK: BookModel = {
  title: "",
  authors: [],
  primaryAuthor: "",
  categories: [],
  description: "",
  isbn: "",
  publishedDate: "",
  isManaged: true,
};

const NewBook = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationStatus, setValidationStatus] = useState<
    "success" | "failure"
  >();
  const [state, setState] = useState<BookModel>({ ..._EMPTY_BOOK });
  const [isManaged, setIsManaged] = useState(true);

  useEffect(() => {
    if (props.initialTitle && !isEmptyOrSpaces(props.initialTitle)) {
      setState({ ...state, title: props.initialTitle });
    }
  }, [props.initialTitle]);

  const handleSkipValidation = (event: any) => {
    setIsManaged(!event.currentTarget.checked);
  };

  const onChange = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (validationStatus === "success") {
      _create();
    } else {
      _validate();
    }
  };

  const _validate = () => {
    setIsLoading(true);
    validateBookName(props.space, state, authorization).then(
      (response: any) => {
        setIsLoading(false);
        setErrorMessage(response?.outcome?.errorMessage);
        setValidationStatus(response?.outcome?.status || "failure");
        if (response?.outcome?.status === "success") {
          setState({ ...state, ...response?.data });
        }
      }
    );
  };

  const _create = () => {
    setIsLoading(true);
    createBook(
      props.space,
      { book: state, meta: { isManaged } },
      authorization
    ).then((response: any) => {
      setIsLoading(false);
      onClose(true, response.reference);
    });
  };

  const onClose = (isBookAdded: boolean, bookref?: string) => {
    setState({ ..._EMPTY_BOOK });
    setValidationStatus(undefined);
    setErrorMessage("");
    setIsLoading(false);
    setIsManaged(true);
    props.onClose(isBookAdded, bookref);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={() => onClose(false)}>
      <ModalHeader heading="New book" onClose={() => onClose(false)} />
      <ModalBody>
        {/* <form onSubmit={onSubmit}> */}
        <div className="form">
          <Input
            name="title"
            label="Book name"
            value={state.title}
            onInput={onChange}
            errorMessage={errorMessage}
            disabled={validationStatus === "success"}
          />
          <Input
            name="primaryAuthor"
            label="Author name"
            value={state.primaryAuthor}
            onInput={onChange}
            disabled={validationStatus === "success"}
          />
          {(validationStatus === "success" ||
            (validationStatus === "failure" && !isManaged)) && (
            <>
              <Input
                name="isbn"
                label="ISBN"
                value={state.isbn}
                onInput={onChange}
                disabled={validationStatus === "success"}
              />
              <Textarea
                name="description"
                label="About the book"
                value={state.description}
                onInput={onChange}
              />
              <Input
                name="pageCount"
                label="Number of pages"
                value={state.pageCount}
                onInput={onChange}
                type="number"
                disabled={validationStatus === "success"}
              />
              <Input
                name="categories"
                label="Genre"
                value={state.categories?.toString()}
                onInput={onChange}
              />
              <Input
                name="publishedDate"
                label="Published date"
                value={state.publishedDate}
                onInput={onChange}
              />
            </>
          )}
          {validationStatus === "failure" && (
            <Checkbox
              label="Skip validation. System cannot assist you with content generation in this case. Create your own content."
              onInput={handleSkipValidation}
            />
          )}
        </div>
        {/* </form> */}
      </ModalBody>
      <ModalFooter>
        {validationStatus !== "success" && isManaged && (
          <Button theme={ThemeType.primary} onClick={onSubmit}>
            <FontAwesomeIcon icon={faSpellCheck} />
            Validate
          </Button>
        )}
        {(validationStatus === "success" || !isManaged) && (
          <Button theme={ThemeType.primary} onClick={onSubmit}>
            <FontAwesomeIcon icon={faChevronRight} />
            Create
          </Button>
        )}
        <Button onClick={() => onClose(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewBook;
