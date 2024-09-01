import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AiAssistHistory.scss";

export type AiAssistHistoryType = {
  sender: "user" | "bot";
  text: string;
};

interface Props {
  history: AiAssistHistoryType[];
}

const AiAssistHistory = (props: Props) => {
  return (
    <div className="ai-assist-history">
      {props.history.map((item, index) => (
        <div
          key={index}
          className={`ai-assist-history__item ai-assist-history__item--${item.sender}`}
          dangerouslySetInnerHTML={{ __html: item.text }}
        />
      ))}
    </div>
  );
};

export default AiAssistHistory;
