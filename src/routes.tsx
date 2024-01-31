import { createBrowserRouter } from "react-router-dom";
import AuthCheck from "./components/AuthCheck";
import FormOwnerCheck from "./components/FormOwnerCheck";
import EditForm from "./pages/Edit";
import Form from "./pages/Form";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Redirect from "./components/Redirect";

const router = createBrowserRouter([
  { path: "/", element: <Redirect to="/home" /> },
  { path: "/forms/:formUid", element: <Form /> },
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
