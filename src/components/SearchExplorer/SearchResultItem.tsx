/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import FocusTrap from 'focus-trap-react';
import { cloneDeep, sortBy, uniqBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faCircleDot,
  faFolderPlus,
} from '@fortawesome/free-solid-svg-icons';
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
  const [showingMore, setShowingMore] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showStart, setShowStart] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);

  const [name, setName] = useState('');
  const [content, setContent] = useState<{
    text: string;
    startIndex: number;
    endIndex: number;
    hasMoreAtStart: boolean;
    hasMoreAtEnd: boolean;
    showMoreAtStart: boolean;
    showMoreAtEnd: boolean;
  }>({
    text: '',
    startIndex: 0,
    endIndex: 0,
    hasMoreAtStart: false,
    hasMoreAtEnd: false,
    showMoreAtStart: false,
    showMoreAtEnd: false,
  });

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
    }
    setName(_name);
    const trimmedContent = trimText(_content || '');
    console.log(trimmedContent);
    setContent(trimmedContent);
  }, [props.data, props.words, showStart, showEnd]);

  const trimText = (_text: string) => {
    let numberOfCharacters = 200;
    if (showingMore) {
      numberOfCharacters = 500;
    }
    const index = _text.indexOf('<span');

    let startIndex = 0;
    let endIndex = _text.length;
    if (_text.length < numberOfCharacters) {
      startIndex = 0;
      endIndex = _text.length;
    } else if (index <= numberOfCharacters / 2) {
      startIndex = 0;
      endIndex = numberOfCharacters;
    } else {
      startIndex = index - numberOfCharacters / 2;
      if (_text.length > startIndex + numberOfCharacters) {
        endIndex = numberOfCharacters;
      } else {
        endIndex = _text.length;
        if (endIndex - numberOfCharacters < 0) {
          startIndex = 0;
        } else {
          startIndex = endIndex - numberOfCharacters;
        }
      }
    }

    const effectiveStartIndex = showStart ? 0 : startIndex;
    const effectiveEndIndex = showEnd
      ? _text.length
      : endIndex + startIndex - effectiveStartIndex;
    let text = effectiveStartIndex !== 0 ? '...' : '';
    text += _text.substr(effectiveStartIndex, effectiveEndIndex).trim();
    text += effectiveEndIndex !== _text.length ? '...' : '';

    return {
      startIndex: effectiveStartIndex,
      endIndex: effectiveEndIndex,
      text,
      sourceText: _text,
      showMoreAtStart: startIndex !== 0,
      showMoreAtEnd: endIndex !== _text.length,
      hasMoreAtStart: effectiveStartIndex !== 0,
      hasMoreAtEnd: effectiveEndIndex !== _text.length,
    };
  };

  const goToNote = () => {
    history.push(`/${props.space}/note?id=${props.data.reference}`);
  };

  const toggleExpandStart = () => {
    setShowStart(!showStart);
  };
  const toggleExpandEnd = () => {
    setShowEnd(!showEnd);
  };

  return (
    <div className="search-result-item">
      <button
        className={`button text-tiny search-result-item__main text-dark-100 dark:text-light-600 hover:bg-light-400 hover:dark:bg-dark-300 ${
          props.selectedNoteId === props.data.reference
            ? 'bg-light-400 dark:bg-dark-300'
            : ''
        }`}
        onClick={goToNote}
      >
        <div
          className="search-result-item__main__title"
          dangerouslySetInnerHTML={{ __html: name }}
        />
        <div dangerouslySetInnerHTML={{ __html: content.text }} />
      </button>
      {content.showMoreAtStart && (
        <button
          className={`search-result-item__expand-start  ${
            content.hasMoreAtStart
              ? 'search-result-item__expand-start'
              : 'search-result-item__expand-start--invert'
          }`}
          onClick={toggleExpandStart}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
      {content.showMoreAtEnd && (
        <button
          className={`search-result-item__expand-end  ${
            content.hasMoreAtEnd
              ? 'search-result-item__expand-end'
              : 'search-result-item__expand-end--invert'
          }`}
          onClick={toggleExpandEnd}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      )}
    </div>
  );
};

export default SearchResultItem;
