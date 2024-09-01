/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const getFleetingnotes = (space: string, authorization: any) => {
  return httpGet(`/fleetingnote/${space}/`, {
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

export const saveFleetingnote = (
  space: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/fleetingnote/${space}/`, payload, {
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

export const getFleetingnoteByReference = (
  space: string,
  reference: string,
  authorization: any
) => {
  return httpGet(`/fleetingnote/${space}/reference/${reference}`, {
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

export const generateReport = (
  space: string,
  reference: string,
  authorization: any
) => {
  return httpGet(`/report/${space}/${reference}`, {
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
