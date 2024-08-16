import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import PreviewNote from "../../../components/PreviewNote";

interface Props {
  location: any;
  space: string;
}

const NotePage = (props: Props) => {
  const params = useParams();

  return <>{params.id && <PreviewNote reference={params.id} space={props.space} />}</>;
};

export default NotePage;
