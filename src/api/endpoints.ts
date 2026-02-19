const BASIC_URL = "http://localhost:5000";

export const endpoints = {
  // auth
  login: `${BASIC_URL}/auth/login`,
  register: `${BASIC_URL}/auth/register`,
  logout: `${BASIC_URL}/auth/logout`,

  // posts
  createPost: `${BASIC_URL}/posts`,

  // user
  getUser: `${BASIC_URL}/user`,
};
