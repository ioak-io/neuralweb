import {
  faCheck,
  faCircleNodes,
  faFileExport,
  faFilter,
  faGlasses,
  faLink,
  faPen,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './style.scss';
import Topbar from '../../../components/Topbar';
import Editor from '../../../components/Editor';
import NoteModel from '../../../model/NoteModel';
import Viewer from '../../../components/Viewer';
import FileExplorer from '../../../components/FileExplorer';
import ContextContent from '../../../components/ContextContent';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import Footer from '../../../components/Footer';
import { getNoteByReference, saveNote } from './service';
import NotelinkModel from '../../../model/NotelinkModel';
import LinkView from '../../../components/LinkView';
import GraphView from '../../../components/GraphView';

interface Props {
  location: any;
  space: string;
}

const queryString = require('query-string');

const SearchPage = (props: Props) => {
  const history = useHistory();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const [queryParam, setQueryParam] = useState<any>({});

  useEffect(() => {
    DisableContextBarCommand.next(false);
  }, []);

  useEffect(() => {
    const queryParam = queryString.parse(props.location.search);
    setQueryParam(queryParam);
  }, [props.location]);

  useEffect(() => {
    if (queryParam.text && authorization.isAuth) {
      console.log(queryParam.text, 'search');
    }
  }, [queryParam, authorization]);

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    history.push(`/${props.space}/search?text=${text}`);
    // saveNote(props.space, _note, authorization).then((response: any) => {
    //   if (response && id.current === response.reference) {
    //     setState(response);
    //   }
    // });
  };

  return (
    <div className="page-animate">
      <Topbar title="Search" />
      <div className="search-page main">
        <form onSubmit={handleSearch}>
          <input
            className="text-lg"
            name="text"
            onInput={handleChange}
            placeholder="Type a text to search"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
