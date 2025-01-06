import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginViews from "./views/LoginViews";
import RegisterViews from "./views/RegisterViews";
import AuthLayouts from "./layouts/AuthLayouts";
import AppLayout from "./layouts/AppLayou";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import HandleView from "./views/HandleView";
import NotFoundView from "./views/NotFoundView";
import HomeView from "./views/HomeView";


export default function Router() {

      return (
            <BrowserRouter>
                  <Routes>
                        <Route element={<AuthLayouts />}>
                              <Route path="/auth/login" element={<LoginViews />} />
                              <Route path="/auth/register" element={<RegisterViews />} />
                        </Route>
                        <Route path="/admin" element={<AppLayout />}>
                              <Route index={true} element={<LinkTreeView />} />
                              <Route path="profile" element={<ProfileView />} />
                        </Route>
                        <Route path="/:handle" element={<AuthLayouts />}>
                              <Route index={true} element={<HandleView />} />
                        </Route>
                        <Route path="/" element={<HomeView />} />
                        <Route path="/404" element={<AuthLayouts />}>
                              <Route index={true} element={<NotFoundView />} />
                        </Route>
                  </Routes>
            </BrowserRouter>
      )
};

