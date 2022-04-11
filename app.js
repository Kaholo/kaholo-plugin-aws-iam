const {
  getClient,
  getAwsCallback,
  getAwsUpdateParams,
  getUsernameParam,
} = require("./helpers");

function deleteAccessKey(action, settings) {
  const accessKeyId = (action.params.ACCESS_KEY_ID || "").trim();
  const userName = (action.params.USER_NAME || "").trim();

  if (!accessKeyId || !userName) {
    throw new Error("Not given one of required fields");
  }

  const params = {
    UserName: userName,
    AccessKeyId: accessKeyId,
  };

  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.deleteAccessKey(params, getAwsCallback(resolve, reject));
  });
}

function deleteUser(action, settings) {
  const params = getUsernameParam(action.params);
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.deleteUser(params, getAwsCallback(resolve, reject));
  });
}

function updateAccessKey(action, settings) {
  const params = getAwsUpdateParams(action.params, "accessKeyId", "AccessKeyId");
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.updateAccessKey(params, getAwsCallback(resolve, reject));
  });
}

function updateSSHPublicKey(action, settings) {
  const params = getAwsUpdateParams(action.params, "sshId", "SSHPublicKeyId");
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.updateSSHPublicKey(params, getAwsCallback(resolve, reject));
  });
}

function listAccessKeys(action, settings) {
  const params = getUsernameParam(action.params);
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.listAccessKeys(params, getAwsCallback(resolve, reject));
  });
}

function listUsers(action, settings) {
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.listUsers({}, getAwsCallback(resolve, reject));
  });
}

function getAccessKeyLastUsed(action, settings) {
  const params = { AccessKeyId: action.params.accessKeyId };
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.getAccessKeyLastUsed(params, getAwsCallback(resolve, reject));
  });
}

module.exports = {
  deleteAccessKey,
  deleteUser,
  updateAccessKey,
  updateSSHPublicKey,
  listAccessKeys,
  listUsers,
  getAccessKeyLastUsed,
};
