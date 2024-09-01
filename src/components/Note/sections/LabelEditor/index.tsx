import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import NoteModel from "../../../../model/NoteModel";
import { Input, Label, FlexContainer } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPlus,
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { isEmptyOrSpaces } from "../../../../components/Utils";

interface Props {
  note: NoteModel;
  onChange: any;
}

const LabelEditor = (props: Props) => {
  const existingLabels = useSelector((state: any) => state.label?.items);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearchTextChange = (event: any) => {
    event.preventDefault();
    setSearchText(event.currentTarget.value);
  };

  useEffect(() => {
    if (isEmptyOrSpaces(searchText)) {
      setSearchResults(
        existingLabels.filter(
          (item: string) => !props.note.labels.includes(item)
        )
      );
    } else {
      setSearchResults(
        existingLabels
          .filter((item: string) => !props.note.labels.includes(item))
          .filter((item: string) =>
            item.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    }
  }, [searchText, existingLabels, props.note?.labels]);

  const handleChange = (event: any) => {
    props.onChange({
      ...props.note,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const addLabel = (event: any, _label: string) => {
    event.preventDefault();
    let primaryLabel = props.note.primaryLabel;
    if (props.note.labels.length === 0) {
      primaryLabel = _label;
    }
    props.onChange({
      ...props.note,
      labels: [...props.note.labels, _label],
      primaryLabel,
    });
  };

  const removeLabel = (event: any, _label: string) => {
    event.preventDefault();
    let primaryLabel = props.note.primaryLabel;
    if (props.note.primaryLabel === _label && props.note.labels.length > 1) {
      primaryLabel = props.note.labels.filter((item) => item !== _label)[0];
    } else if (props.note.primaryLabel === _label) {
      primaryLabel = undefined;
    }
    props.onChange({
      ...props.note,
      labels: props.note.labels.filter((item) => item !== _label),
      primaryLabel,
    });
  };

  const starLabel = (event: any, _label: string) => {
    event.preventDefault();
    props.onChange({
      ...props.note,
      labels: props.note.labels,
      primaryLabel: _label,
    });
  };

  return (
    <div className="label-editor">
      <Label>Labels</Label>
      <div className="note-label-list label-editor__view">
        {props.note.labels?.map((label) => (
          <div className="note-label" key={label}>
            <div>{label}</div>
            {props.note.primaryLabel !== label && (
              <button onClick={(event) => starLabel(event, label)}>
                <FontAwesomeIcon icon={faStar} />
              </button>
            )}
            {props.note.primaryLabel === label && (
              <button disabled className="label-editor__view__star-active">
                <FontAwesomeIcon icon={faStar} />
              </button>
            )}
            <button onClick={(event) => removeLabel(event, label)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        ))}
      </div>
      <Input
        name="searchText"
        value={searchText}
        placeholder="Search or create new label"
        onInput={handleSearchTextChange}
      />
      <div className="label-editor__results">
        <FlexContainer>
          {!isEmptyOrSpaces(searchText) &&
            !props.note.labels.includes(searchText) &&
            !searchResults.includes(searchText) && (
              <div className="note-label">
                <div>{searchText}</div>
                <button onClick={(event) => addLabel(event, searchText)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            )}
          {!isEmptyOrSpaces(searchText) &&
            searchResults.map((item) => (
              <div className="note-label" key={item}>
                <div>{item}</div>
                <button onClick={(event) => addLabel(event, item)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            ))}
        </FlexContainer>
      </div>
    </div>
  );
};

export default LabelEditor;
