import { createBrowserRouter } from "react-router-dom";
import Form from "./pages/Form";
import CreateForm from "./pages/CreateForm";
import Reponses from "./pages/Reponses";

const router = createBrowserRouter([
  { path: "/", element: <Form /> },
  { path: "/createForm", element: <CreateForm /> },
  { path: "/reponses", element: <Reponses /> },
]);

export default router;
