import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Topbar from "../../../components/Topbar";
import { useParams } from "react-router-dom";
import MainSection from "../../../components/MainSection";
import {
  generateConceptSectionHead,
  getConceptDetailList,
  saveConcept,
} from "./service";
import ConceptModel from "../../../model/ConceptModel";
import { cloneDeep } from "lodash";
import { getEditorConfig } from "../../../utils/EditorUtils";
import SectionContainer from "./SectionContainer";
import AddNewSection from "./AddNewSection";
import ConceptDetailModel from "../../../model/ConceptDetailModel";
import TextToSpeech from "../../../components/TextToSpeech";
import { getConceptByReference, getConcepts } from "../BookConceptPage/service";

interface Props {
  space: string;
}

const ConceptPage = (props: Props) => {
  const headEditor = getEditorConfig();

  const params = useParams();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [concept, setConcept] = useState<ConceptModel>();
  const [conceptDetailList, setConceptDetailList] = useState<
    ConceptDetailModel[]
  >([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditHead, setIsEditHead] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<ConceptModel>({
    name: "",
    description: "",
  });

  useEffect(() => {
    _refreshConceptDetailList();
    _refreshConcept();
  }, [params, authorization]);

  const _refreshConceptDetailList = () => {
    if (params.bookref && params.conceptref && authorization.isAuth) {
      getConceptDetailList(
        props.space,
        params.bookref,
        params.conceptref,
        authorization
      ).then((response) => {
        setConceptDetailList(response);
      });
    }
  };

  const _refreshConcept = () => {
    if (params.bookref && params.conceptref && authorization.isAuth) {
      getConceptByReference(
        props.space,
        params.bookref,
        params.conceptref,
        authorization
      ).then((response) => {
        setConcept(response);
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
    if (concept) {
      setState(cloneDeep(concept));
    }
  };

  const onSave = (event: any, reload?: boolean) => {
    setSaving(true);
    saveConcept(props.space, { ...state }, authorization)
      .then((response) => {
        setConcept(response);
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
    generateConceptSectionHead(
      props.space,
      params.bookref || "",
      params.conceptref || "",
      {
        title: "Beyond good and evil",
        primaryAuthor: "Friedrich Nietzsche",
        conceptTitle: "The Religious Mood",
      },
      authorization
    )
      .then((response) => {
        // setConcept(response);
        setIsEditHead(false);
        setIsEdit(false);
        setSaving(false);
      })
      .catch(() => setSaving(false));
  };

  return (
    <>
      <div className="note-page page-animate">
        <Topbar title={`Concept | ${concept?.name}` || ""} />

        <MainSection>
          {concept &&
            conceptDetailList.map((item) => (
              <SectionContainer
                key={item._id}
                space={props.space}
                conceptDetail={item}
                concept={concept}
                onRefresh={_refreshConceptDetailList}
              />
            ))}
          <AddNewSection
            space={props.space}
            onRefresh={_refreshConceptDetailList}
          />
        </MainSection>
      </div>
    </>
  );
};

export default ConceptPage;
