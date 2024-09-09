import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import Topbar from "../../../components/Topbar";
import { useNavigate } from "react-router-dom";
import MainContent from "../../../components/MainContent";
import { Button, Input } from "basicui";
import MainSection from "../../../components/MainSection";
import { uploadFilesForFlashcard } from "./service";

interface Props {
  space: string;
}

const FlashcardPage = (props: Props) => {
  const navigate = useNavigate();

  const authorization = useSelector((state: any) => state.authorization);

  const [files, setFiles] = useState<any[]>([]);

  const onFileChange = (event: any) => {
    setFiles(event.currentTarget.files);
  };

  const onUpload = () => {
    uploadFilesForFlashcard(props.space, files, authorization).then(
      (response) => console.log(response)
    );
  };

  return (
    <div className="flashcard-page">
      <Topbar title="Flashcards" />
      <MainSection>
        <Input type="file" onInput={onFileChange} multiple />
        <Button onClick={onUpload}>Upload</Button>
      </MainSection>
    </div>
  );
};

export default FlashcardPage;
