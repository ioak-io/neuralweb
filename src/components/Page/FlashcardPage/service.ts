import { httpPost } from "../../..//components/Lib/RestTemplate";

export const uploadFilesForFlashcard = (
  space: string,
  files: any[],
  authorization: any
) => {
  const formData = new FormData();
  Array.from(files).forEach((file, index) => {
    formData.append(`files`, file);
  });
  return httpPost(`/flashcard/${space}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: authorization.access_token,
    },
  })
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error: any) => {
      return Promise.resolve({});
    });
};
