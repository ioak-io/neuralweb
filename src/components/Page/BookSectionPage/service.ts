/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const getSections = (
  space: string,
  reference: string,
  authorization: any
) => {
  return httpGet(`/book/section/${space}/${reference}`, {
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
export const getSectionByReference = (
  space: string,
  bookref: string,
  sectionref: string,
  authorization: any
) => {
  return httpGet(`/book/section/${space}/${bookref}/${sectionref}`, {
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

export const generateSections = (
  space: string,
  bookRef: string,
  authorization: any
) => {
  return httpPost(
    `/book/section/${space}/${bookRef}/generate-sections`,
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
      return Promise.resolve({});
    });
};
