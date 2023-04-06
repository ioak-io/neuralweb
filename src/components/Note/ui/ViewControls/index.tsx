import { faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonVariantType, IconButton, ThemeType } from 'basicui';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

interface Props {
  onEdit: any;
  disable: boolean;
}

const ViewControls = (props: Props) => {

  return (
    <div className='note-section-view-controls'>
      <IconButton disabled={props.disable} onClick={props.onEdit} circle variant={ButtonVariantType.fill} theme={ThemeType.default}>
        <FontAwesomeIcon icon={faPenClip} />
      </IconButton>
    </div>
  );
};

export default ViewControls;
