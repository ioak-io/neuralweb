/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import NoteModel from '../../model/NoteModel';
import SearchResultItem from './SearchResultItem';
import NotetagModel from '../../model/NotetagModel';
import { getNotetags } from '../Page/GraphPage/service';

interface Props {
  space: string;
  noteList: NoteModel[];
  handleChange: any;
}

const SearchResults = (props: Props) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );

  const [notetagsMap, setNotetagsMap] = useState<any>({});

  useEffect(() => {
    if (authorization.isAuth) {
      getNotetags(props.space, authorization).then(
        (response: NotetagModel[]) => {
          const _notetagsMap: any = {};
          response?.forEach((item) => {
            _notetagsMap[item.noteRef] = [
              ...(_notetagsMap[item.noteRef] || []),
              item,
            ];
          });
          setNotetagsMap(_notetagsMap);
        }
      );
    }
  }, [authorization]);

  return (
    <div className="search-results">
      {props.noteList.map((item) => (
        <SearchResultItem
          key={item._id}
          space={props.space}
          note={item}
          tagsMap={notetagsMap}
          handleChange={props.handleChange}
        />
      ))}
    </div>
  );
};

export default SearchResults;
