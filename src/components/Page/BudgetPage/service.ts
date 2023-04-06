/* eslint-disable import/prefer-default-export */
import { httpGet, httpPut } from '../../Lib/RestTemplate';

export const getBudgetByYear = (
  space: string,
  year: number,
  authorization: any
) => {
  return httpGet(`/budget/${space}/${year}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve([]);
    })
    .catch((error) => {
      return Promise.resolve([]);
    });
};

export const saveBudget = (
  space: string,
  year: number,
  payload: any,
  authorization: any
) => {
  return httpPut(`/budget/${space}/${year}`, payload, {
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
