import React from "react";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
const Video = () => {
  return (
    <Card sx={{ padding: "0px" }}>
      <CardMedia
        sx={{
          margin: "0px",
        }}
        component="iframe"
        height="480"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        src="https://www.youtube.com/embed/FFyR2Ssnakg?rel=0"
      />
    </Card>
  );
};

export default Video;
