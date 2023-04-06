import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { isEmptyOrSpaces } from '../../../../components/Utils';

interface Props {
  note: NoteModel;
  onChange: any;
}

const LabelEditor = (props: Props) => {
  const existingLabels = useSelector((state: any) => state.label?.items);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.currentTarget.value);
  }

  useEffect(() => {
    if (isEmptyOrSpaces(searchText)) {
      setSearchResults(existingLabels
        .filter((item: string) => !props.note.labels.includes(item)));
    } else {
      setSearchResults(existingLabels
        .filter((item: string) => !props.note.labels.includes(item))
        .filter((item: string) => item.toLowerCase().includes(searchText.toLowerCase())));
    }
  }, [searchText, existingLabels])

  const handleChange = (event: any) => {
    props.onChange({
      ...props.note,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const addLabel = (_label: string) => {
    props.onChange({
      currentTarget: {
        name: "labels",
        value: [...props.note.labels, _label]
      }
    })
  }

  const removeLabel = (_label: string) => {
    props.onChange({
      currentTarget: {
        name: "labels",
        value: props.note.labels.filter(item => item !== _label)
      }
    })
  }

  return (
    <div className='label-editor'>
      <Label>
        Labels
      </Label>
      <div className='note-label-list label-editor__view'>
        {props.note.labels?.map((label) =>
          <div className='note-label'>
            <div>
              {label}
            </div>
            <button onClick={() => removeLabel(label)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        )}
      </div>
      <Input name="searchText" value={searchText} placeholder="Search or create new label" onInput={handleSearchTextChange} />
      <div className="label-editor__results">
        <div className="label-editor__results__container">
          <div className="label-editor__results__info">
            Existing labels
          </div>
          {isEmptyOrSpaces(searchText) &&
            <div className="label-editor__results__info-secondary">
              Type to see suggestion
            </div>}
          {!isEmptyOrSpaces(searchText) && searchResults.length === 0 &&
            <div className="label-editor__results__info-secondary">
              -
            </div>}
          {!isEmptyOrSpaces(searchText) && <div className="note-label-list label-editor__results__list">
            {searchResults.map(item =>
              <button className="note-label" onClick={() => addLabel(item)}>
                {item}
              </button>
            )}
          </div>}
        </div>
        <div className="label-editor__results__container">
          <div className="label-editor__results__info">
            New label
          </div>
          {(isEmptyOrSpaces(searchText) || props.note.labels.includes(searchText) || searchResults.includes(searchText)) && <div className="label-editor__results__info-secondary">
            <div>
              -
            </div>
          </div>}
          {!isEmptyOrSpaces(searchText) && !props.note.labels.includes(searchText) && !searchResults.includes(searchText) && <div className="note-label-list label-editor__results__list">
            <button className="note-label" onClick={() => addLabel(searchText)}>
              {searchText}
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default LabelEditor;
