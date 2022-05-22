import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { uniqBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { getNotelinks, getNotetags } from './service';
import NetworkGraph from '../../components/NetworkGraph';
import NotelinkModel from '../../model/NotelinkModel';
import LinkModel from '../../model/LinkModel';
import NodeModel from '../../model/NodeModel';
import NotetagModel from '../../model/NotetagModel';
import NoteModel from '../../model/NoteModel';

const queryString = require('query-string');

interface Props {
  space: string;
  noteNodes: NoteModel[];
}

const GraphSearchResultsView = (props: Props) => {
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const companyList = useSelector((state: any) => state.company.items);
  const notes = useSelector((state: any) => state.note.items);
  const [noteNodes, setNoteNodes] = useState<NodeModel[]>([]);
  const [tagNodes, setTagNodes] = useState<NodeModel[]>([]);
  const [tagNodesFiltered, setTagNodesFiltered] = useState<NodeModel[]>([]);
  const [noteLinks, setNoteLinks] = useState<LinkModel[]>([]);
  const [tagLinks, setTagLinks] = useState<LinkModel[]>([]);
  const [showAllNodes, setShowAllNodes] = useState(true);
  const [coloredNodes, setColoredNodes] = useState(true);

  useEffect(() => {
    console.log('**auth');
    if (authorization.isAuth) {
      getNotelinks(props.space, authorization).then((response: any) => {
        if (response) {
          setNoteLinks(
            response.map((item: NotelinkModel) => ({
              source: item.sourceNoteRef,
              target: item.linkedNoteRef,
            }))
          );
        }
      });
      getNotetags(props.space, authorization).then((response: any) => {
        if (response) {
          const _tagLinks: LinkModel[] = [];
          const _tagNodes: NodeModel[] = [];
          response.forEach((item: NotetagModel) => {
            _tagLinks.push({
              source: item.noteRef,
              target: item.name,
            });
            _tagNodes.push({
              name: `#${item.name}`,
              reference: item.name,
              group: 'tag',
            });
          });
          setTagLinks(_tagLinks);
          setTagNodes(uniqBy(_tagNodes, 'reference'));
        }
      });
    }
  }, [authorization]);

  useEffect(() => {
    if (showAllNodes) {
      setNoteNodes(
        notes.map((item: NoteModel) => ({
          name: item.name,
          reference: item.reference,
          group: 'note',
          color: coloredNodes ? item.color : undefined,
        }))
      );
    } else {
      const _noteMap: any = {};
      notes.forEach((item: NoteModel) => {
        _noteMap[item.reference] = item;
      });
      setNoteNodes(
        props.noteNodes.map((item: NoteModel) => ({
          name: item.name,
          reference: item.reference,
          group: 'note',
          color: coloredNodes ? _noteMap[item.reference]?.color : undefined,
        }))
      );
    }
  }, [props.noteNodes, notes, coloredNodes, showAllNodes]);

  useEffect(() => {
    const _tagNodeIdList: string[] = [];
    const _nodeIdList: string[] = [];

    noteNodes.forEach((item) => {
      _nodeIdList.push(item.reference);
    });

    tagLinks.forEach((item) => {
      if (
        _nodeIdList.includes(item.source) ||
        _nodeIdList.includes(item.target)
      ) {
        _tagNodeIdList.push(item.source);
        _tagNodeIdList.push(item.target);
      }
    });
    setTagNodesFiltered(
      tagNodes.filter((item) => _tagNodeIdList.includes(item.reference))
    );
  }, [tagLinks, tagNodes, noteNodes]);

  return (
    <>
      <div>
        <NetworkGraph
          data={{
            nodes: [...noteNodes, ...tagNodesFiltered],
            links: [...noteLinks, ...tagLinks],
          }}
          space={props.space}
        >
          <div className="graph-search-results-view__control__container">
            <div className="graph-search-results-view__control">
              <div className="graph-search-results-view__control__text">
                Show all nodes
              </div>
              <div className="graph-search-results-view__control__action">
                <button
                  className={`button graph-search-results-view__control__action__button ${
                    showAllNodes
                      ? 'graph-search-results-view__control__action__button--active'
                      : ''
                  }`}
                  onClick={() => setShowAllNodes(true)}
                >
                  Yes
                </button>
                <button
                  className={`button graph-search-results-view__control__action__button ${
                    showAllNodes
                      ? ''
                      : 'graph-search-results-view__control__action__button--active'
                  }`}
                  onClick={() => setShowAllNodes(false)}
                >
                  No
                </button>
              </div>
            </div>
            <div className="graph-search-results-view__control">
              <div className="graph-search-results-view__control__text">
                Apply color to nodes
              </div>
              <div className="graph-search-results-view__control__action">
                <button
                  className={`button graph-search-results-view__control__action__button ${
                    coloredNodes
                      ? 'graph-search-results-view__control__action__button--active'
                      : ''
                  }`}
                  onClick={() => setColoredNodes(true)}
                >
                  Yes
                </button>
                <button
                  className={`button graph-search-results-view__control__action__button ${
                    coloredNodes
                      ? ''
                      : 'graph-search-results-view__control__action__button--active'
                  }`}
                  onClick={() => setColoredNodes(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </NetworkGraph>
      </div>
    </>
  );
};

export default GraphSearchResultsView;
