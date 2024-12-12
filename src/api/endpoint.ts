// Base path cho API
const API_BASE = "";

export const ENDPOINTS = {
  USERS: `${API_BASE}/users`, // Endpoint cho user
  AUTH_LOGIN: `${API_BASE}/auth/login`,
  AUTH_REGISTER: `${API_BASE}/auth/register`,
  TASKS: `${API_BASE}/tasks`, // Endpoint cho task
};

export default ENDPOINTS;