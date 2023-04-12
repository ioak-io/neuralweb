/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import NoteModel from '../../../model/NoteModel';
import SearchResultItem from './SearchResultItem';
import NotetagModel from '../../../model/NotetagModel';
import { getNotetags } from '../../Page/GraphPage/service';
import { Select, SelectPropsConverter } from 'basicui';
import Header from './Header';
import NoteGroup from './NoteGroup';

interface Props {
  space: string;
  noteList: NoteModel[];
  handleChange: any;
}

const SearchResults = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [viewBy, setViewBy] = useState('Label');
  const [show, setShow] = useState<string[]>(['Type', 'Summary']);
  const [noteMap, setNoteMap] = useState<any>({});

  useEffect(() => {
    const _noteMap: any = {};
    props.noteList.forEach((note) => {
      const group = note.primaryLabel || '-';
      if (_noteMap[group]) {
        _noteMap[group].push(note);
      } else {
        _noteMap[group] = [note];
      }
    })
    setNoteMap(_noteMap);
    console.log(_noteMap);
  }, [viewBy, props.noteList]);

  const handleViewChange = (data: any) => {
    setViewBy(data.viewBy);
    setShow(data.show);
  }

  return (
    <div className="search-results">
      <Header noteList={props.noteList} show={show} viewBy={viewBy} onChange={handleViewChange} />
      <div className="search-results__main">
        {Object.keys(noteMap).filter(item => item !== '-').sort().map(group =>
          <NoteGroup noteList={noteMap[group]} group={group} space={props.space} key={group} show={show} />
        )}
        {noteMap['-'] && <NoteGroup noteList={noteMap['-']} group='-' space={props.space} show={show} />}
      </div>
    </div>
  );
};

export default SearchResults;
