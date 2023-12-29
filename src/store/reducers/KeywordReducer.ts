/* eslint-disable no-case-declarations */
import { sortBy } from 'lodash';
import {
  KEYWORD_ITEMS_FETCH_AND_SET
} from '../actions/types';
import { mergeItems } from './Utils';

const initialState = {
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case KEYWORD_ITEMS_FETCH_AND_SET:
      console.log('KEYWORD_ITEMS_FETCH_AND_SET reducer');
      console.log(action);
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
