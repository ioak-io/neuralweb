import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Topbar from "../../../components/Topbar";
import { useParams } from "react-router-dom";
import MainSection from "../../../components/MainSection";
import {
  getBookdetailList,
  saveBookdetail,
} from "./service";
import { cloneDeep } from "lodash";
import { getEditorConfig } from "../../../utils/EditorUtils";
import SectionContainer from "./SectionContainer";
import AddNewSection from "./AddNewSection";
import BookDetailModel from "../../../model/BookDetailModel";

interface Props {
  space: string;
}

const BookDetailPage = (props: Props) => {
  const headEditor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [bookdetailList, setBookdetailList] = useState<BookDetailModel[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditHead, setIsEditHead] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<BookDetailModel>({
    content: "",
    type: "",
  });

  useEffect(() => {
    _refreshBookdetailList();
  }, [params, authorization]);

  const _refreshBookdetailList = () => {
    if (params.bookref && authorization.isAuth) {
      getBookdetailList(props.space, params.bookref, authorization).then(
        (response) => {
          setBookdetailList(response);
        }
      );
    }
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

  return (
    <>
      <div className="note-page page-animate">
        <Topbar title={`Bookdetail` || ""} />

        <MainSection>
          {bookdetailList?.map((item) => (
            <SectionContainer
              key={item._id}
              space={props.space}
              bookdetail={item}
              onRefresh={_refreshBookdetailList}
            />
          ))}
          <AddNewSection
            space={props.space}
            onRefresh={_refreshBookdetailList}
          />
        </MainSection>
      </div>
    </>
  );
};

export default BookDetailPage;
