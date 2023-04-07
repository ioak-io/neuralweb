/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import NoteModel from '../../../model/NoteModel';
import SearchResultItem from './SearchResultItem';
import NotetagModel from '../../../model/NotetagModel';
import { getNotetags } from '../../Page/GraphPage/service';

interface Props {
  space: string;
  noteList: NoteModel[];
  handleChange: any;
}

const SearchResults = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="search-results">
      {props.noteList.map((item) => (
        <SearchResultItem
          key={item._id}
          space={props.space}
          note={item}
          handleChange={props.handleChange}
        />
      ))}
    </div>
  );
};

export default SearchResults;
