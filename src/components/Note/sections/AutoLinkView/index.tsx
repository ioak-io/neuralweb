import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { ButtonVariantType, IconButton, Input, Link, ThemeType } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faMinus, faPlus, faSearch, faTrash, faUnlink, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AutoLinkViewModel } from '../../AutoLinksSection/AutoLinkViewModel';
import KeywordViewer from '../KeywordViewer';

interface Props {
  space: string;
  note: NoteModel;
  addLink?: any;
  removeLink?: any;
  link?: AutoLinkViewModel;
}

const AutoLinkView = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="auto-link-view">
      {props.addLink && <IconButton variant={ButtonVariantType.outline} onClick={props.addLink}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>}
      <div>
        <Link className="auto-link-view__name" href={`/#/${props.space}/note/${props.note.reference}`}>
          {props.note.name}
        </Link>
        <div>
          {props.note.summary}
        </div>
        <KeywordViewer keywords={props.link?.keywords} />
      </div>
    </div>
  )
};

export default AutoLinkView;
