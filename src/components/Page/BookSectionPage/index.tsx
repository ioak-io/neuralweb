import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { generateSections, getSections } from "./service";
import Topbar from "../../../components/Topbar";
import { Button, Input, LoadingBlocks } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import MainSection from "../../../components/MainSection";
import SectionModel from "../../../model/SectionModel";
import SectionList from "../BookSectionPage/SectionList";
import { isEmptyOrSpaces } from "../../../components/Utils";
import ThemeModel from "../../../model/ThemeModel";
import { getThemeDetailList, getThemesByBookref } from "../ThemePage/service";
import BookLogModel from "../../../model/BookLogModel";
import { getBookGenerationLog } from "../BookPage/service";
import AddNewSection from "./AddNewSection";
import SectionSummaryContainer from "./SectionSummaryContainer";

interface Props {
  location: any;
  space: string;
}

const BookSectionPage = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [sections, setSections] = useState<SectionModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sectionsFiltered, setSectionsFiltered] = useState<SectionModel[]>([]);
  const [themeMap, setThemeMap] = useState<{ [key: string]: ThemeModel[] }>({});
  const [log, setLog] = useState<BookLogModel[]>([]);

  useEffect(() => {
    if (isEmptyOrSpaces(searchText)) {
      setSectionsFiltered(sections);
    } else {
      const _searchText = searchText.toLowerCase();
      setSectionsFiltered(
        sections.filter(
          (item) =>
            item.title.toLowerCase().includes(_searchText) ||
            item.description.toLowerCase().includes(_searchText)
        )
      );
    }
  }, [sections, searchText]);

  useEffect(() => {
    if (authorization.isAuth && params.bookref) {
      _refreshSections();
      _refreshLog();
    }
  }, [authorization, params]);

  const _refreshSections = () => {
    getSections(props.space, params.bookref || "", authorization).then(
      (response) => {
        setSections(response);
      }
    );
  };

  const _refreshLog = () => {
    getBookGenerationLog(props.space, authorization, params.bookref || "").then(
      (response) => {
        setLog(response);
      }
    );
  };

  const closePopup = (isBookAdded: boolean) => {
    setIsOpen(false);
    if (isBookAdded) {
      _refreshSections();
    }
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const onGenerateSections = () => {
    setIsLoading(true);
    generateSections(props.space, params.bookref || "", authorization).then(
      (response: any) => {
        // _refreshSections();
        _refreshLog();
        setIsLoading(false);
      }
    );
  };

  const onSearchTextChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  };

  const onRefresh = () => {
    _refreshLog();
    _refreshSections();
  };

  return (
    <div className="page-animate">
      <Topbar title="Key sections">
        <div className="topbar-actions">
          <Button onClick={onGenerateSections} disabled={isLoading}>
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Regenerate
          </Button>
        </div>
      </Topbar>
      <MainSection>
        <SectionSummaryContainer
          onGenerateSections={onGenerateSections}
          isGenerating={log.length > 0}
        >
          {log.length === 0 && (
            <SectionList
              space={props.space}
              sections={sectionsFiltered}
              themeMap={themeMap}
            />
          )}
          {log.length > 0 && (
            <LoadingBlocks numberOfBlocks={12} minWidth={30} maxWidth={60} />
          )}
        </SectionSummaryContainer>
        <AddNewSection space={props.space} onRefresh={onRefresh} />
      </MainSection>
    </div>
  );
};

export default BookSectionPage;
