/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import { Input } from 'basicui';
import SearchPref from './SearchPref';
import { SearchOptionType } from './SearchOptionType';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';

interface Props {
  space: string;
  text: string;
  handleChange: any;
  onSearch: any;
}

const SearchInput = (props: Props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const authorization = useSelector((state: any) => state.authorization);
  const metadataDefinitionList = useSelector((state: any) => state.metadataDefinition.items);
  const [searchByOptions, setSearchByOptions] = useState<SearchOptionType[]>([]);
  const [searchPref, setSearchPref] = useState<any>({});

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

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
    const _searchPref: any = {
      name: false,
      content: true,
      labels: false,
      ...searchPref
    }

    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      _searchByOptions.push({
        name: item._id || '',
        label: `${item.group} | ${item.name}`
      })
      _searchPref[item._id || ''] = false;
    })

    setSearchByOptions(_searchByOptions);
    setSearchPref(_searchPref);
  }, [metadataDefinitionList]);

  const handleTextChange = (event: any) => {
    setText(event.currentTarget.value);
  }

  const handleSearchPrefChange = (_searchPref: any) => {
    setSearchPref(_searchPref);
  }

  const onSearch = (event: any) => {
    event.preventDefault();
    props.onSearch({
      text,
      searchPref
    })
  }

  return (
    <div className="search-input">
      <form className="main browse-page-form" onSubmit={onSearch}>
        <Input name="text"
          value={text}
          onInput={handleTextChange}
          placeholder="Type to search"
          autoFocus />
      </form>
      <SearchPref searchPref={searchPref} options={searchByOptions} handleChange={handleSearchPrefChange} />
    </div>
  );
};

export default SearchInput;
