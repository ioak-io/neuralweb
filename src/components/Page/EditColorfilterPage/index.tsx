import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleNodes, faListUl, faPlus } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import Topbar from '../../../components/Topbar';
import NoteModel from '../../../model/NoteModel';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button, Checkbox, Input } from 'basicui';
import MainSection from '../../../components/MainSection';
import ColorfilterModel from 'src/model/ColorfilterModel';
import { saveColorfilter } from '../ColorfilterPage/service';
import SearchInput from '../../../components/BrowseNotes/SearchInput';
import { getSessionValueAsJson } from '../../../utils/SessionUtils';

interface Props {
  location: any;
  space: string;
}

const EditColorFilterPage = (props: Props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const colorfilterList = useSelector((state: any) => state.colorfilter.items);


  const [state, setState] = useState<ColorfilterModel>({
    _id: undefined,
    name: '',
    color: 'blue',
    searchPref: {}
  });

  useEffect(() => {
    const _state = colorfilterList.find((item: ColorfilterModel) => item._id === params.id);
    if (_state) {
      setState({ ..._state });
    }
  }, [colorfilterList]);

  const handleChange = (event: any) => {
    event.preventDefault();
    console.log(event.currentTarget.name, event.currentTarget.value)
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const save = (event: any) => {
    event.preventDefault();
    console.log(state);
    // let _note = { ...state };
    saveColorfilter(props.space, state, authorization).then((response) => {
      // dispatch(appendNoteItem(response.note));
      // navigate(`/${props.space}/note/${response.note.reference}`);
    })
  }

  const handleSearchInputChange = (_data: any) => {
    console.log(_data);
    setState({ ...state, ..._data });
  }

  return (
    <div className="edit-colorfilter-page page-animate">
      <Topbar title="Edit color filter" space={props.space} />
      <MainSection>
        <div className='edit-colorfilter-page-form'>
          <div className='edit-colorfilter-page-form__header'>
            <Input name="name" value={state.name} onInput={handleChange} label='Filter name' />
            <Input type="color" name="color" value={state.color} onInput={handleChange} label='Color' />
          </div>
          <SearchInput space={props.space} searchConfig={{
            searchPref: state.searchPref || {},
            text: state.text || '',
            textList: state.textList || []
          }}
            onChange={handleSearchInputChange} />
        </div>
        <div className="footer">
          <div />
          <div className="footer-right">
            <Button onClick={save}>
              <FontAwesomeIcon icon={faPlus} /> Save
            </Button>
          </div>
        </div>
      </MainSection>
    </div>
  );
};

export default EditColorFilterPage;
