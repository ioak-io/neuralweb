import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { uniqBy } from 'lodash';

import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ExpenseModel from '../../../model/ExpenseModel';
import Topbar from '../../../components/Topbar';
import { getNotelinks, getNotetags, GRAPH_DATA } from './service';
import NetworkGraph from '../../../components/NetworkGraph';
import ContextContainer from '../../../components/MainContent/ContextContainer';
import NotelinkModel from '../../../model/NotelinkModel';
import LinkModel from '../../../model/LinkModel';
import NodeModel from '../../../model/NodeModel';
import NotetagModel from '../../../model/NotetagModel';
import NoteModel from '../../../model/NoteModel';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

// const NODES: any[] = [
//   {
//     _id: 'a1',
//     name: 'Fue en tanto sabido se respondió',
//     folderId: '1',
//     weight: '9',
//     content: ' ',
//     group: 'one',
//   },
//   {
//     _id: 'a2',
//     name: 'Entre tan haber sus. Nombre',
//     folderId: '1',
//     weight: '9',
//     content: ' ',
//     group: 'one',
//   },
//   {
//     _id: 'a3',
//     name: 'Semana hubiera fuese del',
//     folderId: '1',
//     weight: '16',
//     content: ' ',
//     group: 'one',
//   },
//   {
//     _id: 'a4',
//     name: 'Más quejas satisfación tanta fiestas',
//     folderId: '1',
//     weight: '25',
//     content: ' ',
//     group: 'one',
//   },
//   {
//     _id: 'a5',
//     name: 'Hace intención gusto plazas plazas',
//     folderId: '2',
//     weight: '100',
//     content: ' ',
//   },
//   {
//     _id: 'a6',
//     name: 'Hablar cuidado han',
//     folderId: '2',
//     weight: '200',
//     content: ' ',
//   },
//   {
//     _id: 'a7',
//     name: 'Tanto quería intención',
//     folderId: '5',
//     weight: '200',
//     content: ' ',
//   },
//   {
//     _id: 'a8',
//     name: 'Amigos casado grandes fue convenía',
//     folderId: '5',
//     weight: '6',
//     content: ' ',
//   },
//   {
//     _id: 'a9',
//     name: 'Parienta fiestas se su hubiera',
//     folderId: '5',
//     weight: '25',
//     content: ' ',
//   },
//   {
//     _id: 'a10',
//     name: 'Las quería sin',
//     folderId: '5',
//     weight: '36',
//     content: ' ',
//   },
//   {
//     _id: 'a11',
//     name: 'Días dijo parte llamados quejas',
//     folderId: '2',
//     weight: '36',
//     content: ' ',
//   },
//   {
//     _id: 'a12',
//     name: 'Habían fiestas voluntad templos',
//     folderId: '2',
//     weight: '6',
//     content: ' ',
//   },
//   {
//     _id: 'a13',
//     name: 'De otro hace comunicalle',
//     folderId: '5',
//     weight: '6',
//     content: ' ',
//   },
//   {
//     _id: 'a14',
//     name: 'Erklären istaber land sie wenn',
//     folderId: '1',
//     weight: '6',
//     content: ' ',
//   },
//   {
//     _id: 'a15',
//     name: 'Hieße käme hinweisenden',
//     folderId: '1',
//     weight: '6',
//     content: ' ',
//   },
//   {
//     _id: 'a16',
//     name: 'Sprache gewiß andere diese oft gibt',
//     folderId: '50',
//     weight: '54',
//     content: ' ',
//   },
//   {
//     _id: 'a17',
//     name: 'Sprechen käme gebärde namens',
//     folderId: '44',
//     weight: '36',
//     content: ' ',
//   },
//   {
//     _id: 'a18',
//     name: 'Zerschlagen schwarz durch diese',
//     folderId: '44',
//     weight: '25',
//     content: ' ',
//   },
//   {
//     _id: 'a19',
//     name: 'Selber hier sprachspiel nun',
//     folderId: '44',
//     weight: '16',
//     content: ' ',
//   },
//   {
//     _id: 'a20',
//     name: 'Fälle könne nicht große hat hinweisenden',
//     folderId: '50',
//     weight: '6',
//     content: ' ',
//   },
// ];
// const LINKS: any[] = [
//   { source: 'a1', target: 'a3', group: 'link', value: 2 },
//   { source: 'a2', target: 'a6', group: 'ai', value: 9 },
//   { source: 'a3', target: 'a7', group: 'link', value: 25 },
//   { source: 'a4', target: 'a7', group: 'link', value: 16 },
//   { source: 'a5', target: 'a8' },
//   { source: 'a6', target: 'a9' },
//   { source: 'a7', target: 'a1' },
//   { source: 'a8', target: 'a20' },
//   { source: 'a9', target: 'a19' },
//   { source: 'a10', target: 'a2' },
//   { source: 'a11', target: 'a2' },
//   { source: 'a12', target: 'a2' },
//   { source: 'a13', target: 'a4' },
//   { source: 'a14', target: 'a3' },
//   { source: 'a15', target: 'a18' },
//   { source: 'a16', target: 'a16' },
//   { source: 'a17', target: 'a3' },
//   { source: 'a18', target: 'a18' },
//   { source: 'a19', target: 'a15' },
//   { source: 'a20', target: 'a13' },
// ];

const GraphPage = (props: Props) => {
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const companyList = useSelector((state: any) => state.company.items);
  const notes = useSelector((state: any) => state.note.items);
  const [noteNodes, setNoteNodes] = useState<NodeModel[]>([]);
  const [tagNodes, setTagNodes] = useState<NodeModel[]>([]);
  const [noteLinks, setNoteLinks] = useState<LinkModel[]>([]);
  const [tagLinks, setTagLinks] = useState<LinkModel[]>([]);

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
    console.log('**notes');
    setNoteNodes(
      notes.map((item: NoteModel) => ({
        name: item.name,
        reference: item.reference,
        group: 'note',
      }))
    );
  }, [notes]);

  return (
    <>
      <div>
        <Topbar title="Graph" />
        <NetworkGraph
          data={{
            nodes: [...noteNodes, ...tagNodes],
            links: [...noteLinks, ...tagLinks],
          }}
          space={props.space}
        />
      </div>
      <ContextContainer space={props.space}>
        Network chart settings
      </ContextContainer>
    </>
  );
};

export default GraphPage;
