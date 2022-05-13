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
  showMoreContext: boolean;
  collapseResults: boolean;
  textLink?: boolean;
  backlinks: NotelinkDetailModel[];
  handleRefetchLinks: any;
}

const Backlinks = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const folderList = useSelector((state: any) => state.folder.items);
  const noteList = useSelector((state: any) => state.note.items);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  return (
    <div className="backlinks">
      {props.backlinks.map((item) => (
        <BacklinkItem
          key={item._id}
          space={props.space}
          backlink={item}
          textLink={props.textLink}
          showMoreContext={props.showMoreContext}
          collapseResults={props.collapseResults}
          handleRefetchLinks={props.handleRefetchLinks}
        />
      ))}
    </div>
  );
};

export default Backlinks;
