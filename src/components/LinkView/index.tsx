/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './style.scss';
import { getNotelinksByReference } from './service';
import NotelinkModel from '../../model/NotelinkModel';
import NotelinkDetailModel from '../../model/NotelinkDetailModel';
import NoteModel from '../../model/NoteModel';
import Backlinks from './Backlinks';

interface Props {
  space: string;
  note: NoteModel;
}

const LinkView = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const folderList = useSelector((state: any) => state.folder.items);
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  return (
    <div className="link-view">
      <h1 className="text-4xl">Backlinks</h1>
      <Backlinks space={props.space} note={props.note} />
    </div>
  );
};

export default LinkView;
