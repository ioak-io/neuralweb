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
  const [categories, setCategories] = useState<{ name: string, label: string }[]>();

  useEffect(() => {
    if (params.group !== 'label') {
      const _metadataDefinition = metadataDefinitionList.find((item: MetadataDefinitionModel) => item._id === params.group);
      setMetadataDefinition(_metadataDefinition);

      if (_metadataDefinition) {
        setGroupName(`${_metadataDefinition.group} > ${_metadataDefinition.name}`);
      }
    } else {
      setGroupName('Label');
    }
  }, [params, metadataDefinitionList]);

  useEffect(() => {
    let _categories: { name: string, label: string }[] = [];
    if (params.group === 'label') {
      _categories = labelList.map((item: string) => ({ name: item, value: item }))
    } else if (params.group) {

    } else {

    }
    console.log(_categories, labelList);
    setCategories(_categories);
  }, [labelList, metadataValueList, params.group]);

  return (
    <div className="page-animate">
      <Topbar title={`Browse by ${groupName}`} space={props.space} />
      <MainSection>
        <div className="browse-by-group-page">
          {categories?.map(item => <CategoryView space={props.space} location={props.location} category={item.name} />)}
        </div>
      </MainSection>
    </div>
  );
};

export default BrowseByGroupPage;
