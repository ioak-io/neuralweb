/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import './Header.scss';
import NoteModel from '../../../model/NoteModel';
import { Select, SelectPropsConverter } from 'basicui';

interface Props {
  noteList: NoteModel[];
  viewBy: string;
  onChange: any;
}

const Header = (props: Props) => {

  return (
    <div className="search-results-header">
      <div className="search-results-header__left">
        {props.noteList.length} matching notes
      </div>
      <div className="search-results-header__right">
        <div className="search-results-header__right__label">
          View by
        </div>
        <Select
          value={[props.viewBy]}
          onInput={props.onChange}
          options={SelectPropsConverter.optionsFromSimpleList(['Label', 'Created Date'])} />
      </div>
    </div>
  );
};

export default Header;
