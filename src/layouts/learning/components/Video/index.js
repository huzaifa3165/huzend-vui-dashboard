import React from "react";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
const Video = ({ videoUrl }) => {
  return (
    <Card sx={{ padding: "0px" }}>
      <CardMedia
        sx={{
          margin: "0px",
        }}
        component="iframe"
        height="400"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        src={videoUrl}
      />
    </Card>
  );
};

export default Video;
