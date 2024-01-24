import "./App.css";
import Form from "./pages/Form";
import CreateForm from "./pages/CreateForm";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Form />
    </ChakraProvider>
  );
}

export default App;
