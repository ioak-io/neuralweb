import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RecentNote.scss";
import NoteModel from "../../model/NoteModel";
import MetadataEditor from "../../components/Note/sections/MetadataEditor";
import MetadataDefinitionModel from "../../model/MetadataDefinitionModel";
import MetadataViewer from "../../components/Note/sections/MetadataViewer";
import LabelViewer from "../../components/Note/sections/LabelViewer";
import LabelEditor from "../../components/Note/sections/LabelEditor";

interface Props {
  note: NoteModel;
  onChange: any;
}

const RecentNote = (props: Props) => {
  const metadataDefinitionList = useSelector(
    (state: any) => state.metadataDefinition.items
  );
  const [metadataDefinitionMap, setMetadataDefinitionMap] = useState<any>({});

  useEffect(() => {
    const _metadataDefinitionMap: any = {};
    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      if (_metadataDefinitionMap[item.group]) {
        _metadataDefinitionMap[item.group].push(item);
      } else {
        _metadataDefinitionMap[item.group] = [item];
      }
    });
    setMetadataDefinitionMap(_metadataDefinitionMap);
  }, [metadataDefinitionList]);

  const handleLabelChange = (labelsData: any) => {
    props.onChange({ ...props.note, ...labelsData });
  };

  return (
    <div className={`recent-note`}>
      {Object.keys(metadataDefinitionMap).map((group) => (
        <MetadataEditor
          key={group}
          onChange={props.onChange}
          note={props.note}
          group={group}
          metadataDefinitionList={metadataDefinitionMap[group]}
        />
      ))}
      <LabelEditor note={props.note} onChange={handleLabelChange} />
    </div>
  );
};

export default RecentNote;
