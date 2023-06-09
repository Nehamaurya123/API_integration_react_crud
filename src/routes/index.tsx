import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AddbookPage, HomePage, LoginPage } from "../pages";
import PrivateRoute from "../components/requireAuth";
import ShowbookPage from "../pages/showpage";
import EditbookPage from "../pages/editbooklist";

export type RouterProps = {};

const AuthenticatedRoutes: FC<RouterProps> = () => {
  return (
    <Routes>
      <Route path={"/"} element={<LoginPage />} />
      <Route
        path={"/home"}
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
       <Route
        path={"/add"}
        element={
          <PrivateRoute>
           <AddbookPage />
          </PrivateRoute>
        }
      />
      <Route
        path={"/show"}
        element={
          <PrivateRoute>
           <ShowbookPage />
          </PrivateRoute>
        }
      />
      <Route 
      path={"/edit/:id"} 
      element={
       <PrivateRoute>
       <EditbookPage />
       </PrivateRoute>
      }
      />
      ;
    </Routes>
  );
};

export default AuthenticatedRoutes;
