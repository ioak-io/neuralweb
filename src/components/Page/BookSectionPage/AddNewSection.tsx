import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddNewSection.scss";
import { useParams } from "react-router-dom";
import { Button, Checkbox, Input, Radio, ThemeType } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronRight,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { SECTION_TYPES } from "./SectionTypes";

interface Props {
  space: string;
  onRefresh: any;
}

const AddNewSection = (props: Props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);

  const [isOpen, setIsOpen] = useState(false);
  const [chosenType, setChosenType] = useState("");
  const [customSectionTitle, setCustomSectionTitle] = useState("");
  const [customSectionDescription, setCustomSectionDescription] = useState("");

  const [saving, setSaving] = useState(false);

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    // createBookdetail(
    //   props.space,
    //   params.bookref || "",
    //   params.sectionref || "",
    //   {
    //     type: chosenType,
    //     sectionTitle: customSectionTitle,
    //     sectionDescription: customSectionDescription,
    //   },
    //   authorization
    // )
    //   .then((response) => {
    //     setSaving(false);
    //     setIsOpen(false);
    //     setChosenType("");
    //     setCustomSectionDescription("");
    //     setCustomSectionTitle("");
    //     props.onRefresh();
    //   })
    //   .catch(() => setSaving(false));
  };

  const onCancel = () => {
    setChosenType("");
    setIsOpen(false);
  };

  const onChange = (event: any) => {
    setChosenType(event.currentTarget.value);
  };

  const onCustomSectionDescriptionChange = (event: any) => {
    setCustomSectionDescription(event.currentTarget.value);
  };

  const onCustomSectionTitleChange = (event: any) => {
    setCustomSectionTitle(event.currentTarget.value);
  };

  return (
    <div
      className={`bookSectionDetail-add-new-section ${
        isOpen
          ? "bookSectionDetail-add-new-section--open"
          : "bookSectionDetail-add-new-section--closed"
      }`}
    >
      <div className="form">
        {isOpen && (
          <>
            {SECTION_TYPES.map((item) => (
              <Radio
                name={item.name}
                key={item.name}
                label={item.description}
                value={item.name}
                checked={item.name === chosenType}
                onChange={onChange}
              />
            ))}
            {chosenType === "CUSTOM_MANAGED" && (
              <>
                <Input
                  name="customSectionDescription"
                  value={customSectionDescription}
                  onInput={onCustomSectionDescriptionChange}
                  label="Instruction about what kind of content should be generated for this section"
                />
                <Input
                  name="customSectionTitle"
                  value={customSectionTitle}
                  onInput={onCustomSectionTitleChange}
                  label="Section title"
                />
              </>
            )}
            <div className="action-footer position-right">
              <Button
                onClick={onSave}
                bookSectionDetail={ThemeType.primary}
                loading={saving}
                disabled={!chosenType}
              >
                <FontAwesomeIcon icon={faCheck} />
                Create
              </Button>
              <Button onClick={onCancel} disabled={saving}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </div>
          </>
        )}

        {!isOpen && (
          <Button onClick={() => setIsOpen(true)}>
            <FontAwesomeIcon icon={faPlus} />
            Add section
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddNewSection;
