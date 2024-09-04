/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const getConcepts = (
  space: string,
  reference: string,
  authorization: any
) => {
  return httpGet(`/book/concept/${space}/${reference}`, {
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

export const generateConcepts = (
  space: string,
  bookRef: string,
  authorization: any
) => {
  return httpPost(
    `/book/concept/${space}/${bookRef}/generate-concepts`,
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
