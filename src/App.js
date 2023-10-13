import "./App.css";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";
import SearchProvider from "./provider/searchProvider";

function App() {
  return (
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  );
}

export default App;
