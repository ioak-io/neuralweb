/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../Lib/RestTemplate";

export const getRecentlyCreatedNote = (space: string, authorization: any) => {
  return httpGet(`/note/${space}/recently-created`, {
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

export const brainstormWithAi = (
  space: string,
  authorization: any,
  payload: any
) => {
  return httpPost(
    `/note/${space}/brainstorm`,
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
