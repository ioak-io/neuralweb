/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import FocusTrap from 'focus-trap-react';
import { cloneDeep, sortBy, uniqBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import FolderModel from '../../model/FolderModel';

import './FileNameResults.scss';
import { searchNote } from './service';
import { isEmptyOrSpaces } from '../Utils';
import FileNameResultItem from './FileNameResultItem';

interface Props {
  space: string;
  data: {
    results: any[];
    words: string[];
  };
  selectedNoteId: string;
}

const FileNameResults = (props: Props) => {
  const history = useHistory();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="file-name-results">
      {props.data.results.map((item: any, index: number) => (
        <div className="file-name-results__item" key={item._id || index}>
          <FileNameResultItem
            space={props.space}
            data={item}
            words={props.data.words}
            selectedNoteId={props.selectedNoteId}
          />
        </div>
      ))}
    </div>
  );
};

export default FileNameResults;
