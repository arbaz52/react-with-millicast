import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Heading,
  IconButton,
} from "@chakra-ui/react";

import { SiDolby, SiReact } from "react-icons/si";
import {
  BiVideo,
  BiVideoOff,
  BiMicrophone,
  BiMicrophoneOff,
} from "react-icons/bi";
import { useEffect, useRef } from "react";
import { CONNECTION_STATUS } from "./PublisherRoute.constants";

export const PublisherRoute = ({
  stream,
  // mic
  isMicOn,
  onToggleMic,
  // camera
  isCameraOn,
  onToggleCamera,
  // connecting
  onConnect,
  onDisconnect,
  connectionStatus,
}) => {
  const videoElRef = useRef(null);
  useEffect(() => {
    videoElRef.current.srcObject = stream;
  }, [stream]);

  const isConnected = connectionStatus === CONNECTION_STATUS.CONNECTED;
  const isConnecting = connectionStatus === CONNECTION_STATUS.CONNECTING;

  return (
    <Stack w="100%" h="100%" gap={2}>
      <Flex alignItems={"center"} gap={2}>
        <SiReact size={28} />
        /
        <SiDolby size={34} />
      </Flex>
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Heading size="lg">React with Millicast</Heading>
          <Text mt={0}>Right way to Publish Media Stream Tracks</Text>
        </Box>
        <Button
          bg="black"
          color="white"
          isLoading={isConnecting}
          isDisabled={isConnecting}
          onClick={isConnected ? onDisconnect : onConnect}
        >
          {isConnecting
            ? "Connecting..."
            : isConnected
            ? "Stop Webinar"
            : "Start Webinar"}
        </Button>
      </Flex>
      <Box
        w="100%"
        overflow="hidden"
        background="#eee"
        flex={1}
        borderRadius={8}
      >
        <Box
          ref={videoElRef}
          as="video"
          muted
          autoPlay
          playsInline
          w="100%"
          h="100%"
          objectFit="cover"
          visibility={isCameraOn ? "visible" : "hidden"}
        />
      </Box>
      <Flex gap={2} justifyContent="center">
        <IconButton
          colorScheme={isMicOn ? "gray" : "red"}
          onClick={onToggleMic}
        >
          {isMicOn ? <BiMicrophone /> : <BiMicrophoneOff />}
        </IconButton>
        <IconButton
          colorScheme={isCameraOn ? "gray" : "red"}
          onClick={onToggleCamera}
        >
          {isCameraOn ? <BiVideo /> : <BiVideoOff />}
        </IconButton>
      </Flex>
    </Stack>
  );
};
