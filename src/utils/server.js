const BASE_URL = "http://103.127.97.117:4001/";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

function deleteAccessToken() {
  return localStorage.removeItem("accessToken");
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: Bearer`${getAccessToken()}`,
    },
  });
}
async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    //login diganti sesuai postman
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // console.log(response);
  const responseJson = await response.json();
  // console.log(responseJson);
  if (response.status >= 400) {
    alert(responseJson.message); //messagenya sesuaikan postman
    return { error: true, code: response.status, data: responseJson.data }; //data sesuaikan postman
  }

  return { error: false, code: response.status, data: responseJson.data };
}

export { getAccessToken, putAccessToken, deleteAccessToken, login };
