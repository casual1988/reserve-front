import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";

import ListPolicyComponent from "./policy/ListPolicyComponent";
import AddPolicyComponent from "./policy/AddPolicyComponent";
import EditPolicyComponent from "./policy/EditPolicyComponent";

import FileDownloadComponent from "./policy/FileDownloadComponent";

import React from "react";
import LoginComponent from "./user/LoginComponent";
import LogoutComponent from "./user/LogoutComponent";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/list-policy" />
        </Route>
        <Route path="/login" component={LoginComponent} />
        <Route path="/logout" component={LogoutComponent} />

        <PrivateRoute path="/list-user" component={ListUserComponent} />
        <PrivateRoute path="/add-user" component={AddUserComponent} />
        <PrivateRoute path="/edit-user" component={EditUserComponent} />
        <PrivateRoute path="/list-policy" component={ListPolicyComponent} />
        <PrivateRoute path="/add-policy" component={AddPolicyComponent} />
        <PrivateRoute path="/edit-policy" component={EditPolicyComponent} />
        <PrivateRoute path="/file-download" component={FileDownloadComponent} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
