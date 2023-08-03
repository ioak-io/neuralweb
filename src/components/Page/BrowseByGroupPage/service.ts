/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const getNotesByMetadataValue = (space: string, metadataId: string, metadataValue: string, authorization: any) => {
  return httpPost(`/note/${space}/metadata/${metadataId}`, { value: metadataValue }, {
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
