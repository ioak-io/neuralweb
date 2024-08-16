/* eslint-disable import/prefer-default-export */
import { httpDelete, httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const browseNotes = (space: string, payload: any, authorization: any) => {
  return httpPost(`/note/${space}/browse`, payload, {
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


export const deleteNoteByReferenceList = (space: string, payload: string[], authorization: any) => {
  return httpPost(`/note/${space}/delete/byreference`, payload, {
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
      return Promise.resolve({});
    });
};
