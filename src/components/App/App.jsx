import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { Box, ChakraProvider } from "@chakra-ui/react";

import { PublisherRouteContainer } from "@routes/PublisherRoute/PublisherRoute.container";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/publisher" />,
  },
  {
    path: "/publisher",
    element: <PublisherRouteContainer />,
  },
]);

export const App = () => (
  <ChakraProvider>
    <Box w="100vw" h="100vh" overflow={"auto"} p={4}>
      <RouterProvider router={router} />
    </Box>
  </ChakraProvider>
);
