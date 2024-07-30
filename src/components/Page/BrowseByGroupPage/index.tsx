import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import Topbar from '../../../components/Topbar';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Input } from 'basicui';
import MainSection from '../../../components/MainSection';
import { SearchOptionType } from 'src/components/BrowseNotes/SearchInput/SearchOptionType';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';
import CategoryView from './CategoryView';

interface Props {
  location: any;
  space: string;
}

const BrowseByGroupPage = (props: Props) => {
  const params = useParams();
  const [groupName, setGroupName] = useState('');
  const [metadataDefinition, setMetadataDefinition] = useState<MetadataDefinitionModel>();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const metadataDefinitionList = useSelector((state: any) => state.metadataDefinition.items);
  const metadataValueList = useSelector((state: any) => state.metadataValue.items);
  const labelList = useSelector((state: any) => state.label.items);
  const keywordList = useSelector((state: any) => state.keyword.items);
  const [categories, setCategories] = useState<string[]>();

  useEffect(() => {
    if (params.group === 'labels') {
      setGroupName('Label');
    } else if (params.group === 'primaryLabel') {
      setGroupName('Starred label');
    } else if (params.group === 'keywords') {
      setGroupName('Keywords');
    } else {
      const _metadataDefinition = metadataDefinitionList.find((item: MetadataDefinitionModel) => item._id === params.group);
      setMetadataDefinition(_metadataDefinition);

      if (_metadataDefinition) {
        setGroupName(`${_metadataDefinition.group} > ${_metadataDefinition.name}`);
      }
    }
  }, [params, metadataDefinitionList]);

  useEffect(() => {
    let _categories: string[] = [];
    if (params.group === 'labels' || params.group === 'primaryLabel') {
      _categories = labelList;
    } else if (params.group === 'keywords' && keywordList) {
      _categories = keywordList;
    } else if (params.group && !["labels", "primaryLabel", "keywords"].includes(params.group) && metadataValueList) {
      _categories = metadataValueList[params.group];
    } else {
      _categories = [];
    }
    setCategories(_categories.sort((a, b) => a.localeCompare(b)));
  }, [labelList, keywordList, metadataValueList, params.group]);

  return (
    <div className="page-animate">
      <Topbar title={`Browse by ${groupName}`} />
      <MainSection>
        <div className="browse-by-group-page">
          {categories?.map(item => <CategoryView key={item} space={props.space} location={props.location} category={item} group={params.group || ''} />)}
        </div>
      </MainSection>
    </div>
  );
};

export default BrowseByGroupPage;
