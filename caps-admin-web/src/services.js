import axios from "axios";
import API_URL from "./api_url";

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

  getDashboardCounts: async () => {
    const response = await axios.get(API_URL + 'dashboard/counts');
    return response.data;
  },

  fetchRiders: async () => {
    const response = await axios.get(API_URL + 'riders');
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

};

export default userService;