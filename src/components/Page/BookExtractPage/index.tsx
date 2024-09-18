import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createExtract, getExtracts } from "./service";
import Topbar from "../../../components/Topbar";
import { Button, Input } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlug,
  faPlus,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import MainSection from "../../../components/MainSection";
import ConceptList from "../BookConceptPage/ConceptList";
import ExtractModel from "../../../model/ExtractModel";
import SectionContainer from "./SectionContainer";

interface Props {
  location: any;
  space: string;
}

const BookExtractPage = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [extracts, setExtracts] = useState<ExtractModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authorization.isAuth && params.bookref) {
      _refreshExtracts();
    }
  }, [authorization, params]);

  const _refreshExtracts = () => {
    getExtracts(props.space, params.bookref || "", authorization).then(
      (response) => {
        setExtracts(response);
      }
    );
  };

  const onAddNewExtract = () => {
    setIsLoading(true);
    createExtract(props.space, params.bookref || "", {}, authorization).then(
      (response) => {
        setIsLoading(false);
        _refreshExtracts();
      }
    );
  };

  return (
    <div className="page-animate">
      <Topbar title="Extracts" />

      <MainSection>
        {extracts.map((item) => (
          <SectionContainer
            key={item._id}
            space={props.space}
            extract={item}
            onRefresh={_refreshExtracts}
          />
        ))}
        <Button onClick={onAddNewExtract} loading={isLoading}>
          <FontAwesomeIcon icon={faPlus} />
          Add extract
        </Button>
      </MainSection>
    </div>
  );
};

export default BookExtractPage;
