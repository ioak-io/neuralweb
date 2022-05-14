/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import FocusTrap from 'focus-trap-react';
import { cloneDeep, sortBy, uniqBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import FolderModel from '../../model/FolderModel';

import './SearchBlock.scss';
import { searchNote } from './service';
import { isEmptyOrSpaces } from '../Utils';

interface Props {
  space: string;
  handleSearch: any;
}

const SearchBlock = (props: Props) => {
  const inputRef = useRef<any>(null);
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const folderList = useSelector((state: any) => state.folder.items);
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    text: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: any) => {
    if (
      isEmptyOrSpaces(event.target.value) ||
      event.target.value.endsWith(' ')
    ) {
      setIsOpen(true);
    }
    setState({ ...state, text: event.target.value });
    inputRef.current.focus();
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    props.handleSearch(state.text);
  };

  const handleChooseFile = () => {
    setIsOpen(false);
    setState({ ...state, text: `${state.text}file:` });
    inputRef.current.focus();
  };

  const handleChooseTag = () => {
    setIsOpen(false);
    setState({ ...state, text: `${state.text}tag:` });
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSearch} autoComplete="off">
      <div className="search-block">
        <input
          name="text"
          className="bg-light-500 dark:bg-dark-200"
          value={state.text}
          onInput={handleChange}
          onFocus={handleFocus}
          onBlur={() =>
            setTimeout(() => {
              setIsOpen(false);
            }, 100)
          }
          placeholder="Search text"
          ref={inputRef}
          autoComplete="off"
        />
        {isOpen && (isEmptyOrSpaces(state.text) || state.text.endsWith(' ')) && (
          // <FocusTrap
          //   focusTrapOptions={{
          //     onDeactivate: () => setIsOpen(false),
          //     clickOutsideDeactivates: true,
          //     initialFocus: false,
          //   }}
          // >
          <div className="search-block__popup bg-light-200 dark:bg-dark-300">
            <div className="search-block__popup__header text-light-500 dark:text-dark-100">
              SEARCH OPTIONS
            </div>
            <button
              type="button"
              className="button hover:bg-light-500 dark:hover:bg-dark-500"
              onClick={handleChooseFile}
            >
              <span className="search-block__variant-label">file: </span>
              <span className="text-dark-500 dark:text-light-100">
                match file name
              </span>
            </button>
            <button
              type="button"
              className="button hover:bg-light-500 dark:hover:bg-dark-500"
              onClick={handleChooseTag}
            >
              <span className="search-block__variant-label">tag: </span>
              <span className="text-dark-500 dark:text-light-100">
                match tag
              </span>
            </button>
          </div>
          // </FocusTrap>
        )}
      </div>
    </form>
  );
};

export default SearchBlock;
