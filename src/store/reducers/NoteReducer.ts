/* eslint-disable no-case-declarations */
import { sortBy } from 'lodash';
import {
  NOTE_ITEMS_FETCH_AND_SET,
  NOTE_ITEMS_UPDATE,
  NOTE_ITEMS_APPEND,
  NOTE_ITEMS_DELETE,
} from '../actions/types';
import { mergeItems } from './Utils';

const initialState = {
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case NOTE_ITEMS_FETCH_AND_SET:
      console.log('NOTE_ITEMS_FETCH_AND_SET reducer');
      console.log(action);
      return {
        ...state,
        items: sortBy([...action.payload], (item) => item.name.toLowerCase()),
      };
    case NOTE_ITEMS_UPDATE:
      console.log('NOTE_ITEMS_UPDATE reducer');
      console.log(action);

      const _items: any = [...state.items];
      const index = _items.findIndex(
        (item: any) => item._id === action.payload._id
      );
      if (index > -1) {
        _items[index] = action.payload;
      }

      return {
        ...state,
        items: sortBy([..._items], (item) => item.name.toLowerCase()),
      };
    case NOTE_ITEMS_APPEND:
      console.log('NOTE_ITEMS_APPEND reducer');
      console.log(action);
      return {
        ...state,
        items: sortBy([...state.items, action.payload], (item) =>
          item.name.toLowerCase()
        ),
      };
    case NOTE_ITEMS_DELETE:
      console.log('NOTE_ITEMS_DELETE reducer');
      console.log(action);
      return {
        ...state,
        items: sortBy(
          state.items.filter((item: any) => !action.payload.includes(item._id)),
          (item: any) => item.name.toLowerCase()
        ),
      };
    default:
      return state;
  }
}
