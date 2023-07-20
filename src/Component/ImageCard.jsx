import React from "react";
import Tooltip from "@mui/material/Tooltip";

const ImageCard = ({ image }) => {
  return (
    <div className="m-4">
      
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
