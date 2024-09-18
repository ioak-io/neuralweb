/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const getExtracts = (
  space: string,
  bookref: string,
  authorization: any
) => {
  return httpGet(`/book/extract/${space}/bookref/${bookref}`, {
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

export const updateExtract = (
  space: string,
  bookref: string,
  id: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/book/extract/${space}/${bookref}/${id}`, payload, {
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

export const createExtract = (
  space: string,
  bookref: string,
  payload: any,
  authorization: any
) => {
  return httpPost(`/book/extract/${space}/${bookref}`, payload, {
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
