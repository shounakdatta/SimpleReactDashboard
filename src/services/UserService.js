import { getDataFromResponse, post } from './ApiRequests';

export function validateUser(userObj) {
  const data = JSON.stringify({ userObj });
  const path = 'applicationManager.cfc?method=validateUser';
  return post(path, data).then(getDataFromResponse);
}

export function getSettings() {
  const path = 'applicationManager.cfc?method=getSettings';
  return post(path).then(getDataFromResponse);
}

export function getInstances() {
  const path = 'applicationManager.cfc?method=getInstances';
  return post(path).then(getDataFromResponse);
}

export function setInstance(instanceObj) {
  const data = JSON.stringify({ instanceObj });
  const path = 'applicationManager.cfc?method=setInstance';
  return post(path, data).then(getDataFromResponse);
}
