/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import FocusTrap from 'focus-trap-react';
import { cloneDeep, sortBy, uniqBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import FolderModel from '../../model/FolderModel';

import './FileNameResultItem.scss';
import { searchNote } from './service';
import { isEmptyOrSpaces } from '../Utils';

interface Props {
  space: string;
  data: any;
  words: string[];
  selectedNoteId: string;
}

const FileNameResultItem = (props: Props) => {
  const history = useHistory();
  const authorization = useSelector((state: any) => state.authorization);

  const [name, setName] = useState('');

  useEffect(() => {
    if (props.data && props.words?.length > 0) {
      let _name = props.data.name;
      for (let i = 0; i < props.words.length; i += 1) {
        _name = _name.replace(
          new RegExp(props.words[i], 'ig'),
          (word: string) => `<span>${word}</span>`
        );
      }
      setName(_name);
    }
  }, [props.data, props.words]);

  const goToNote = () => {
    history.push(`/${props.space}/note?id=${props.data.reference}`);
  };

  return (
    <button
      className={`button file-name-result-item hover:bg-light-400 hover:dark:bg-dark-300 ${
        props.selectedNoteId === props.data.reference
          ? 'bg-light-400 dark:bg-dark-300'
          : ''
      }`}
      onClick={goToNote}
    >
      <div dangerouslySetInnerHTML={{ __html: name }} />
    </button>
  );
};

export default FileNameResultItem;
