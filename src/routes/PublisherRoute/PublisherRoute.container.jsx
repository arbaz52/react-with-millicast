import { useEffect, useRef, useState } from "react";

import { Director, Publish } from "@millicast/sdk";
import { useDisclosure, useToast } from "@chakra-ui/react";

import { PublisherRoute } from "./PublisherRoute";

import { CONNECTION_STATUS } from "./PublisherRoute.constants";

export const PublisherRouteContainer = () => {
  const streamRef = useRef(new MediaStream());
  const publishRef = useRef(
    (() => {
      const searchParams = new URLSearchParams(window.location.search);
      const STREAM_NAME =
        searchParams.get("streamName") || process.env.REACT_APP_STREAM_NAME;
      const PUBLISHING_TOKEN =
        searchParams.get("publishingToken") ||
        process.env.REACT_APP_PUBLISHING_TOKEN;

      const tokenGenerator = () =>
        Director.getPublisher({
          token: PUBLISHING_TOKEN,
          streamName: STREAM_NAME,
        });

      return new Publish(STREAM_NAME, tokenGenerator);
    })()
  );
  const toast = useToast({ position: "top" });

  const { isOpen: isMicOn, onToggle: toggleMic } = useDisclosure();
  const { isOpen: isCameraOn, onToggle: toggleCamera } = useDisclosure();

  const [connectionStatus, setConnectionStatus] = useState(
    CONNECTION_STATUS.NOT_CONNECTED
  );

  const handleConnect = () => {
    setConnectionStatus(CONNECTION_STATUS.CONNECTING);

    toast({
      title: "Starting broadcast...",
    });

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((newStream) => {
        newStream.getTracks().forEach((track) => {
          track.enabled = false;
        });
        publishRef.current
          .connect({
            mediaStream: newStream,
          })
          .then(() => {
            toast({
              title: "Broadcast started",
            });
          })
          .finally(() => {
            setConnectionStatus(CONNECTION_STATUS.CONNECTED);
            newStream.getTracks().forEach((track) => {
              track.stop();
            });
            streamRef.current.getTracks().forEach((track) => {
              publishRef.current.webRTCPeer.replaceTrack(track);
            });
          });
      });
  };

  const handleDisconnect = () => {
    publishRef.current.stop();
    setConnectionStatus(CONNECTION_STATUS.NOT_CONNECTED);
    toast({
      title: "Broadcast stopped",
    });
  };

  useEffect(() => {
    if (!isMicOn) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.stop();
        streamRef.current.removeTrack(track);
      });
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((newStream) => {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.stop();
        streamRef.current.removeTrack(track);
      });
      const newAudioTrack = newStream.getAudioTracks()[0];
      streamRef.current.addTrack(newAudioTrack);
      publishRef.current.webRTCPeer.replaceTrack(newAudioTrack);
    });
  }, [isMicOn]);

  useEffect(() => {
    if (!isCameraOn) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.stop();
        streamRef.current.removeTrack(track);
      });
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: true }).then((newStream) => {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.stop();
        streamRef.current.removeTrack(track);
      });
      const newVideoTrack = newStream.getVideoTracks()[0];
      streamRef.current.addTrack(newVideoTrack);
      publishRef.current.webRTCPeer.replaceTrack(newVideoTrack);
    });
  }, [isCameraOn]);

  return (
    <PublisherRoute
      stream={streamRef.current}
      // mic
      isMicOn={isMicOn}
      onToggleMic={toggleMic}
      // camera
      isCameraOn={isCameraOn}
      onToggleCamera={toggleCamera}
      // connection
      onConnect={handleConnect}
      onDisconnect={handleDisconnect}
      connectionStatus={connectionStatus}
    />
  );
};
