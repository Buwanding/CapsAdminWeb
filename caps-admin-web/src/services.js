import axios from "axios";
import { API_URL, img_url } from "./api_url";

const userService = {
  login: async (email, password) => {
    const response = await axios.post(API_URL + "login", {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const token = localStorage.getItem('token');
    await axios.post(API_URL + 'logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  

  signup: async (userData) => {
    try {
      const response = await axios.post(API_URL + 'signup', userData);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  getDashboardCounts: async () => {
    const response = await axios.get(API_URL + 'dashboard/counts');
    return response.data;
  },

  fetchRiders: async () => {
    const response = await axios.get(API_URL + 'riders');
    return response.data;
  },

  fetchRequirements: async () => {
    const response = await axios.get(API_URL + 'riders_req');
    return response.data;
  },

  fetchCustomers: async () => {
    try {
      const response = await axios.get(API_URL + 'customers');
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;  // Re-throw the error so it can be caught in the component
    }
  },

  fetchAdmin: async () => {
    const response = await axios.get(API_URL + 'admin');
    return response.data;
  },

  // getAdminById: async (editingAdminId) => {
  //   const response = await axios.get(API_URL + 'admin/' + editingAdminId);
  //   return response.data;
  // },

  updateAdmin: async (editingAdmin, adminData) => {
    console.log("ANG YAWA NGA ID: ", editingAdmin.user_id);
    try {
      const response = await axios.put(API_URL + `update_admin/${editingAdmin.user_id}`, adminData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateAdminStatus: async (userId, status) => {
    try {
      const response = await axios.put(API_URL + 'admin/'+ userId + '/status', { status });
      console.log(`API response for updating user ${userId} status:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`API error for updating user ${userId} status:`, error);
      throw error;
    }
  },

  updateUserStatus: async (userId, status) => {
    try {
      const response = await axios.put(API_URL + 'customer/'+ userId + '/status', { status });
      console.log(`API response for updating user ${userId} status:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`API error for updating user ${userId} status:`, error);
      throw error;
    }
  },

  updateRiderStatus: async (userId, status) => {
    try {
      const response = await axios.put(API_URL + 'rider/'+ userId + '/status', { status });
      console.log(`API response for updating user ${userId} status:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`API error for updating user ${userId} status:`, error);
      throw error;
    }
  },

  fetchHistory: async () => {
    try {
      const response = await axios.get(API_URL + 'history');
      return response.data;
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      throw error;
    }
  },

  fetchFeedbacks: async () => {
    try {
      const response = await axios.get(API_URL + 'feedbacks');
      return response.data;
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      throw error;
    }
  },

  verifyRider: async (userId, status) => {
    try {
      const response = await axios.put(`${API_URL}verify_rider/${userId}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error Verifying Rider:', error);
      throw error;
    }
  },

};

export default userService;