/** @format */

import "./App.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { Button, ButtonGroup, Center } from "@chakra-ui/react";
import Example from "./Example";
import { useNavigate } from "react-router";

const queryClient = new QueryClient();

function App() {
  const [isShown, setIsShown] = useState(true);
  const navigate = useNavigate();

  const routeChange = () => {
    navigate("/example");
    setIsShown((isShown) => !isShown);
  };

  const goBack = () => {
    navigate("");

    setIsShown((isShown) => !isShown);
  };

  return (
    <>
      {isShown && (
        <Center>
          <Button colorScheme="blue" borderRadius={2} onClick={routeChange}>
            Generate Links
          </Button>
        </Center>
      )}
      {!isShown && (
        <Center>
          <Button colorScheme="blue" onClick={goBack}>
            Go Back
          </Button>
        </Center>
      )}

      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/example" element={<Example />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
