"use client";

import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";

interface Props {
  title: string;
  videoUrl: string;
  autoPlay: boolean;
}

export default function VideoPlayer({ title, videoUrl, autoPlay }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let player: any;

    const initPlayer = async () => {
      const Plyr = (await import("plyr")).default;

      if (videoRef.current) {
        player = new Plyr(videoRef.current, {
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "settings",
            "fullscreen",
          ],
        });
      }
    };

    initPlayer();

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  return (
    <div className="h-full w-full rounded-xl overflow-hidden">
      <video ref={videoRef} className="w-full h-full" controls playsInline>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}
