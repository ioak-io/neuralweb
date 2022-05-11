/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './Backlinks.scss';
import { getNotelinksByReference } from './service';
import NotelinkModel from '../../model/NotelinkModel';
import NotelinkDetailModel from '../../model/NotelinkDetailModel';
import NoteModel from '../../model/NoteModel';
import BacklinkItem from './BacklinkItem';

interface Props {
  space: string;
  note: NoteModel;
}

const Backlinks = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const folderList = useSelector((state: any) => state.folder.items);
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const [backlinks, setBacklinks] = useState<NotelinkDetailModel[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.note.reference && authorization.isAuth) {
      getNotelinksByReference(
        props.space,
        props.note.reference,
        authorization
      ).then((response: any[]) => {
        if (response && response?.length >= 0) {
          const _backlinks = response.filter(
            (item: any) => item.linkedNoteRef === props.note.reference
          );
          setBacklinks(_backlinks);
        }
      });
    }
  }, [props.note.reference, authorization]);

  return (
    <div className="backlinks">
      {backlinks.map((item) => (
        <BacklinkItem key={item._id} space={props.space} backlink={item} />
      ))}
    </div>
  );
};

export default Backlinks;
