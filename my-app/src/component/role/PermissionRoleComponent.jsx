import React, { Component } from "react";
import RolesService from "../../service/RolesService";
import Checkbox from "@material-ui/core/Checkbox";

class PermissionRoleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: this.props.role,
      permission: this.props.permission,
    };
  }

  handleChange = (role, permission) => {
    if (this.hasPermission(role, permission)) {
      RolesService.unassignPermission(role, permission).then((response) => {
        if (response.data.status === 200) {
          this.setState({ role: response.data.result });
        }
      });
    } else {
      RolesService.assignPermission(role, permission).then((response) => {
        if (response.data.status === 200) {
          this.setState({ role: response.data.result });
        }
      });
    }
  };

  hasPermission = (role, permission) => {
    if (role !== undefined && role.permissions !== undefined) {
      for (var i = 0; i < role.permissions.length; i++) {
        if (role.permissions[i].id === permission.id) return true;
      }
    } else {
      console.log("user roles not available");
    }
    return false;
  };

  render() {
    return (
      <div>
        <Checkbox
          onChange={() =>
            this.handleChange(this.state.role, this.state.permission)
          }
          checked={
            this.hasPermission(this.state.role, this.state.permission)
              ? true
              : false
          }
        />
      </div>
    );
  }
}

export default PermissionRoleComponent;
