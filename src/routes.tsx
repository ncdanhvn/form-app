import { createBrowserRouter } from "react-router-dom";
import Form from "./pages/Form";
import CreateForm from "./pages/CreateForm";
import Reponses from "./pages/Reponses";
import Canvas from "./pages/Canvas";
import Home from "./pages/Home";
import CreateNew from "./pages/CreateNew";
import LoginPage from "./pages/LoginPage";
import AuthCheck from "./components/AuthCheck";

const router = createBrowserRouter([
  { path: "/", element: <Form /> },
  { path: "/createForm", element: <CreateForm /> },
  { path: "/reponses", element: <Reponses /> },
  { path: "/canvas", element: <Canvas /> },
  { path: "/home", element: <Home /> },
  {
    path: "/create-new",
    element: (
      <AuthCheck>
        <CreateNew />
      </AuthCheck>
    ),
  },
  { path: "/login", element: <LoginPage /> },
]);

export default router;
