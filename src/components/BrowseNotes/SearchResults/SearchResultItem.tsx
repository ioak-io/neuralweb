/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faTag,
} from '@fortawesome/free-solid-svg-icons';

import './SearchResultItem.scss';
import NoteModel from '../../../model/NoteModel';
import NotetagModel from '../../../model/NotetagModel';
import { Link, ThemeType } from 'basicui';
import { isEmptyOrSpaces } from '../../../components/Utils';
import * as DateUtils from '../../Lib/DateUtils';

interface Props {
  space: string;
  note: NoteModel;
  show: string[];
  noHyperLink?: boolean;
}

const SearchResultItem = (props: Props) => {
  return (
    <div className="search-result-item">
      {props.show.includes('Created on') && <div className="search-result-item__date">{DateUtils.formatDateText(props.note.createdAt, DateUtils.FORMAT_FULL_DATE)}</div>}
      <div className="search-result-item__title">
        {props.show.includes('Type') && <div className={`search-result-item__note-type note-type-${props.note.type}`}>{props.note.type}</div>}
        {!props.noHyperLink && <Link href={`/#/${props.space}/note/${props.note.reference}`} theme={ThemeType.primary}>
          {props.note.name}
        </Link>}
        {props.noHyperLink && <div>
          {props.note.name}
        </div>}
      </div>
      {props.show.includes('Summary') && <div>{props.note.summary || props.note.autoGeneratedSummary}</div>}
      {props.show.includes('Labels') && <div className="note-label-list">
        {!isEmptyOrSpaces(props.note.primaryLabel) &&
          <div className="note-label">
            <FontAwesomeIcon icon={faStar} />
            {props.note.primaryLabel}
          </div>
        }
        {props.note.labels.filter(item => item !== props.note.primaryLabel).map((label: string) => (
          <div className="note-label">
            {label}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default SearchResultItem;
