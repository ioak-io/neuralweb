/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import './FilterResults.scss';
import FilterResultItem from './FilterResultItem';

interface Props {
  space: string;
  data: {
    results: any[];
    words: string[];
  };
  selectedNoteId: string;
}

const FilterResults = (props: Props) => {
  const history = useHistory();
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="filter-results">
      {props.data.results.map((item: any, index: number) => (
        <div className="filter-results__item" key={item._id || index}>
          <FilterResultItem
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

export default FilterResults;
