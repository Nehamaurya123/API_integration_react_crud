import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AuthenticatedRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AuthenticatedRoutes />
    </BrowserRouter>
  );
}

export default App;
