import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNodes, faListUl } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import Topbar from '../../../components/Topbar';
// import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import { searchNote } from './service';
import NoteModel from '../../../model/NoteModel';
import SearchResults from '../../../components/BrowseNotes/SearchResults';
import { isEmptyOrSpaces } from '../../../components/Utils';
import GraphSearchResultsView from '../../../components/GraphSearchResultsView';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from 'basicui';
import MainSection from '../../../components/MainSection';
import SearchInput from '../../../components/BrowseNotes/SearchInput';
import { getSessionValue, getSessionValueAsJson, setSessionValue, setSessionValueAsJson } from '../../../utils/SessionUtils';

interface Props {
  location: any;
  space: string;
}

const BrowsePage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  const [view, setView] = useState('list');

  const [results, setResults] = useState<NoteModel[]>([]);

  useEffect(() => {
    const searchConfig = getSessionValueAsJson('neuralweb-searchconfig-browse');
    if (authorization.isAuth) {
      handleSearch(searchConfig);
    }
  }, [authorization]);

  const handleSearch = (searchConfig: any) => {
    console.log(searchConfig);
    setSessionValueAsJson('neuralweb-searchconfig-browse', searchConfig);
    searchNote(props.space, searchConfig, authorization).then(
      (response: NoteModel[]) => {
        setResults(response);
      }
    );
  };

  const openGraphMode = () => {
    setView('graph');
  };

  const openListMode = () => {
    setView('list');
  };

  return (
    <div className="page-animate">
      <Topbar title="Browse" space={props.space}>
        <div className="topbar-actions">
          <button
            className={`button ${view === 'graph' ? 'active' : ''}`}
            onClick={openGraphMode}
          >
            <FontAwesomeIcon icon={faCircleNodes} />
            <span className="menu-highlight-line" />
          </button>
          <button
            className={`button ${view === 'list' ? 'active' : ''}`}
            onClick={openListMode}
          >
            <FontAwesomeIcon icon={faListUl} />
            <span className="menu-highlight-line" />
          </button>
        </div>
      </Topbar>
      <MainSection>
        <SearchInput space={props.space} onSearch={handleSearch} searchConfig={getSessionValueAsJson('neuralweb-searchconfig-browse')} />
        {view === 'list' && (
          <SearchResults
            space={props.space}
            noteList={results}
            handleChange={() => { }}
          />
        )}
        {view === 'graph' && (
          <div className="browse-page__graph">
            <GraphSearchResultsView space={props.space} noteNodes={results} />
          </div>
        )}
      </MainSection>
    </div>
  );
};

export default BrowsePage;
