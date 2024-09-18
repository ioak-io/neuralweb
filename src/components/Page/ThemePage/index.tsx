import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Topbar from "../../../components/Topbar";
import { useParams } from "react-router-dom";
import MainSection from "../../../components/MainSection";
import {
  generateThemeSectionHead,
  getThemeByReference,
  getThemeDetailList,
  saveTheme,
} from "./service";
import ThemeModel from "../../../model/ThemeModel";
import { cloneDeep } from "lodash";
import { getEditorConfig } from "../../../utils/EditorUtils";
import SectionContainer from "./SectionContainer";
import AddNewSection from "./AddNewSection";
import ThemeDetailModel from "../../../model/ThemeDetailModel";
import TextToSpeech from "../../../components/TextToSpeech";

interface Props {
  space: string;
}

const ThemePage = (props: Props) => {
  const headEditor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [theme, setTheme] = useState<ThemeModel>();
  const [themeDetailList, setThemeDetailList] = useState<ThemeDetailModel[]>(
    []
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditHead, setIsEditHead] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<ThemeModel>({
    title: "",
    description: "",
  });

  useEffect(() => {
    _refreshTheme();
    _refreshThemeDetailList();
  }, [params, authorization]);

  const _refreshThemeDetailList = () => {
    if (
      params.bookref &&
      params.themeref &&
      params.conceptref &&
      authorization.isAuth
    ) {
      getThemeDetailList(
        props.space,
        params.bookref,
        params.conceptref,
        params.themeref,
        authorization
      ).then((response) => {
        setThemeDetailList(response);
      });
    }
  };

  const _refreshTheme = () => {
    if (
      params.bookref &&
      params.conceptref &&
      params.themeref &&
      authorization.isAuth
    ) {
      getThemeByReference(
        props.space,
        params.bookref,
        params.conceptref,
        params.themeref,
        authorization
      ).then((response) => {
        setTheme(response);
      });
    }
  };

  const onEditHead = () => {
    setIsEditHead(true);
    setIsEdit(true);
  };

  const onCancelHead = () => {
    reset();
    setIsEditHead(false);
    setIsEdit(false);
  };

  const reset = () => {
    if (theme) {
      setState(cloneDeep(theme));
    }
  };

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    saveTheme(props.space, { ...state }, authorization)
      .then((response) => {
        setTheme(response);
        setIsEditHead(false);
        setIsEdit(false);
        setSaving(false);
      })
      .catch(() => setSaving(false));
  };

  // const saveChanges = () => {
  //   saveNote(props.space, state, authorization).then((response: any) => {
  //     if (response) {
  //       setState(response);
  //       setView('view');
  //     }
  //   });
  // };

  const onChange = (event: any) => {
    console.log(event);
  };

  const onGenerateHead = () => {
    setSaving(true);
    generateThemeSectionHead(
      props.space,
      params.bookref || "",
      params.themeref || "",
      {
        title: "Beyond good and evil",
        primaryAuthor: "Friedrich Nietzsche",
        themeTitle: "The Religious Mood",
      },
      authorization
    )
      .then((response) => {
        // setTheme(response);
        setIsEditHead(false);
        setIsEdit(false);
        setSaving(false);
      })
      .catch(() => setSaving(false));
  };

  return (
    <>
      <div className="note-page page-animate">
        <Topbar title={`Theme | ${theme?.title}` || ""} />

        <MainSection>
          {theme &&
            themeDetailList?.map((item) => (
              <SectionContainer
                key={item._id}
                space={props.space}
                themeDetail={item}
                theme={theme}
                onRefresh={_refreshThemeDetailList}
              />
            ))}
          <AddNewSection
            space={props.space}
            onRefresh={_refreshThemeDetailList}
          />
        </MainSection>
      </div>
    </>
  );
};

export default ThemePage;
