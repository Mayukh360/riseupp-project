import React from "react";
import Tooltip from "@mui/material/Tooltip";

const ImageCard = ({ image }) => {
    //Here tooltip will show show the popup on
  return (
    <div className="m-8 overflow-hidden rounded-lg shadow-md transition-transform transform-gpu hover:scale-110">
      <Tooltip
        title={
          <a href={image.urls.full} target="_blank" rel="noopener noreferrer">
            {image.alt_description}
          </a>
        }
        placement="top"
      >
        <img
          src={image.urls.small}
          alt={image.alt_description}
          className="w-80 h-60 object-cover"
          data-tip
          data-for={`tooltip-${image.id}`}
        />
      </Tooltip>
    </div>
  );
};

export default ImageCard;
