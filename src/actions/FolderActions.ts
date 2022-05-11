/* eslint-disable import/prefer-default-export */
import {
  FOLDER_ITEMS_APPEND,
  FOLDER_ITEMS_DELETE,
  FOLDER_ITEMS_FETCH_AND_SET,
  FOLDER_ITEMS_UPDATE,
} from './types';
import { httpGet, httpPost, httpPut } from '../components/Lib/RestTemplate';

export const fetchAndSetFolderItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/folder/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: FOLDER_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };

export const updateFolderItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: FOLDER_ITEMS_UPDATE,
    payload,
  });
};

export const appendFolderItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: FOLDER_ITEMS_APPEND,
    payload,
  });
};

export const deleteFolderItems = (payload: any) => (dispatch: any) => {
  dispatch({
    type: FOLDER_ITEMS_DELETE,
    payload,
  });
};
