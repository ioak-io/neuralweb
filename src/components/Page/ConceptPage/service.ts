/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const saveConcept = (
  space: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/book/concept/${space}/`, payload, {
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

export const createConceptDetail = (
  space: string,
  bookref: string,
  conceptref: string,
  payload: any,
  authorization: any
) => {
  return httpPost(`/book/concept-detail/${space}/${bookref}/${conceptref}`, payload, {
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

export const updateConceptDetail = (
  space: string,
  id: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/book/concept-detail/${space}/${id}`, payload, {
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

export const generateConceptSectionHead = (
  space: string,
  bookref: string,
  conceptref: string,
  payload: any,
  authorization: any
) => {
  return httpPost(
    `/book/concept/${space}/${bookref}/${conceptref}/generate-head`,
    payload,
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
      return Promise.resolve({});
    });
};

export const getConceptDetailList = (
  space: string,
  bookref: string,
  conceptref: string,
  authorization: any
) => {
  return httpGet(`/book/concept-detail/${space}/${bookref}/${conceptref}`, {
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
