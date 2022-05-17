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

import './FilterGroup.scss';
import NoteModel from '../../model/NoteModel';
import NotelinkModel from '../../model/NotelinkModel';
import LinkModel from '../../model/LinkModel';
import NodeModel from '../../model/NodeModel';
import { getFilterGroup } from './service';
import FilterGroupItem from './FilterGroupItem';

const queryString = require('query-string');

interface Props {
  space: string;
  data: any[];
  handleUpdate: any;
}

const FilterGroup = (props: Props) => {
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const companyList = useSelector((state: any) => state.company.items);

  const addNew = () => {
    props.handleUpdate({
      criteria: '',
      color: '#999',
    });
  };

  return (
    <div className="filter-group">
      <div className="filter-group__list">
        {props.data.map((item: any) => (
          <FilterGroupItem
            key={item._id}
            space={props.space}
            data={item}
            handleUpdate={props.handleUpdate}
          />
        ))}
      </div>
      <div className="filter-group__new">
        <button className="button" onClick={addNew}>
          New group
        </button>
      </div>
    </div>
  );
};

export default FilterGroup;
