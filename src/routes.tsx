import { createBrowserRouter } from "react-router-dom";
import AuthCheck from "./components/AuthCheck";
import FormOwnerCheck from "./components/FormOwnerCheck";
import Layout from "./components/Layout";
import Canvas from "./pages/Canvas";
import EditForm from "./pages/Edit";
import Form from "./pages/Form";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Reponses from "./pages/Reponses";

const router = createBrowserRouter([
  { path: "/forms/:formUid", element: <Form /> },
  { path: "/reponses", element: <Reponses /> },
  {
    path: "/home",
    element: (
      <AuthCheck>
        <Home />
      </AuthCheck>
    ),
  },
  {
    path: "/edit/:formUid",
    element: (
      <AuthCheck>
        <FormOwnerCheck>
          <EditForm />
        </FormOwnerCheck>
      </AuthCheck>
    ),
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

export default router;
