import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import NewNote from "../../../components/NewNote";

interface Props {
  location: any;
  space: string;
}

const NewNotePage = (props: Props) => {
  return <NewNote location={props.location} space={props.space} />;
};

export default NewNotePage;
