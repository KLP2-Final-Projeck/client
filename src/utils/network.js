import axios from "axios";
const Swal = require("sweetalert2");
// const BASE_URL = "103.127.97.117:4002";
const BASE_URL = `localhost:4002`;

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

function putUsername(username) {
  return localStorage.setItem("username", username);
}

function getId(id) {
  return localStorage.setItem("id", id);
}

function getIsAdmin(isAdmin) {
  return localStorage.getItem("isAdmin", isAdmin);
}

function putIsAdmin(isAdmin) {
  return localStorage.setItem("isAdmin", isAdmin);
}

function deleteAccessToken() {
  return localStorage.removeItem("accessToken");
}

// async function getUserDataFromDatabase(token) {
//   try {
//     const response = await axios.get(`http://${BASE_URL}/user`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(response);
//     return response.data.username;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return { error: true, code: error.response?.status || 'UNKNOWN_ERROR' };
//   }
// }

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ username, password }) {
  const response = await fetch(`http://${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();
  console.log(responseJson);
  if (response.status >= 400) {
    alert(responseJson.msg || "Username atau password salah");
    return { error: true, code: response.status, data: null };
  }
  return { error: false, code: response.status, data: responseJson.data };
}

async function register({
  username,
  password,
  email,
  telepon = "",
  isAdmin = false,
}) {
  try {
    const response = await fetch(`http://${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email, telepon, isAdmin }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      console.error("Error response from server:", responseJson);
      Swal.fire(responseJson.msg || "Password Harus Lebih Dari 8 Karakter!");
      return { error: true, code: response.status };
    }

    console.log("Registrasi berhasil:", responseJson);
    return { error: false, code: response.status };
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Terjadi kesalahan. Silakan coba lagi.");
    return { error: true, code: 500 };
  }
}

async function getUserLogged() {
  const response = await fetchWithToken(`http://${BASE_URL}/Users`);
  const responseJson = await response.json();

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

async function addNote({ title, body }) {
  const response = await fetchWithToken(`http://${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

async function getNotes() {
  const response = await fetchWithToken(`http://${BASE_URL}/notes`);
  const responseJson = await response.json();

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

async function getUser(id) {
  const response = await fetchWithToken(`http://${BASE_URL}/User/:${id}`);
  const responseJson = await response.json();

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

async function deleteNote(id) {
  const response = await fetchWithToken(`http://${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

function isUserLoggedIn() {
  const authToken = getAccessToken();
  return !!authToken;
}

export {
  getAccessToken,
  putAccessToken,
  deleteAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getNotes,
  getUser,
  deleteNote,
  isUserLoggedIn,
  BASE_URL,
  putUsername,
  getIsAdmin,
  putIsAdmin,
  getId
};
