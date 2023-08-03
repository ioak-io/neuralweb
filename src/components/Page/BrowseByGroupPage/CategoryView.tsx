import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CategoryView.scss';
import Topbar from '../../../components/Topbar';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Input } from 'basicui';
import MainSection from '../../../components/MainSection';
import { SearchOptionType } from 'src/components/BrowseNotes/SearchInput/SearchOptionType';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';

interface Props {
  location: any;
  space: string;
  category: string;
}

const CategoryView = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();

  useEffect(() => {

  }, [props.category]);

  return (
    <div className="category-view">
      {props.category}
    </div>
  );
};

export default CategoryView;
