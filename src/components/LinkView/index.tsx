/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesDown,
  faArrowsLeftRightToLine,
  faCaretRight,
  faPlus,
  faTimes,
  faUpRightAndDownLeftFromCenter,
} from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { getNotelinksByReference, getPossibleLinkedNotes } from './service';
import NotelinkModel from '../../model/NotelinkModel';
import NotelinkDetailModel from '../../model/NotelinkDetailModel';
import NoteModel from '../../model/NoteModel';
import Backlinks from './Backlinks';

interface Props {
  space: string;
  note: NoteModel;
  handleClose: any;
}

const LinkView = (props: Props) => {
  const linkedSectionElementRef = useRef<HTMLDivElement>(null);
  const unlinkedSectionElementRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const [linkedNotes, setLinkedNotes] = useState<NotelinkDetailModel[]>([]);
  const [unlinkedNotes, setUnlinkedNotes] = useState<NotelinkDetailModel[]>([]);

  const [isLinkedSectionExpanded, setIsLinkedSectionExpanded] = useState(true);
  const [isUnlinkedSectionExpanded, setIsUnlinkedSectionExpanded] =
    useState(true);
  const [showMoreContext, setShowMoreContext] = useState(false);
  const [collapseResults, setCollapseResults] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, [props.note.reference, authorization]);

  const fetchLinks = () => {
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
          setLinkedNotes(_backlinks);
        }
      });
      getPossibleLinkedNotes(
        props.space,
        props.note.reference,
        authorization
      ).then((response: any[]) => {
        if (response && response?.length >= 0) {
          const _backlinks = response.filter(
            (item: any) => item.linkedNoteRef === props.note.reference
          );
          setUnlinkedNotes(_backlinks);
        }
      });
    }
  };

  useEffect(() => {
    recomputeHeight(isLinkedSectionExpanded, linkedSectionElementRef);
  }, [isLinkedSectionExpanded]);

  useEffect(() => {
    recomputeHeight(isUnlinkedSectionExpanded, unlinkedSectionElementRef);
  }, [isUnlinkedSectionExpanded]);

  const recomputeHeight = (isExpanded: boolean, elementRef: any) => {
    const el: any = elementRef.current;
    if (isExpanded) {
      el.style.height = `${el.scrollHeight}px`;
      setTimeout(() => {
        el.style.height = 'auto';
      }, 100);
    } else {
      if (el.style.height === 'auto') {
        el.style.height = `${el.scrollHeight}px`;
      }
      setTimeout(() => {
        el.style.height = '0px';
      }, 10);
    }
  };

  return (
    <div className="link-view-wrapper">
      <div className="link-view-topbar text-dark-100 dark:text-light-600">
        <div>
          <button
            className={`button ${collapseResults ? '' : 'active'}`}
            onClick={() => setCollapseResults(!collapseResults)}
          >
            <FontAwesomeIcon icon={faAnglesDown} />
          </button>
          <button
            className={`button invert-icon ${showMoreContext ? 'active' : ''}`}
            onClick={() => setShowMoreContext(!showMoreContext)}
          >
            <FontAwesomeIcon icon={faArrowsLeftRightToLine} />
          </button>
        </div>
        <div>
          <button
            className={`button invert-icon ${showMoreContext ? 'active' : ''}`}
            onClick={props.handleClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
      <div className="link-view text-dark-100 dark:text-light-600">
        <div>
          <button
            className="button link-view__header hover:bg-light-400 hover:dark:bg-dark-300"
            onClick={() => {
              setIsLinkedSectionExpanded(!isLinkedSectionExpanded);
            }}
          >
            <div
              className={`button link-view__header__indicator ${
                isLinkedSectionExpanded
                  ? 'link-view__header__indicator--expanded'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
            <div className="link-view__header__name">Linked references</div>
            <div className="link-view__header__count bg-light-100 dark:bg-dark-200">
              {linkedNotes.length}
            </div>
          </button>
          <div
            ref={linkedSectionElementRef}
            className={`link-view__children ${
              isLinkedSectionExpanded
                ? 'link-view__children--expanded'
                : 'link-view__children--collapsed'
            }`}
          >
            <Backlinks
              space={props.space}
              note={props.note}
              backlinks={linkedNotes}
              showMoreContext={showMoreContext}
              collapseResults={collapseResults}
              handleRefetchLinks={fetchLinks}
            />
          </div>
        </div>

        <div>
          <button
            className="button link-view__header hover:bg-light-400 hover:dark:bg-dark-300"
            onClick={() => {
              setIsUnlinkedSectionExpanded(!isUnlinkedSectionExpanded);
            }}
          >
            <div
              className={`button link-view__header__indicator ${
                isUnlinkedSectionExpanded
                  ? 'link-view__header__indicator--expanded'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
            <div className="link-view__header__name">Unlinked references</div>
            <div className="link-view__header__count bg-light-100 dark:bg-dark-200">
              {unlinkedNotes.length}
            </div>
          </button>
          <div
            ref={unlinkedSectionElementRef}
            className={`link-view__children ${
              isUnlinkedSectionExpanded
                ? 'link-view__children--expanded'
                : 'link-view__children--collapsed'
            }`}
          >
            <Backlinks
              space={props.space}
              note={props.note}
              backlinks={unlinkedNotes}
              showMoreContext={showMoreContext}
              collapseResults={collapseResults}
              handleRefetchLinks={fetchLinks}
              textLink
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkView;
