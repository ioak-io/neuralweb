/* eslint-disable import/prefer-default-export */
import SectionModel from "../../../model/SectionModel";
import { httpDelete, httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

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

export const updateSection = (
  space: string,
  bookRef: string,
  sectionref: string,
  data: SectionModel,
  authorization: any
) => {
  return httpPut(`/book/section/${space}/${bookRef}/${sectionref}`, data, {
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

export const createSection = (
  space: string,
  bookRef: string,
  data: SectionModel,
  authorization: any
) => {
  return httpPost(`/book/section/${space}/${bookRef}`, data, {
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

export const deleteBookSection = (space: string, id: string, authorization: any) => {
  return httpDelete(`/book/section/${space}/${id}`, {
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
