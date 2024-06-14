// env
const { VITE_PREFIX_API} = import.meta.env;

export function fetch_data({ url, method, data, host = VITE_PREFIX_API }) {
  if (host == '/') host = '';
  return fetch(`${host}${url}`, {
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const response_json = await res.json();
    if (res.ok) return response_json;
    return response_json;
  });
}

export function fetch_file({ url, method = "GET", data, host = VITE_PREFIX_API }) {
  if (host == "/") host = "";
  return fetch(`${host}${url}`, {
    method,
    mode: "cors",
    body: data,
  }).then(async (res) => {
    const response_json = await res.json();
    if (res.ok) return response_json;
    return response_json;
  });
}

export function get_data({ url, host = VITE_PREFIX_API }) {
  if (host == "/") host = "";
  return fetch(`${host}${url}`, {
    method: "GET",
    mode: "cors",
  }).then(async (res) => {
    const response_json = await res.json();
    if (res.status === 403) return window.location.reload();
    if (res.ok) return response_json;
    return response_json;
  });
}