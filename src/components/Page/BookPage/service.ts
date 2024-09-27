/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const getBook = (
  space: string,
  reference: string,
  authorization: any
) => {
  return httpGet(`/book/${space}/reference/${reference}`, {
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

export const getBookGenerationLog = (
  space: string,
  authorization: any,
  bookref: string,
  sectionref?: string,
  sectiontype?: string
) => {
  let url = `/book/log/${space}/${bookref}`;

  if (sectionref) {
    url += `/${sectionref}`;
  }
  if (sectiontype) {
    url += `/${sectiontype}`;
  }

  return httpGet(url, {
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

export const generateReport = (
  space: string,
  reference: string,
  authorization: any
) => {
  return httpGet(`/report/book/${space}/${reference}`, {
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
