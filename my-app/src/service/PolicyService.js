import axios from "axios";
import AuthService from "./AuthService";

const POLICY_API_BASE_URL = "http://localhost:8282/policies";
const POLICY_REPORT_API_BASE_URL = "http://localhost:8282/report";

class PolicyService {
  fetchPolicies() {
    return axios.get(POLICY_API_BASE_URL, AuthService.getAuthHeader());
  }

  fetchPolicyById(policyId) {
    return axios.get(
      POLICY_API_BASE_URL + "/" + policyId,
      AuthService.getAuthHeader()
    );
  }
  downloadReport() {
    return axios.get(POLICY_REPORT_API_BASE_URL, AuthService.getAuthHeader());
  }

  fetchPoliciesByUserId() {
    return axios.get(
      POLICY_API_BASE_URL + "/listPolicyByUsername",
      AuthService.getAuthHeader()
    );
  }
  deletePolicy(policyId) {
    return axios.delete(
      POLICY_API_BASE_URL + "/" + policyId,
      AuthService.getAuthHeader()
    );
  }

  addPolicy(policy) {
    return axios.post(
      "" + POLICY_API_BASE_URL,
      policy,
      AuthService.getAuthHeader()
    );
  }

  editPolicy(policy) {
    return axios.put(
      POLICY_API_BASE_URL + "/" + policy.id,
      policy,
      AuthService.getAuthHeader()
    );
  }

  // validates policy number when new policy is created in form
  isValidPolicyNumber(policyNumber, policyType){
    return axios.get(
      POLICY_API_BASE_URL + "/validate?policyNumber=" + policyNumber+"&policyType="+policyType,
      AuthService.getAuthHeader()
    );
  }
}

export default new PolicyService();
