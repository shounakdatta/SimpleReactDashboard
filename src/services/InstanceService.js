import { get, getDataFromResponse, post } from './ApiRequests';

// ROLE MANAGER FUNCTIONS

export function getSecurityRoles() {
  const path = 'applicationUserManager.cfc?method=getSecurityRoles';
  return get(path).then(getDataFromResponse);
}

export function saveRole(roleObj) {
  const data = JSON.stringify({ roleObj })
  const path = 'applicationUserManager.cfc?method=saveRole';
  return post(path, data).then(getDataFromResponse);
}

export function deleteRole(roleId) {
  const data = JSON.stringify({ roleId })
  const path = 'applicationUserManager.cfc?method=deleteRole';
  return post(path, data).then(getDataFromResponse);
}

// LANGUAGE MANAGER FUNCTIONS

export function getLangObj() {
  const path = 'languageManager.cfc?method=getLangObj';
  return get(path).then(getDataFromResponse);
}

export function saveLangObj(langObj) {
  const data = JSON.stringify({ langObj })
  const path = 'languageManager.cfc?method=saveLanguageObj';
  return post(path, data).then(getDataFromResponse);
}
