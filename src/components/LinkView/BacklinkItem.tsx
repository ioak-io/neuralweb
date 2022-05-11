/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './BacklinkItem.scss';
import { getNotelinksByReference } from './service';
import NotelinkModel from '../../model/NotelinkModel';
import NotelinkDetailModel from '../../model/NotelinkDetailModel';
import NoteModel from '../../model/NoteModel';

interface Props {
  space: string;
  backlink: NotelinkDetailModel;
}

const BacklinkItem = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const folderList = useSelector((state: any) => state.folder.items);
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const [text, setText] = useState<{ text: string; hasMore: boolean }>({
    text: '',
    hasMore: false,
  });
  const [showingMore, setShowingMore] = useState<boolean>(false);
  const dispatch = useDispatch();

  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  const [noteMap, setNoteMap] = useState<any>({});

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
      _text = _text.replace(/\[\[(\w+)\]\]/g, (reference) =>
        getLinkToFile(reference)
      );
      const trimmedText = trimText(_text);
      setText(trimmedText);
    }
  }, [props.backlink, noteMap, showingMore]);

  const trimText = (_text: string) => {
    let numberOfCharacters = 600;
    if (showingMore) {
      numberOfCharacters = 1200;
    }
    const index = _text.indexOf(`<a class='highlight-link'`);

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

    const fromStart = startIndex === 0;
    const toEnd = endIndex === _text.length;

    return {
      hasMore: !fromStart || !toEnd,
      text: `${!fromStart ? '...' : ''}${_text.substr(startIndex, endIndex)}${
        !toEnd ? '...' : ''
      }`,
    };
  };

  const getLinkToFile = (reference: string) => {
    const _reference = reference.replace('[[', '').replace(']]', '');
    if (noteMap[_reference]) {
      return `<a ${
        _reference === props.backlink.linkedNoteRef
          ? "class='highlight-link'"
          : ''
      } href="/#/${props.space}/note?id=${_reference}">${
        noteMap[_reference].name
      }</a>`;
    }
    return `[[--deadlink(${_reference})--]]`;
  };

  const toggleShowMore = () => {
    setShowingMore(!showingMore);
  };

  return (
    <div className="backlink-item">
      <a
        href={`/#/${props.space}/note?id=${props.backlink.sourceNoteRef}`}
        className="backlink-item__title text-2xl"
      >
        {props.backlink.sourceNote.name}
      </a>
      <div className="backlink-item__description">
        <div
          className="backlink-item__description__text"
          dangerouslySetInnerHTML={{
            __html: text.text,
          }}
        />
        {(text.hasMore || showingMore) && (
          <button className="button" onClick={toggleShowMore}>
            {showingMore ? 'show less' : 'show more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default BacklinkItem;
