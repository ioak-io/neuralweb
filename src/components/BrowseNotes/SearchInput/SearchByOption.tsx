/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SearchByOption.scss';
import NotetagModel from '../../../model/NotetagModel';
import { getNotetags } from '../../Page/GraphPage/service';
import { Input } from 'basicui';
import { SearchOptionType } from './SearchOptionType';

interface Props {
  onClick: any;
  option: SearchOptionType;
  searchPref: any;
}

const SearchByOption = (props: Props) => {

  return (
    <button
      onClick={props.onClick}
      className={`search-by-option ${props.searchPref[props.option.name] ? 'search-by-option--active' : ''}`}>
      {props.option.label}
    </button>
  );
};

export default SearchByOption;
