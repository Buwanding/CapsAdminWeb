import axios from "axios";
import API_URL from "./api_url";

const userService = {
  login: async (email, password) => {
    const response = await axios.post(API_URL + "user/login", {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const token = localStorage.getItem('token');
    await axios.post(API_URL + 'user/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  getDashboardCounts: async () => {
    const response = await axios.get(API_URL + 'user/dashboard/counts');
    return response.data;
  },

  fetchRiders: async () => {
    const response = await axios.get(API_URL + 'user/riders');
    return response.data;
  },

  fetchCustomers: async () => {
    try {
      const response = await axios.get(API_URL + 'user/customers');
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;  // Re-throw the error so it can be caught in the component
    }
  },

  fetchAdmin: async () => {
    const response = await axios.get(API_URL + 'user/admin');
    return response.data;
  },

};

export default userService;