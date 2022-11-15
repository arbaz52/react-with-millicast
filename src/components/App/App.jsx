import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Box, ChakraProvider } from "@chakra-ui/react";

import { HomeRoute } from "@routes/HomeRoute/HomeRoute";
import { PublisherRouteContainer } from "@routes/PublisherRoute/PublisherRoute.container";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
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
