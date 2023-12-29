/* eslint-disable import/prefer-default-export */
import {
  KEYWORD_ITEMS_FETCH_AND_SET
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetKeywordItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/keywords/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: KEYWORD_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };
