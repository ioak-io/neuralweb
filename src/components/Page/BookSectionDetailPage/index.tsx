import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Topbar from "../../../components/Topbar";
import { useParams } from "react-router-dom";
import MainSection from "../../../components/MainSection";
import { getBookdetailList, saveBookdetail } from "./service";
import { cloneDeep } from "lodash";
import { getEditorConfig } from "../../../utils/EditorUtils";
import SectionContainer from "./SectionContainer";
import AddNewSection from "./AddNewSection";
import BookSectionDetailModel from "../../../model/BookSectionDetailModel";
import SectionModel from "../../../model/SectionModel";
import { getSectionByReference } from "../BookSectionPage/service";
import { getBookGenerationLog } from "../BookPage/service";
import BookLogModel from "../../../model/BookLogModel";

interface Props {
  space: string;
}

const BookSectionDetailPage = (props: Props) => {
  const headEditor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [bookSectionDetailList, setBookdetailList] = useState<
    BookSectionDetailModel[]
  >([]);
  const [bookSection, setBookSection] = useState<SectionModel>();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditHead, setIsEditHead] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<BookSectionDetailModel>({
    content: "",
    type: "",
  });
  const [log, setLog] = useState<BookLogModel[]>([]);

  useEffect(() => {
    _refreshBookdetailList();
    _refreshSection();
    _refreshLog();
  }, [params, authorization]);

  const _refreshBookdetailList = () => {
    if (params.bookref && params.sectionref && authorization.isAuth) {
      getBookdetailList(
        props.space,
        params.bookref,
        params.sectionref,
        authorization
      ).then((response) => {
        setBookdetailList(response);
      });
    }
  };

  const _refreshSection = () => {
    if (params.bookref && params.sectionref && authorization.isAuth) {
      getSectionByReference(
        props.space,
        params.bookref,
        params.sectionref,
        authorization
      ).then((response) => {
        setBookSection(response);
      });
    }
  };

  const _refreshLog = () => {
    getBookGenerationLog(
      props.space,
      authorization,
      params.bookref || "",
      params.sectionref || ""
    ).then((response) => {
      setLog(response);
      console.log("*", response)
    });
  };

  const onEditHead = () => {
    setIsEditHead(true);
    setIsEdit(true);
  };

  const onCancelHead = () => {
    setIsEditHead(false);
    setIsEdit(false);
  };

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    saveBookdetail(props.space, { ...state }, authorization)
      .then((response) => {
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

  const onRefresh = () => {
    _refreshBookdetailList();
    _refreshLog();
  };

  return (
    <>
      <div className="note-page page-animate">
        <Topbar title={`Bookdetail` || ""} />

        <MainSection className="book-section-detail-page">
          {bookSection &&
            bookSectionDetailList?.map((item) => (
              <SectionContainer
                key={item._id}
                space={props.space}
                bookSectionDetail={item}
                bookSection={bookSection}
                onRefresh={onRefresh}
                log={log}
              />
            ))}
          <AddNewSection space={props.space} onRefresh={onRefresh} />
        </MainSection>
      </div>
    </>
  );
};

export default BookSectionDetailPage;
