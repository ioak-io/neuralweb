import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoteModel from "../../../../model/NoteModel";
import NoteListItem from "./NoteListItem";
import { BrowseHistoryType } from "../types/BrowseHistoryType";

interface Props {
  space: string;
  notes: NoteModel[];
  browseHistory: BrowseHistoryType;
  onSelectNote: any;
}

type GroupedNotes = {
  [key: string]: NoteModel[];
};

const NoteListView = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [groupedNotes, setGroupedNotes] = useState<GroupedNotes>({});

  useEffect(() => {
    // Group notes by month and year whenever notes prop changes
    const grouped = props.notes.reduce((acc: GroupedNotes, note: NoteModel) => {
      const date = new Date(note.createdAt);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }

      acc[monthYear].push(note);

      return acc;
    }, {});

    setGroupedNotes(grouped);
  }, [props.notes]);

  return (
    <div className="browse-page-categoryview">
      {Object.keys(groupedNotes).map((monthYear) => (
        <div key={monthYear}>
          <div className="browse-page-categoryview__heading">
            <div className="browse-page-categoryview__heading-container">
              {monthYear}
            </div>
          </div>
          {groupedNotes[monthYear].map((note) => (
            <NoteListItem
              isSelected={props.browseHistory.selectedNoteIds.includes(
                note.reference
              )}
              key={note._id}
              note={note}
              onClick={() => props.onSelectNote(note.reference)}
              isPartOfSearch={
                props.browseHistory.metadataId === "related" &&
                props.browseHistory.metadataValue?.includes(note.reference)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NoteListView;
