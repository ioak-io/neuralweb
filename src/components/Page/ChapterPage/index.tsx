import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Topbar from "../../../components/Topbar";
import { useParams } from "react-router-dom";
import MainSection from "../../../components/MainSection";
import {
  generateChapterSectionHead,
  getChapterDetailList,
  saveChapter,
} from "./service";
import ChapterModel from "../../../model/ChapterModel";
import { cloneDeep } from "lodash";
import { getEditorConfig } from "../../../utils/EditorUtils";
import SectionContainer from "./SectionContainer";
import AddNewSection from "./AddNewSection";
import ChapterDetailModel from "../../../model/ChapterDetailModel";

interface Props {
  space: string;
}

const ChapterPage = (props: Props) => {
  const headEditor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [chapter, setChapter] = useState<ChapterModel | null>(null);
  const [chapterDetailList, setChapterDetailList] = useState<
    ChapterDetailModel[]
  >([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditHead, setIsEditHead] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<ChapterModel>({
    name: "",
  });

  useEffect(() => {
    if (chapter) {
      setState(cloneDeep(chapter));
    }
  }, [chapter]);

  useEffect(() => {
    _refreshChapterDetailList();
  }, [params, authorization]);

  const _refreshChapterDetailList = () => {
    if (params.bookref && params.chapterref && authorization.isAuth) {
      getChapterDetailList(
        props.space,
        params.bookref,
        params.chapterref,
        authorization
      ).then((response) => {
        setChapterDetailList(response);
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
    if (chapter) {
      setState(cloneDeep(chapter));
    }
  };

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    saveChapter(props.space, { ...state }, authorization)
      .then((response) => {
        setChapter(response);
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
    generateChapterSectionHead(
      props.space,
      params.bookref || "",
      params.chapterref || "",
      {
        title: "Beyond good and evil",
        primaryAuthor: "Friedrich Nietzsche",
        chapterTitle: "The Religious Mood",
      },
      authorization
    )
      .then((response) => {
        // setChapter(response);
        setIsEditHead(false);
        setIsEdit(false);
        setSaving(false);
      })
      .catch(() => setSaving(false));
  };

  return (
    <>
      <div className="note-page page-animate">
        <Topbar title={chapter?.name || ""} />

        <MainSection>
          {chapterDetailList.map((item) => (
            <SectionContainer
              key={item._id}
              space={props.space}
              chapterDetail={item}
              onRefresh={_refreshChapterDetailList}
            />
          ))}
          <AddNewSection
            space={props.space}
            onRefresh={_refreshChapterDetailList}
          />
        </MainSection>
      </div>
    </>
  );
};

export default ChapterPage;
