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
  const [noteMap, setNoteMap] = useState<any>({});

  useEffect(() => {
    const _noteMap: any = {};
    props.noteList.forEach((note) => {
      const _notePair = _getNotePairs(note);
      Object.keys(_notePair).forEach(group => {
        if (_noteMap[group]) {
          _noteMap[group].push(_notePair[group]);
        } else {
          _noteMap[group] = [_notePair[group]];
        }
      })
    })
    setNoteMap(_noteMap);
  }, [viewBy, props.noteList]);

  const _getNotePairs = (note: NoteModel) => {
    const _notePair: any = {};
    if (viewBy === 'Label') {
      note.labels.forEach(label => {
        _notePair[label] = note;
      });

      if (note.labels.length === 0) {
        _notePair['-'] = note;
      }
    }
    return _notePair;
  }

  const handleViewByChange = (event: any) => {
    setViewBy(event.currentTarget.value);
  }

  return (
    <div className="search-results">
      <Header noteList={props.noteList} viewBy={viewBy} onChange={handleViewByChange} />
      {Object.keys(noteMap).sort().map(group =>
        <NoteGroup noteList={noteMap[group]} group={group} space={props.space} key={group} />
      )}
    </div>
  );
};

export default SearchResults;
