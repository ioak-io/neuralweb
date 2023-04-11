/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import { ButtonVariantType, IconButton, Input, ThemeType } from 'basicui';
import SearchPref from './SearchPref';
import { SearchOptionType } from './SearchOptionType';
import MetadataDefinitionModel from '../../../model/MetadataDefinitionModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import ChooseOptions from './ChooseOptions';
import { SearchConfigType } from './SearchConfig';

interface Props {
  space: string;
  onSearch: any;
  searchConfig: SearchConfigType;
}

const SearchInput = (props: Props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [textList, setTextList] = useState<string[]>([]);
  const authorization = useSelector((state: any) => state.authorization);
  const metadataDefinitionList = useSelector((state: any) => state.metadataDefinition.items);
  const [searchByOptions, setSearchByOptions] = useState<SearchOptionType[]>([]);
  const [searchPref, setSearchPref] = useState<any>({});

  useEffect(() => {
    setSearchPref(props.searchConfig.searchPref);
    setText(props.searchConfig.text);
  }, [props.searchConfig]);

  useEffect(() => {
    const _searchByOptions: SearchOptionType[] = [
      {
        name: 'name',
        label: 'Name'
      },
      {
        name: 'content',
        label: 'Content'
      },
      {
        name: 'labels',
        label: 'Label'
      }
    ];
    const _searchPref: any = _getSearchPrefBase();

    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      _searchByOptions.push({
        name: item._id || '',
        label: `${item.group} | ${item.name}`
      })
    })

    setSearchByOptions(_searchByOptions);
    setSearchPref({
      ..._searchPref,
      ...props.searchConfig.searchPref
    });
  }, [metadataDefinitionList]);

  const handleTextChange = (event: any) => {
    setText(event.currentTarget.value);
  }

  const handleTextListChange = (_options: any) => {
    setTextList(_options);
  }

  const handleSearchPrefChange = (_searchPref: any) => {
    setSearchPref(_searchPref);
  }

  const onSearch = (event: any) => {
    event.preventDefault();
    props.onSearch({
      text,
      searchPref,
      textList
    })
  }

  const _getSearchPrefBase = () => {

    const _searchPref: any = {
      name: false,
      content: true,
      labels: false
    }

    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      _searchPref[item._id || ''] = false;
    })

    return _searchPref;
  }

  const onReset = (event: any) => {
    const _text = '';
    const _searchPref: any = _getSearchPrefBase();
    const _textList: string[] = [];
    props.onSearch({
      text: _text,
      searchPref: _searchPref,
      textList: _textList
    });
    setText(_text);
    setTextList(_textList);
    setSearchPref(_searchPref);
  }

  return (
    <div className="search-input">
      <SearchPref searchPref={searchPref} options={searchByOptions} handleChange={handleSearchPrefChange} />
      <div className="search-input__input">
        <form className="main browse-page-form" onSubmit={onSearch}>
          <Input name="text"
            value={text}
            onInput={handleTextChange}
            placeholder="Type to search"
            autoFocus />
          <IconButton onClick={onSearch} circle theme={ThemeType.primary} variant={ButtonVariantType.transparent}>
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>
          <IconButton onClick={onReset} circle theme={ThemeType.default} variant={ButtonVariantType.transparent}>
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </form>
      </div>
      <ChooseOptions searchConfig={props.searchConfig} text={text} searchPref={searchPref} options={searchByOptions} handleChange={handleTextListChange} />
    </div>
  );
};

export default SearchInput;
