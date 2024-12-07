import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginViews from "./views/LoginViews";
import RegisterViews from "./views/RegisterViews";
import AuthLayouts from "./layouts/AuthLayouts";


export default function Router() {

      return (
            <BrowserRouter>
                  <Routes>
                        <Route element={<AuthLayouts />}>
                              <Route path="/auth/login" element={<LoginViews />} />
                              <Route path="/auth/register" element={<RegisterViews />} />
                        </Route>
                  </Routes>
            </BrowserRouter>
      )
};

