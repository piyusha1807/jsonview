// utils/api.js
const API_BASE_URL = "https://api.example.com"; // Replace with your API's base URL

async function fetchData(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const requestOptions = {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(`${url}`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function get(endpoint, options = {}) {
  return fetchData(endpoint, { ...options, method: "GET" });
}

export async function post(endpoint, body, options = {}) {
  return fetchData(endpoint, { ...options, method: "POST", body });
}

export async function deleteApi(endpoint, options = {}) {
  return fetchData(endpoint, { ...options, method: "DELETE" });
}

// Add more HTTP methods (PUT, DELETE, etc.) as needed

export default {
  get,
  post,
};
