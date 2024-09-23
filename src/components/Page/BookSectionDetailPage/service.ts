/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from "../../Lib/RestTemplate";

export const saveBookdetail = (
  space: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/book/section-detail/${space}/`, payload, {
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
  sectionref: string,
  payload: any,
  authorization: any
) => {
  return httpPost(
    `/book/section-detail/${space}/${bookref}/${sectionref}`,
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

export const updateBookdetail = (
  space: string,
  id: string,
  payload: any,
  authorization: any
) => {
  return httpPut(`/book/section-detail/${space}/${id}`, payload, {
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
  sectionref: string,
  authorization: any
) => {
  return httpGet(`/book/section-detail/${space}/${bookref}/${sectionref}`, {
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
  bookSectionDetailref: string,
  authorization: any
) => {
  return httpGet(
    `/book/section-detail/${space}/${bookref}/${conceptref}/${bookSectionDetailref}`,
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
  return httpGet(`/book/section-detail/${space}/${bookref}`, {
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
