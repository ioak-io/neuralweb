import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNodes, faListUl } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import Topbar from '../../../components/Topbar';
// import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import { searchNote } from './service';
import NoteModel from '../../../model/NoteModel';
import SearchResults from '../../../components/SearchResults';
import { isEmptyOrSpaces } from '../../../components/Utils';
import GraphSearchResultsView from '../../../components/GraphSearchResultsView';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from 'basicui';
import MainSection from '../../../components/MainSection';

interface Props {
  location: any;
  space: string;
}

const SearchPage = (props: Props) => {
  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  const [view, setView] = useState('list');

  const [text, setText] = useState('');
  const [results, setResults] = useState<NoteModel[]>([]);

  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   DisableContextBarCommand.next(false);
  // }, []);

  useEffect(() => {
    setText(searchParams.get('text') || '');
    if (!isEmptyOrSpaces(searchParams.get('text')) && authorization.isAuth) {
      searchNote(props.space, { text: searchParams.get('text') }, authorization).then(
        (response: NoteModel[]) => {
          setResults(response);
        }
      );
    }
    if (isEmptyOrSpaces(searchParams.get('text')) && authorization.isAuth) {
      setResults([]);
    }
  }, [searchParams, authorization]);

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleChangeAndSubmit = (_text: string) => {
    navigate(`/${props.space}/search?text=${_text}`);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    navigate(`/${props.space}/search?text=${text}`);
    // saveNote(props.space, _note, authorization).then((response: any) => {
    //   if (response && id.current === response.reference) {
    //     setState(response);
    //   }
    // });
  };

  const openGraphMode = () => {
    setView('graph');
  };

  const openListMode = () => {
    setView('list');
  };

  return (
    <div className="page-animate">
      <Topbar title="Search">
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
        <form className="main search-page-form" onSubmit={handleSearch}>
          <Input name="text"
            value={text}
            onInput={handleChange}
            placeholder="Type to search"
            autoFocus />
        </form>
        {view === 'list' && (
          <div className="search-page__results main">
            <SearchResults
              space={props.space}
              noteList={results}
              handleChange={handleChangeAndSubmit}
            />
          </div>
        )}
        {view === 'graph' && (
          <div className="search-page__graph">
            <GraphSearchResultsView space={props.space} noteNodes={results} />
          </div>
        )}
      </MainSection>
    </div>
  );
};

export default SearchPage;
