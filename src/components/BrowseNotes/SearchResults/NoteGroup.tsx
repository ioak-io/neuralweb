/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import './Header.scss';
import NoteModel from '../../../model/NoteModel';
import { Select, SelectPropsConverter } from 'basicui';
import SearchResultItem from './SearchResultItem';

interface Props {
  noteList: NoteModel[];
  group: string;
  space: string;
}

const NoteGroup = (props: Props) => {

  return (
    <div className="search-results-note-group">
      <h4 className="search-results-note-group__header">
        {props.group}
      </h4>
      <div className="search-results-note-group__main">

        {props.noteList.map((item) => (
          <SearchResultItem
            key={item._id}
            note={item}
            space={props.space}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteGroup;
