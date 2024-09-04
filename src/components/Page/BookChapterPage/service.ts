/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const getChapters = (
  space: string,
  reference: string,
  authorization: any
) => {
  return httpGet(`/book/chapter/${space}/${reference}`, {
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

export const generateChapters = (
  space: string,
  bookRef: string,
  authorization: any
) => {
  return httpPost(
    `/book/chapter/${space}/${bookRef}/generate-chapters`,
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
