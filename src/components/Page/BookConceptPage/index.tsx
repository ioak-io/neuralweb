import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { generateConcepts, getConcepts } from "./service";
import Topbar from "../../../components/Topbar";
import { Button, Input } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import MainSection from "../../../components/MainSection";
import ConceptModel from "../../../model/ConceptModel";
import ConceptList from "../BookConceptPage/ConceptList";

interface Props {
  location: any;
  space: string;
}

const BookConceptPage = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [concepts, setConcepts] = useState<ConceptModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authorization.isAuth && params.bookref) {
      _refreshConcepts();
    }
  }, [authorization, params]);

  const _refreshConcepts = () => {
    getConcepts(props.space, params.bookref || "", authorization).then(
      (response) => {
        setConcepts(response);
      }
    );
  };

  const closePopup = (isBookAdded: boolean) => {
    setIsOpen(false);
    if (isBookAdded) {
      _refreshConcepts();
    }
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const onGenerateConcepts = () => {
    setIsLoading(true);
    generateConcepts(props.space, params.bookref || "", authorization).then(
      (response: any) => {
        _refreshConcepts();
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="page-animate">
      <Topbar title="Library">
        <div className="topbar-actions">
          <Button onClick={onGenerateConcepts} loading={isLoading}>
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Generate concepts
          </Button>
        </div>
      </Topbar>
      <MainSection>
        <Input placeholder="Search text" onInput={() => {}} />
        <ConceptList space={props.space} concepts={concepts} />
      </MainSection>
    </div>
  );
};

export default BookConceptPage;
