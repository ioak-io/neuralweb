import { faMinus, faPenClip, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonVariantType, IconButton, ThemeType } from 'basicui';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

interface Props {
  onEdit?: any;
  onRemove?: any;
  disable: boolean;
  onAdd?: any;
}

const ViewControls = (props: Props) => {

  return (
    <div className='note-section-view-controls'>
      {props.onEdit && <IconButton disabled={props.disable} onClick={props.onEdit} circle variant={ButtonVariantType.fill} theme={ThemeType.default}>
        <FontAwesomeIcon icon={faPenClip} />
      </IconButton>}
      {props.onAdd && <IconButton disabled={props.disable} onClick={props.onAdd} circle variant={ButtonVariantType.fill} theme={ThemeType.default}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>}
      {props.onRemove && <IconButton disabled={props.disable} onClick={props.onRemove} circle variant={ButtonVariantType.fill} theme={ThemeType.default}>
        <FontAwesomeIcon icon={faMinus} />
      </IconButton>}
    </div>
  );
};

export default ViewControls;
