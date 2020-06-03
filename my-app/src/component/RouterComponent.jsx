import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";

import ListPolicyComponent from "./policy/ListPolicyComponent";
import AddPolicyComponent from "./policy/AddPolicyComponent";
import EditPolicyComponent from "./policy/EditPolicyComponent";

import FileDownloadComponent from "./policy/FileDownloadComponent";

import React from "react";
import LoginComponent from "./user/LoginComponent";

const AppRouter = () => {
    return(
            <Router>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/list-user" component={ListUserComponent} />
                        <Route path="/add-user" component={AddUserComponent} />
                        <Route path="/edit-user" component={EditUserComponent} />

                        <Route path="/list-policy" component={ListPolicyComponent} />
                        <Route path="/add-policy" component={AddPolicyComponent} />
                        <Route path="/edit-policy" component={EditPolicyComponent} />
                        <Route path="/file-download" component={FileDownloadComponent} />
                    </Switch>
            </Router>
    )
}

export default AppRouter;