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
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import NoteModel from '../../model/NoteModel';

require('codemirror/mode/gfm/gfm');

interface Props {
  space: string;
  note: NoteModel;
}

const Viewer = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  const [noteMap, setNoteMap] = useState<any>({});

  const [isFistBlockAHeading, setIsFistBlockAHeading] = useState(false);

  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    const _noteMap: any = {};
    noteList.forEach((item: NoteModel) => {
      _noteMap[item.reference] = item;
    });
    setNoteMap(_noteMap);
  }, [noteList]);

  useEffect(() => {
    let _md = props.note.content.replace(/\n/g, '\n\n');
    _md = _md.replace(/\n{2,}/g, '\n\n');
    // _md = _md.replace(/\n{3,}/g, '\n\n\n');
    _md = _md.replace(
      /#(\w+)/gi,
      `<a href="/#/${props.space}/note/tag/$1">#$1</a>`
    );
    _md = _md.replace(/\[\[(\w+)\]\]/g, (reference) =>
      getLinkToFile(reference)
    );
    const _html = marked.parse(_md);
    setHtml(_html);
    setIsFistBlockAHeading(_html.startsWith('<h1') || _html.startsWith('<h2'));
  }, [props.note.content, noteMap]);

  const getLinkToFile = (reference: string) => {
    const _reference = reference.replace('[[', '').replace(']]', '');
    if (noteMap[_reference]) {
      return `<a href="/#/${props.space}/note?id=${_reference}">${noteMap[_reference].name}</a>`;
    }
    return `[[--deadlink(${_reference})--]]`;
  };

  return (
    <div className={`viewer ${isFistBlockAHeading ? 'viewer--offset' : ''}`}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Viewer;
