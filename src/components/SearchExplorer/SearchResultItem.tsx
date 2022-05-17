/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import FocusTrap from 'focus-trap-react';
import { cloneDeep, sortBy, uniqBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import FolderModel from '../../model/FolderModel';

import './SearchResultItem.scss';
import { searchNote } from './service';
import { isEmptyOrSpaces } from '../Utils';

interface Props {
  space: string;
  data: any;
  words: any;
  selectedNoteId: string;
}

const SearchResultItem = (props: Props) => {
  const history = useHistory();
  const authorization = useSelector((state: any) => state.authorization);

  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    let _name = props.data?.name;
    let _content = null;
    if (props.data && props.words?.name?.length > 0) {
      _name = props.data.name;
      for (let i = 0; i < props.words.name.length; i += 1) {
        _name = _name.replace(
          new RegExp(props.words.name[i], 'ig'),
          (word: string) => `<span>${word}</span>`
        );
      }
    }
    if (props.data && props.words?.content?.length > 0) {
      _content = props.data.content;
      for (let i = 0; i < props.words.content.length; i += 1) {
        _content = _content.replace(
          new RegExp(props.words.content[i], 'ig'),
          (word: string) => `<span>${word}</span>`
        );
      }
      console.log(_content, props.words.content);
    }
    setName(_name);
    setContent(_content);
  }, [props.data, props.words]);

  const goToNote = () => {
    history.push(`/${props.space}/note?id=${props.data.reference}`);
  };

  return (
    <button
      className={`button search-result-item hover:bg-light-400 hover:dark:bg-dark-300 ${
        props.selectedNoteId === props.data.reference
          ? 'bg-light-400 dark:bg-dark-300'
          : ''
      }`}
      onClick={goToNote}
    >
      <div dangerouslySetInnerHTML={{ __html: name }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </button>
  );
};

export default SearchResultItem;
