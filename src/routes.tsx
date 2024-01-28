import { createBrowserRouter } from "react-router-dom";
import Form from "./pages/Form";
import CreateForm from "./pages/CreateForm";
import Reponses from "./pages/Reponses";
import Canvas from "./pages/Canvas";
import Home from "./pages/Home";
import CreateNew from "./pages/CreateNew";
import LoginPage from "./pages/LoginPage";
import AuthCheck from "./components/AuthCheck";
import RegisterPage from "./pages/RegisterPage";
import FormOwnerCheck from "./components/FormOwnerCheck";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  { path: "/", element: <Form /> },
  { path: "/createForm", element: <CreateForm /> },
  { path: "/reponses", element: <Reponses /> },
  { path: "/canvas", element: <Canvas /> },
  {
    path: "/home",
    element: (
      <AuthCheck>
        <Layout>
          <Home />
        </Layout>
      </AuthCheck>
    ),
  },
  {
    path: "/create-new/:formUid",
    element: (
      <FormOwnerCheck>
        <CreateNew />
      </FormOwnerCheck>
    ),
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

export default router;
