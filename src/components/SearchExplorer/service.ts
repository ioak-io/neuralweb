/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpDelete, httpPut } from '../Lib/RestTemplate';

export const searchNote = (space: string, text: string, authorization: any) => {
  return httpPost(
    `/note/${space}/search`,
    { text },
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
