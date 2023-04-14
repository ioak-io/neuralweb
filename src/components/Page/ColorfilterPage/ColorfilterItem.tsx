/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';

import './ColorfilterItem.scss';
import ColorfilterModel from '../../../model/ColorfilterModel';
import { ButtonVariantType, IconButton, ThemeType } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface Props {
  space: string;
  data: ColorfilterModel;
}

const ColorfilterItem = (props: Props) => {
  const navigate = useNavigate();

  const gotoEditPage = () => {
    navigate(`/${props.space}/color-filter/${props.data._id}`);
  }

  return (
    <div className="colorfilter-item" key={props.data._id}>
      <div className="colorfilter-item">
        <div className="colorfilter-item__left">
          <div className="colorfilter-item__color-preview" style={{ backgroundColor: props.data.color }} />
          {props.data.name}
        </div>
      </div>
      <div className="colorfilter-item__right">
        <IconButton circle variant={ButtonVariantType.transparent} theme={ThemeType.primary} onClick={gotoEditPage}>
          <FontAwesomeIcon icon={faPenAlt} />
        </IconButton>
        <IconButton circle variant={ButtonVariantType.transparent} theme={ThemeType.danger} onClick={gotoEditPage}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
      </div>
    </div>
  );
};

export default ColorfilterItem;
