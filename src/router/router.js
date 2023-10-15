import { createBrowserRouter } from "react-router-dom";
import SearchBox from "../components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchBox />,
  },
]);

export default router;
