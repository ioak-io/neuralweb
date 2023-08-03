import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import Topbar from '../../../components/Topbar';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Input } from 'basicui';
import MainSection from '../../../components/MainSection';
import { SearchOptionType } from 'src/components/BrowseNotes/SearchInput/SearchOptionType';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';

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
  const [searchByOptions, setSearchByOptions] = useState<SearchOptionType[]>([]);

  useEffect(() => {
    const _metadataDefinition = metadataDefinitionList.find((item: MetadataDefinitionModel) => item._id === params.group);
    setMetadataDefinition(_metadataDefinition);

    if (_metadataDefinition) {
      setGroupName(`${_metadataDefinition.group} > ${_metadataDefinition.name}`);
    }
  }, [params, metadataDefinitionList]);

  return (
    <div className="page-animate">
      <Topbar title={`Browse by ${groupName}`} space={props.space} />
      <MainSection>
        <div className="browse-by-group-page">
          Content
        </div>
      </MainSection>
    </div>
  );
};

export default BrowseByGroupPage;
