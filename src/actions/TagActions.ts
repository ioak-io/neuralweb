/* eslint-disable import/prefer-default-export */
import { TAG_ITEMS_FETCH_AND_SET } from './types';
import { httpGet, httpPost, httpPut } from '../components/Lib/RestTemplate';

export const fetchAndSetTagItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/note/tag/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: TAG_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };
