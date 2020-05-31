import axios from 'axios';
import AuthService from './AuthService';

const POLICY_API_BASE_URL = 'http://localhost:8080/policies';

class PolicyService {

    fetchPolicies() {
        return axios.get(POLICY_API_BASE_URL, AuthService.getAuthHeader());
    }

    fetchPolicyById(policyId) {
        return axios.get(POLICY_API_BASE_URL + '/' + policyId, AuthService.getAuthHeader());
    }

    fetchPoliciesByUserId(username) {
        return axios.get(POLICY_API_BASE_URL + '/' + username, AuthService.getAuthHeader());
    }
    deletePolicy(policyId) {
        return axios.delete(POLICY_API_BASE_URL + '/' + policyId, AuthService.getAuthHeader());
    }

    addPolicy(policy) {
        return axios.post(""+POLICY_API_BASE_URL, policy, AuthService.getAuthHeader());
    }

    editPolicy(policy) {
        return axios.put(POLICY_API_BASE_URL + '/' + policy.id, policy, AuthService.getAuthHeader());
    }

}

export default new PolicyService();