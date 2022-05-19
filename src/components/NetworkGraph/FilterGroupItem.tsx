/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { usePopper } from 'react-popper';
import { addDays, format } from 'date-fns';
import {
  faCheck,
  faGear,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as d3 from 'd3';
import { cloneDeep } from 'lodash';

import './FilterGroupItem.scss';
import NoteModel from '../../model/NoteModel';
import NotelinkModel from '../../model/NotelinkModel';
import LinkModel from '../../model/LinkModel';
import NodeModel from '../../model/NodeModel';
import { getFilterGroup } from './service';
import SearchBlock from '../FilterExplorer/SearchBlock';

const queryString = require('query-string');

interface Props {
  space: string;
  data: any;
  handleUpdate: any;
}

const FilterGroupItem = (props: Props) => {
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const companyList = useSelector((state: any) => state.company.items);
  const [state, setState] = useState<any>({});

  useEffect(() => {
    setState({ ...props.data });
  }, [props.data]);

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleUpdate = () => {
    props.handleUpdate({ ...state });
  };

  const handleCriteriaChange = (criteria: any) => {
    console.log(criteria);
    setState({ ...state, criteria });
  };

  return (
    <div className="filter-group-item">
      <SearchBlock
        space={props.space}
        handleChange={handleCriteriaChange}
        criteria={state.criteria}
      />
      <input
        className="filter-group-item__color"
        value={state.color}
        type="color"
        name="color"
        onInput={handleChange}
      />
      <button className="button" onClick={handleUpdate}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
};

export default FilterGroupItem;
