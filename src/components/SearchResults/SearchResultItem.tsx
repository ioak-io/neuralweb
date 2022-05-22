/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { marked } from 'marked';
import { format } from 'date-fns';
import CodeMirror from 'codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressAlt,
  faExpandAlt,
  faFileExport,
  faPlus,
  faTag,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import './SearchResultItem.scss';
import NoteModel from '../../model/NoteModel';
import NotetagModel from '../../model/NotetagModel';

require('codemirror/mode/gfm/gfm');

interface Props {
  space: string;
  note: NoteModel;
  tagsMap: any;
  handleChange: any;
}

const SearchResultItem = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  return (
    <div className="search-result-item">
      <a href={`/#/${props.space}/note?id=${props.note.reference}`}>
        <h3 className="text-xl">{props.note.name}</h3>
      </a>
      <div>{props.note.content.substr(0, 500)}</div>
      <div className="search-result-item__tag">
        {props.tagsMap[props.note.reference]?.map((item: NotetagModel) => (
          <button
            key={item._id}
            className="button search-result-item__tag__item bg-light-400 dark:bg-dark-200 hover:bg-light-500 hover:dark:bg-dark-100"
            onClick={() => props.handleChange(`tag:${item.name}`)}
          >
            <FontAwesomeIcon icon={faTag} />
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResultItem;
