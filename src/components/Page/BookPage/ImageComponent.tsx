import React from "react";

interface Props {
  imageUrl?: string;
}

const ImageComponent = (props: Props) => {
  return (
    <img
      src={props.imageUrl}
      alt="Image"
      style={{
        width: "200px", // Fixed width
        height: "auto", // Automatic height based on aspect ratio
        display: "block", // Ensures no inline spacing
        maxWidth: "100%", // Ensures the image does not exceed the container width
      }}
    />
  );
};

export default ImageComponent;
