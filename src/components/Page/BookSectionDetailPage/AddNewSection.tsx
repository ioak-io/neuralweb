import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddNewSection.scss";
import { useParams } from "react-router-dom";
import { createBookdetail, saveBookdetail } from "./service";
import { Button, Checkbox, Input, Radio, ThemeType } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronRight,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { SECTION_TYPES } from "./SectionTypes";
import EditControls from "../../../components/Note/ui/EditControls";
import ViewControls from "../../../components/Note/ui/ViewControls";
import BookSectionDetailModel from "../../../model/BookSectionDetailModel";

interface Props {
  space: string;
  onRefresh: any;
  bookSectionDetailList: BookSectionDetailModel[];
}

const AddNewSection = (props: Props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);

  const [chosenType, setChosenType] = useState("");
  const [customSectionTitle, setCustomSectionTitle] = useState("");
  const [customSectionDescription, setCustomSectionDescription] = useState("");
  const [sectionTypes, setSectionTypes] = useState<
    { name: string; description: string }[]
  >([]);

  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    const _existingSectionTypes: string[] = [];
    let isSummaryAvailable = false;
    let isThemesAvailable = false;
    props.bookSectionDetailList?.forEach((item) => {
      _existingSectionTypes.push(item.type);
      if (item.type === "summary") {
        isSummaryAvailable = true;
      } else if (item.type === "themes") {
        isThemesAvailable = true;
      }
    });
    setSectionTypes(
      SECTION_TYPES.filter(
        (item) =>
          !_existingSectionTypes.includes(item.name) &&
          (!item.isSummaryDependent || isSummaryAvailable) &&
          (!item.isThemesDependent || isThemesAvailable)
      )
    );
  }, [props.bookSectionDetailList]);

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    createBookdetail(
      props.space,
      params.bookref || "",
      params.sectionref || "",
      {
        type: chosenType,
        sectionTitle: customSectionTitle,
        sectionDescription: customSectionDescription,
      },
      authorization
    )
      .then((response) => {
        setSaving(false);
        setIsEdit(false);
        setChosenType("");
        setCustomSectionDescription("");
        setCustomSectionTitle("");
        props.onRefresh();
      })
      .catch(() => setSaving(false));
  };

  const onCancelHead = () => {
    setChosenType("");
    setIsEdit(false);
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
    <div className="book-section-detail-add-new-section">
      {isEdit && (
        <EditControls onCancel={onCancelHead} onSave={onSave} saving={saving} />
      )}
      {!isEdit && <ViewControls onAdd={onEdit} disable={false} />}
      {isEdit && (
        <div className="book-section-detail-add-new-section__form">
          {sectionTypes.map((item) => (
            <Radio
              name={item.name}
              key={item.name}
              label={item.description}
              value={item.name}
              checked={item.name === chosenType}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddNewSection;
