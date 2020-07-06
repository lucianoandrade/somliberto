import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Analytics from "../components/features/analytics/Analytics";
// import Meta from "./helpers/meta";
import SetTitles from "../helpers/SetTitles";

import Home from "./home";
import Login from "./login";
import Register from "./register";
import confirmationCode from "./confirmationCode";
import UserData from "./userData";
import ForgotPassword from "./forgotPassword";
import newPassword from "./newPassword";
import Profile from "./profile";
import EditProfile from "./editProfile";
import AboutUs from "./aboutUs";
import EventDetail from "./eventDetail";
import Logout from "./Logout";

const Routes = () => {

  return (
    <BrowserRouter>
      <Analytics />
      <SetTitles />
      {/* <Meta /> */}
        <main>
          <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/login" component={ Login } />
            <Route path="/cadastro" component={ Register } />
            <Route path="/codconfirmacao" component={ confirmationCode } />
            <Route path="/seusdados" component={ UserData } />
            <Route path="/esquecisenha" component={ ForgotPassword } />
            <Route path="/novasenha" component={ newPassword } />
            <Route path="/perfil" component={ Profile } />
            <Route path="/editarperfil" component={ EditProfile } />
            <Route path="/quemsomos" component={ AboutUs } />
            <Route path="/eventos/:slug" component={ EventDetail } />
            <Route path="/logout" component={Logout} />
          </Switch>
        </main>
    </BrowserRouter>
  );
};

export default Routes;
