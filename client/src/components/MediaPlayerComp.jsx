import React, { forwardRef } from "react";
import ReactPlayer from "react-player";

const baseFileUrl = "D:\\Program Lagu\\";

const MediaPlayerComp = forwardRef(({ url }, ref) => {
  return (
    <ReactPlayer
      ref={ref}
      url={url}
      width="100%"
      height="100%"
      controls={false}
      playing
      config={{
        youtube: {
          playerVars: {
            controls: 0,
            showinfo: 0,
            rel: 0,
          },
        },
        file: {
          forceVideo: true,
          forceAudio: true,
        },
      }}
    />
  );
});

export default MediaPlayerComp;
