import axios from 'axios';

export function makeApiRequest(path, method, data = null) {
  let newUrl = `http://ppg.innovasium.com/ppg_v8/json-api/${path}`;
  let requestConfig = {
    withCredentials: true,
    headers: {
      'Accept': '*/*',
      'content-type': 'application/x-www-form-urlencoded',
    },
  };
  if (method === 'get') {
    return axios.get(newUrl, requestConfig);
  }
  else if (method === 'post') {
    const params = new URLSearchParams();
    params.append('data', data);
    return axios.post(newUrl, params, requestConfig);
  }
}

export function getDataFromResponse(response) {
  return response.data;
}

export function get(path) {
  return makeApiRequest(path, 'get');
}

export function post(path, data = null) {
  if (data) {
    return makeApiRequest(path, 'post', data);
  }
  return makeApiRequest(path, 'post');
}
