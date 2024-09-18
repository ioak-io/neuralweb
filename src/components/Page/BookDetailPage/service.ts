/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const saveBookdetail = (
  space: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/book/detail/${space}/`, payload, {
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

export const createBookdetail = (
  space: string,
  bookref: string,
  payload: any,
  authorization: any
) => {
  return httpPost(`/book/detail/${space}/${bookref}`, payload, {
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

export const updateBookdetail = (
  space: string,
  id: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/book/detail/${space}/${id}`, payload, {
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

export const getBookdetailList = (
  space: string,
  bookref: string,
  authorization: any
) => {
  return httpGet(`/book/detail/${space}/${bookref}`, {
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

export const getBookdetailByReference = (
  space: string,
  bookref: string,
  conceptref: string,
  bookdetailref: string,
  authorization: any
) => {
  return httpGet(
    `/book/detail/${space}/${bookref}/${conceptref}/${bookdetailref}`,
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
      return Promise.resolve([]);
    });
};

export const getBookdetailsByBookref = (
  space: string,
  bookref: string,
  authorization: any
) => {
  return httpGet(`/book/detail/${space}/${bookref}`, {
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
