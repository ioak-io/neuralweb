/* eslint-disable import/prefer-default-export */
import * as d3 from 'd3';
import { httpGet } from '../../components/Lib/RestTemplate';

export const getNotelinks = (
  space: string,
  noteref: string,
  depth: number,
  authorization: any
) => {
  return httpGet(`/notelink/${space}?noteref=${noteref}&depth=${depth}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve([]);
    });
};

export const getNotetags = (
  space: string,
  id: string,
  level: number,
  authorization: any
) => {
  return httpGet(`/note/tag/${space}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve([]);
    });
};
