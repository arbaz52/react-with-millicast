import {
  Text,
  Stack,
  Input,
  Button,
  Heading,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

export const HomeRoute = () => {
  return (
    <Stack
      as="form"
      method="GET"
      action="/publisher"
      top="50%"
      left="50%"
      pos="absolute"
      transform="translate(-50%, -50%)"
      p={8}
      gap={1}
      maxW={400}
      boxShadow="xl"
      borderRadius={8}
    >
      <Heading>Millicast Details</Heading>
      <Text>
        In order to stream to millicast, we need the following details.
      </Text>
      <FormControl required>
        <FormLabel>Stream Name</FormLabel>
        <Input required placeholder="Stream Name" name="streamName" />
      </FormControl>
      <FormControl required>
        <FormLabel>Publishing Token</FormLabel>
        <Input required placeholder="Publishing Token" name="publishingToken" />
      </FormControl>
      <Button type="submit">Start Streaming</Button>
    </Stack>
  );
};
