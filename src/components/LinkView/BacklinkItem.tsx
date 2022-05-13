/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

import './BacklinkItem.scss';
import { addPossibleLink, getNotelinksByReference } from './service';
import NotelinkModel from '../../model/NotelinkModel';
import NotelinkDetailModel from '../../model/NotelinkDetailModel';
import NoteModel from '../../model/NoteModel';

interface Props {
  space: string;
  backlink: NotelinkDetailModel;
  showMoreContext: boolean;
  collapseResults: boolean;
  textLink?: boolean;
  handleRefetchLinks: any;
}

const BacklinkItem = (props: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const folderList = useSelector((state: any) => state.folder.items);
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const [text, setText] = useState<{
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
  const [showingMore, setShowingMore] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showStart, setShowStart] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);
  const dispatch = useDispatch();

  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  const [noteMap, setNoteMap] = useState<any>({});

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleExpandStart = () => {
    setShowStart(!showStart);
  };
  const toggleExpandEnd = () => {
    setShowEnd(!showEnd);
  };

  const addLink = () => {
    console.log(props.backlink);
    addPossibleLink(
      props.space,
      props.backlink.sourceNoteRef,
      props.backlink.linkedNoteRef,
      authorization
    ).then(() => {
      props.handleRefetchLinks();
    });
  };

  useEffect(() => {
    recomputeHeight();
  }, [isExpanded]);

  useEffect(() => {
    setShowStart(props.showMoreContext);
    setShowEnd(props.showMoreContext);
  }, [props.showMoreContext]);

  useEffect(() => {
    setIsExpanded(!props.collapseResults);
  }, [props.collapseResults]);

  const recomputeHeight = () => {
    const el: any = elementRef.current;
    if (isExpanded) {
      el.style.height = `${el.scrollHeight}px`;
      setTimeout(() => {
        el.style.height = 'auto';
      }, 100);
    } else {
      if (el.style.height === 'auto') {
        el.style.height = `${el.scrollHeight}px`;
      }
      setTimeout(() => {
        el.style.height = '0px';
      }, 10);
    }
  };

  useEffect(() => {
    const _noteMap: any = {};
    noteList.forEach((item: NoteModel) => {
      _noteMap[item.reference] = item;
    });
    setNoteMap(_noteMap);
  }, [noteList]);

  useEffect(() => {
    if (props.backlink) {
      let _text = props.backlink.sourceNote.content;
      if (props.textLink) {
        const linkedNoteName = noteMap[props.backlink.linkedNoteRef]?.name;
        if (linkedNoteName) {
          _text = _text.replace(
            new RegExp(linkedNoteName, 'ig'),
            `<span>${linkedNoteName}</span>`
          );
        }
      } else {
        _text = _text.replace(/\[\[(\w+)\]\]/g, (reference) =>
          getLinkToFile(reference)
        );
      }
      const trimmedText = trimText(_text);
      setText(trimmedText);
    }
  }, [props.backlink, noteMap, showingMore, showStart, showEnd]);

  const trimText = (_text: string) => {
    let numberOfCharacters = 250;
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

    console.log({
      startIndex: effectiveStartIndex,
      endIndex: effectiveEndIndex,
      text,
      sourceText: _text,
      showMoreAtStart: startIndex !== 0,
      showMoreAtEnd: endIndex !== _text.length,
      hasMoreAtStart: effectiveStartIndex !== 0,
      hasMoreAtEnd: effectiveEndIndex !== _text.length,
      textLength: _text.length,
    });
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

  const getLinkToFile = (reference: string) => {
    const _reference = reference.replace('[[', '').replace(']]', '');
    if (noteMap[_reference] && _reference === props.backlink.linkedNoteRef) {
      // return `<a href="/#/${props.space}/note?id=${_reference}">${noteMap[_reference].name}</a>`;
      return `<span>[[${noteMap[_reference].name}]]</span>`;
    }
    if (noteMap[_reference]) {
      return `[[${noteMap[_reference].name}]]`;
    }
    return `[[--deadlink(${_reference})--]]`;
  };

  const toggleShowMore = () => {
    setShowingMore(!showingMore);
  };

  return (
    <div className="backlink-item text-dark-100 dark:text-light-600 text-tiny">
      <div className="backlink-item__title">
        <a href={`/#/${props.space}/note?id=${props.backlink.sourceNoteRef}`}>
          {props.backlink.sourceNote.name}
        </a>
        <button
          className={`backlink-item__expand ${
            isExpanded
              ? 'backlink-item__expand--expanded'
              : 'backlink-item__expand--collapsed'
          }`}
          onClick={toggleExpansion}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
      <div
        className={`backlink-item__description hover:bg-light-200 dark:hover:bg-dark-300 ${
          isExpanded
            ? 'backlink-item__description--expanded'
            : 'backlink-item__description--collapsed'
        }`}
        ref={elementRef}
      >
        <div
          // href={`/#/${props.space}/note?id=${props.backlink.sourceNoteRef}`}
          className="backlink-item__description__text"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: text.text,
            }}
          />
        </div>
        {text.showMoreAtStart && (
          <button
            className={`backlink-item__description__expand-start ${
              text.hasMoreAtStart
                ? 'backlink-item__description__expand-start'
                : 'backlink-item__description__expand-start--invert'
            }`}
            onClick={toggleExpandStart}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        )}
        {text.showMoreAtEnd && (
          <button
            className={`backlink-item__description__expand-end  ${
              text.hasMoreAtEnd
                ? 'backlink-item__description__expand-end'
                : 'backlink-item__description__expand-end--invert'
            }`}
            onClick={toggleExpandEnd}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        )}
        {props.textLink && (
          <button
            className="backlink-item__description__link"
            onClick={addLink}
          >
            Link
          </button>
        )}
      </div>
    </div>
  );
};

export default BacklinkItem;
