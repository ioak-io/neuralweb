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

export const getNotelinksByReference = (
  space: string,
  reference: string,
  authorization: any
) => {
  return httpGet(`/notelink/${space}/backlink/${reference}`, {
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

export const getPossibleLinkedNotes = (
  space: string,
  reference: string,
  authorization: any
) => {
  return httpGet(`/notelink/${space}/possiblelink/${reference}`, {
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

export const addPossibleLink = (
  space: string,
  sourceReference: string,
  targetReference: string,
  authorization: any
) => {
  return httpPost(
    `/notelink/${space}/possiblelink/${sourceReference}/${targetReference}`,
    {},
    {
      headers: {
        Authorization: authorization.access_token,
      },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve([]);
    });
};
