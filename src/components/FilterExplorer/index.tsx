/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { cloneDeep, sortBy, uniqBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import FolderModel from '../../model/FolderModel';

import './style.scss';
import { filterNote } from './service';
import SearchBlock from './SearchBlock';
import FilterResults from './FilterResults';

interface Props {
  space: string;
  selectedNoteId: string;
}

const FilterExplorer = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const folderList = useSelector((state: any) => state.folder.items);
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const [folderMap, setFolderMap] = useState<any>({});
  const [fileNameResults, setFileNameResults] = useState<any>({
    results: [],
    words: [
      {
        name: [],
        path: [],
        content: [],
      },
    ],
  });

  useEffect(() => {
    const _folderMap: any = {};
    folderList.forEach((item: FolderModel) => {
      _folderMap[item._id] = item;
    });
    setFolderMap(_folderMap);
  }, [folderList]);

  const handleSearch = (text: string) => {
    // if (text.startsWith('file:')) {
    //   const words: string[] = text
    //     .substr(5)
    //     .replace(/  +/g, ' ')
    //     .trim()
    //     .toLowerCase()
    //     .split(' ');
    //   const res = noteList.filter((item: NoteModel) => {
    //     return words.every((item2) => item.name.toLowerCase().includes(item2));
    //   });
    //   setFileNameResults({ results: res, words });
    // } else {
    filterNote(props.space, text, authorization).then((response) => {
      console.log(response);
      setFileNameResults(response);
    });
    // }
  };

  return (
    <div className="search-explorer">
      <div className="search-explorer__header">
        <div>Search explorer</div>
      </div>
      <div className="search-explorer__body">
        <div className="search-explorer__body__input">
          <SearchBlock space={props.space} handleSubmit={handleSearch} />
        </div>
        <div className="search-explorer__body__result">
          <FilterResults
            data={fileNameResults}
            space={props.space}
            selectedNoteId={props.selectedNoteId}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterExplorer;