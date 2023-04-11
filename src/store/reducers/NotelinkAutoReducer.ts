/* eslint-disable no-case-declarations */
import { sortBy } from 'lodash';
import {
  NOTELINK_AUTO_ITEMS_APPEND,
  NOTELINK_AUTO_ITEMS_DELETE,
  NOTELINK_AUTO_ITEMS_FETCH_AND_SET
} from '../actions/types';

const initialState = {
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case NOTELINK_AUTO_ITEMS_FETCH_AND_SET:
      console.log('NOTELINK_AUTO_ITEMS_FETCH_AND_SET reducer');
      console.log(action);
      return {
        ...state,
        items: action.payload
      };
    case NOTELINK_AUTO_ITEMS_APPEND:
      console.log('NOTELINK_AUTO_ITEMS_APPEND reducer');
      console.log(action);
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case NOTELINK_AUTO_ITEMS_DELETE:
      console.log('NOTELINK_AUTO_ITEMS_DELETE reducer');
      console.log(action);
      return {
        ...state,
        items:
          state.items.filter((item: any) =>
            !((action.payload.sourceNoteRef === item.sourceNoteRef && action.payload.linkedNoteRef === item.linkedNoteRef)
              || action.payload.sourceNoteRef === item.linkedNoteRef && action.payload.linkedNoteRef === item.sourceNoteRef)
          )
      };
    default:
      return state;
  }
}
