/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpDelete, httpPut } from '../Lib/RestTemplate';

export const saveFolder = (space: string, payload: any, authorization: any) => {
  return httpPut(`/folder/${space}/`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error: any) => {
      return Promise.resolve({});
    });
};

export const getFolder = (space: string, authorization: any) => {
  return httpGet(`/folder/${space}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error: any) => {
      return Promise.resolve([]);
    });
};

export const deleteFolder = (space: string, id: string, authorization: any) => {
  return httpDelete(`/folder/${space}/${id}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error: any) => {
      return Promise.resolve({});
    });
};

export const deleteNote = (space: string, id: string, authorization: any) => {
  return httpDelete(`/note/${space}/${id}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error: any) => {
      return Promise.resolve({});
    });
};
