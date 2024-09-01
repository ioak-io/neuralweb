import { isEmptyOrSpaces } from "../components/Utils";

export const copyHtmlToClipboard = ({
  htmlContent,
  textContent,
}: {
  htmlContent?: string;
  textContent?: string;
}) => {
  if (!htmlContent || !textContent || isEmptyOrSpaces(htmlContent)) {
    return "";
  }

  const blobHtml = new Blob([htmlContent], { type: "text/html" });
  const blobText = new Blob([textContent], { type: "text/plain" });

  const data = [
    new ClipboardItem({
      "text/html": blobHtml,
      "text/plain": blobText,
    }),
  ];

  navigator.clipboard
    .write(data)
    .then(() => {
      console.log("HTML and text content copied to clipboard.");
    })
    .catch((err) => {
      console.error("Failed to copy content:", err);
    });
};
