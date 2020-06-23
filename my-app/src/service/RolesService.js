import axios from "axios";
import AuthService from "./AuthService";

const API_BASE_URL = "http://localhost:8080";

const ROLE_BASED_URL = API_BASE_URL + "/roles";
const PERMISSION_BASED_URL = API_BASE_URL + "/permissions";

class RoleService {
  fetchRoles() {
    return axios.get(ROLE_BASED_URL, AuthService.getAuthHeader());
  }

  createRole(role) {
    return axios.post(ROLE_BASED_URL, role, AuthService.getAuthHeader());
  }

  deleteRole(roleId) {
    return axios.delete(
      ROLE_BASED_URL + "/" + roleId,
      AuthService.getAuthHeader()
    );
  }

  fetchPermissions() {
    return axios.get(PERMISSION_BASED_URL, AuthService.getAuthHeader());
  }

  assignPermission(role, permission) {
    return axios.get(
      ROLE_BASED_URL + "/" + role.id + "/permissions/" + permission.id,
      AuthService.getAuthHeader()
    );
  }

  unassignPermission(role, permission) {
    return axios.delete(
      ROLE_BASED_URL + "/" + role.id + "/permissions/" + permission.id,
      AuthService.getAuthHeader()
    );
  }
}

export default new RoleService();
