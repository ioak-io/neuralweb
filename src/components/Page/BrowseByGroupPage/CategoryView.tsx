import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CategoryView.scss';
import Topbar from '../../../components/Topbar';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Input, Link, ThemeType } from 'basicui';
import MainSection from '../../../components/MainSection';
import { SearchOptionType } from 'src/components/BrowseNotes/SearchInput/SearchOptionType';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';
import { getNotesByMetadataValue } from './service';

interface Props {
  location: any;
  space: string;
  category: string;
  group: string;
}

const CategoryView = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const [noteList, setNoteList] = useState<any[]>([]);

  useEffect(() => {
    if (props.category && props.group && authorization.isAuth) {
      getNotesByMetadataValue(props.space, props.group, props.category, authorization).then((response: any[]) => {
        setNoteList(response);
      })
    }
  }, [props.category, props.group, authorization]);

  return (
    <div className="category-view">
      <div className="category-view__heading">
        <Link href={`/#/${props.space}/browse/${props.group}/${props.category}`} theme={ThemeType.default}>
          {props.category}
        </Link>
      </div>
      <div>
        {noteList.map((note) => <div>
          <Link href={`/#/${props.space}/note/${note.reference}`} theme={ThemeType.primary}>
            {note.name}
          </Link>
        </div>)}
      </div>
    </div>
  );
};

export default CategoryView;
