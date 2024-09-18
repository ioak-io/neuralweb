/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const saveTheme = (space: string, payload: any, authorization: any) => {
  return httpPut(`/book/theme/${space}/`, payload, {
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

export const createThemeDetail = (
  space: string,
  bookref: string,
  conceptref: string,
  themeref: string,
  payload: any,
  authorization: any
) => {
  return httpPost(
    `/book/theme-detail/${space}/${bookref}/${conceptref}/${themeref}`,
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

export const updateThemeDetail = (
  space: string,
  id: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/book/theme-detail/${space}/${id}`, payload, {
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

export const generateThemeSectionHead = (
  space: string,
  bookref: string,
  themeref: string,
  payload: any,
  authorization: any
) => {
  return httpPost(
    `/book/theme/${space}/${bookref}/${themeref}/generate-head`,
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

export const getThemeDetailList = (
  space: string,
  bookref: string,
  conceptref: string,
  themeref: string,
  authorization: any
) => {
  return httpGet(
    `/book/theme-detail/${space}/${bookref}/${conceptref}/${themeref}`,
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

export const getThemeByReference = (
  space: string,
  bookref: string,
  conceptref: string,
  themeref: string,
  authorization: any
) => {
  return httpGet(`/book/theme/${space}/${bookref}/${conceptref}/${themeref}`, {
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

export const getThemesByBookref = (
  space: string,
  bookref: string,
  authorization: any
) => {
  return httpGet(`/book/theme/${space}/${bookref}`, {
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
