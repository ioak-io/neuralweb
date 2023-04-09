/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTag,
} from '@fortawesome/free-solid-svg-icons';

import './SearchResultItem.scss';
import NoteModel from '../../../model/NoteModel';
import NotetagModel from '../../../model/NotetagModel';
import { Link, ThemeType } from 'basicui';

interface Props {
  space: string;
  note: NoteModel;
}

const SearchResultItem = (props: Props) => {
  return (
    <div className="search-result-item">
      <Link href={`/#/${props.space}/note/${props.note.reference}`} theme={ThemeType.primary}>
        <p>{props.note.name}</p>
      </Link>
      {/* <div className="search-result-item__tag">
        {props.note.labels?.map((label: string) => (
          <div className="note-label">
            {label}
          </div>
        ))}
      </div> */}
      {/* <div>{props.note.content.substr(0, 500)}</div> */}
    </div>
  );
};

export default SearchResultItem;
