import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { generateChapters, getChapters, uploadBookPdf } from "./service";
import Topbar from "../../../components/Topbar";
import { Button, Input } from "basicui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import MainSection from "../../../components/MainSection";
import ChapterList from "./ChapterList";
import ChapterModel from "../../../model/ChapterModel";

interface Props {
  location: any;
  space: string;
}

const BookChapterPage = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [chapters, setChapters] = useState<ChapterModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileData, setFileData] = useState();

  useEffect(() => {
    if (authorization.isAuth && params.bookref) {
      _refreshChapters();
    }
  }, [authorization, params]);

  const _refreshChapters = () => {
    getChapters(props.space, params.bookref || "", authorization).then(
      (response) => {
        setChapters(response);
      }
    );
  };

  const closePopup = (isBookAdded: boolean) => {
    setIsOpen(false);
    if (isBookAdded) {
      _refreshChapters();
    }
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const onGenerateChapters = () => {
    setIsLoading(true);
    generateChapters(props.space, params.bookref || "", authorization).then(
      (response: any) => {
        setIsLoading(false);
      }
    );
  };

  const onBookUpload = (event: any) => {
    uploadBookPdf(
      props.space,
      params.bookref || "",
      event.currentTarget.files[0],
      authorization
    ).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="page-animate">
      <Topbar title="Library">
        <div className="topbar-actions">
          <Button onClick={onGenerateChapters} loading={isLoading}>
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Generate chapters
          </Button>
        </div>
      </Topbar>
      <MainSection>
        <Input placeholder="Search text" onInput={() => {}} />
        <Input onInput={onBookUpload} name="file" type="file" />
        <ChapterList space={props.space} chapters={chapters} />
      </MainSection>
    </div>
  );
};

export default BookChapterPage;
