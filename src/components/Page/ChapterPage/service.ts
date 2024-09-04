/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const saveChapter = (
  space: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/book/chapter/${space}/`, payload, {
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

export const createChapterDetail = (
  space: string,
  bookref: string,
  chapterref: string,
  payload: any,
  authorization: any
) => {
  return httpPost(`/book/chapter-detail/${space}/${bookref}/${chapterref}`, payload, {
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

export const generateChapterSectionHead = (
  space: string,
  bookref: string,
  chapterref: string,
  payload: any,
  authorization: any
) => {
  return httpPost(
    `/book/chapter/${space}/${bookref}/${chapterref}/generate-head`,
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

export const getChapterDetailList = (
  space: string,
  bookref: string,
  chapterref: string,
  authorization: any
) => {
  return httpGet(`/book/chapter-detail/${space}/${bookref}/${chapterref}`, {
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
