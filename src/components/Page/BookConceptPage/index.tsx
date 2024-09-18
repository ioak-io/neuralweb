import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { generateConcepts, getConcepts } from "./service";
import Topbar from "../../../components/Topbar";
import { Button, Input } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import MainSection from "../../../components/MainSection";
import ConceptModel from "../../../model/ConceptModel";
import ConceptList from "../BookConceptPage/ConceptList";
import { isEmptyOrSpaces } from "../../../components/Utils";
import ThemeModel from "../../../model/ThemeModel";
import { getThemeDetailList, getThemesByBookref } from "../ThemePage/service";

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
  const [searchText, setSearchText] = useState("");
  const [conceptsFiltered, setConceptsFiltered] = useState<ConceptModel[]>([]);
  const [themeMap, setThemeMap] = useState<{ [key: string]: ThemeModel[] }>({});

  useEffect(() => {
    if (isEmptyOrSpaces(searchText)) {
      setConceptsFiltered(concepts);
    } else {
      const _searchText = searchText.toLowerCase();
      setConceptsFiltered(
        concepts.filter(
          (item) =>
            item.name.toLowerCase().includes(_searchText) ||
            item.description.toLowerCase().includes(_searchText)
        )
      );
    }
  }, [concepts, searchText]);

  useEffect(() => {
    if (authorization.isAuth && params.bookref) {
      _refreshConcepts();
      _refreshThemes();
    }
  }, [authorization, params]);

  const _refreshConcepts = () => {
    getConcepts(props.space, params.bookref || "", authorization).then(
      (response) => {
        setConcepts(response);
      }
    );
  };

  const _refreshThemes = () => {
    getThemesByBookref(props.space, params.bookref || "", authorization).then(
      (response: ThemeModel[]) => {
        const _themeMap: { [key: string]: ThemeModel[] } = {};
        response.forEach((item) => {
          if (_themeMap[item.conceptref || ""]) {
            _themeMap[item.conceptref || ""].push(item);
          } else {
            _themeMap[item.conceptref || ""] = [item];
          }
        });
        console.log(_themeMap)
        setThemeMap(_themeMap);
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

  const onSearchTextChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  };

  return (
    <div className="page-animate">
      <Topbar title="Key concepts">
        <div className="topbar-actions">
          <Button onClick={onGenerateConcepts} loading={isLoading}>
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Generate concepts
          </Button>
          <Button onClick={onGenerateConcepts} disabled={isLoading}>
            <FontAwesomeIcon icon={faPlus} />
            New concept
          </Button>
        </div>
      </Topbar>
      <MainSection>
        <Input
          placeholder="Search text"
          onInput={onSearchTextChange}
          autoFocus
        />
        <ConceptList space={props.space} concepts={conceptsFiltered} themeMap={themeMap} />
      </MainSection>
    </div>
  );
};

export default BookConceptPage;
