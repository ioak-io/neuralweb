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
  noteref: string;
}

const GraphView = (props: Props) => {
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const companyList = useSelector((state: any) => state.company.items);
  const notes = useSelector((state: any) => state.note.items);
  const [noteNodes, setNoteNodes] = useState<NodeModel[]>([]);
  const [tagNodes, setTagNodes] = useState<NodeModel[]>([]);
  const [noteLinks, setNoteLinks] = useState<LinkModel[]>([]);
  const [tagLinks, setTagLinks] = useState<LinkModel[]>([]);
  const [depth, setDepth] = useState<number>(2);

  useEffect(() => {
    console.log('**auth');
    if (authorization.isAuth && props.noteref) {
      getNotelinks(props.space, props.noteref, depth, authorization).then(
        (response: any) => {
          if (response) {
            setNoteLinks(
              response.map((item: NotelinkModel) => ({
                source: item.sourceNoteRef,
                target: item.linkedNoteRef,
              }))
            );
          }
        }
      );
      getNotetags(props.space, props.noteref, 2, authorization).then(
        (response: any) => {
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
        }
      );
    }
  }, [authorization, props.noteref, depth]);

  useEffect(() => {
    console.log('**notes');
    setNoteNodes(
      notes.map((item: NoteModel) => ({
        name: item.name,
        reference: item.reference,
        group: 'note',
        color: item.color,
      }))
    );
  }, [notes]);

  const increaseDepth = () => {
    setDepth(depth + 1);
  };
  const decreaseDepth = () => {
    setDepth(depth - 1);
  };

  return (
    <>
      <div>
        <NetworkGraph
          data={{
            nodes: [...noteNodes, ...tagNodes],
            links: [...noteLinks, ...tagLinks],
          }}
          space={props.space}
        >
          <div className="graph-view__depth-control">
            <div className="graph-view__depth-control__text">Depth</div>
            <div className="graph-view__depth-control__action">
              {depth > 0 && (
                <button className="button" onClick={decreaseDepth}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              )}
              <div>{depth}</div>
              <button className="button" onClick={increaseDepth}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </NetworkGraph>
      </div>
    </>
  );
};

export default GraphView;
