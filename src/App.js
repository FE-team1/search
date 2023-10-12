import logo from "./logo.svg";
import "./App.css";
import SearchBox from "./components";
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
