/* eslint-disable no-case-declarations */
import { sortBy } from 'lodash';
import { TAG_ITEMS_FETCH_AND_SET } from '../actions/types';
import { mergeItems } from './Utils';

const initialState = {
  items: [],
  tags: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case TAG_ITEMS_FETCH_AND_SET:
      console.log('TAG_ITEMS_FETCH_AND_SET reducer');
      console.log(action);
      const _tags: string[] = [];
      action.payload.forEach((item: any) => {
        _tags.push(item.name);
      });
      return {
        ...state,
        items: [...action.payload],
        tags: _tags,
      };
    default:
      return state;
  }
}
