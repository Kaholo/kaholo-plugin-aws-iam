const {
  getClient,
  getAwsCallback,
  getAwsUpdateParams,
  getUsernameParam,
  getPathPrefixParam,
  getRoleNameWithRolePolicyParam,
} = require("./helpers");

function createRole(action, settings) {
  const params = getRoleNameWithRolePolicyParam(action.params);
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.createRole(params, getAwsCallback(resolve, reject));
  });
}

function deleteAccessKey(action, settings) {
  const targetAccessKeyId = (action.params.targetAccessKeyId || "").trim();
  const userName = (action.params.userName || "").trim();

  if (!targetAccessKeyId || !userName) {
    throw new Error("Not given one of required fields");
  }

  const params = {
    UserName: userName,
    AccessKeyId: targetAccessKeyId,
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

async function deleteExpiredRole(action, settings) {
  const payload = { RoleName: action.params.roleName };
  const client = getClient(action, settings);
  const roleData = await getRole(action, settings);

  let expiryTag = null;
  if (roleData && roleData.Role && roleData.Role.Tags && Array.isArray(roleData.Role.Tags)) {
    expiryTag = roleData.Role.Tags.find((tag) => tag.Key === "Kaholo_Expire_At");
  }

  if (!expiryTag) {
    return Promise.resolve();
  }

  const currentDate = new Date();
  const tagExpiryDate = new Date(Math.floor(expiryTag.Value));
  if (currentDate < tagExpiryDate) {
    return Promise.resolve();
  }

  return client.deleteRole(payload).promise();
}

function deleteRole(action, settings) {
  const payload = { RoleName: action.params.roleName };
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.deleteRole(payload, getAwsCallback(resolve, reject));
  });
}

function getRole(action, settings) {
  const payload = { RoleName: action.params.roleName };
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.getRole(payload, getAwsCallback(resolve, reject));
  });
}

function updateAccessKey(action, settings) {
  const params = getAwsUpdateParams(action.params, "targetAccessKeyId", "AccessKeyId");
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

function listRoles(action, settings) {
  const params = getPathPrefixParam(action.params);
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.listRoles(params, getAwsCallback(resolve, reject));
  });
}

function listUsers(action, settings) {
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.listUsers({}, getAwsCallback(resolve, reject));
  });
}

function getAccessKeyLastUsed(action, settings) {
  const params = { AccessKeyId: action.params.targetAccessKeyId };
  const client = getClient(action, settings);
  return new Promise((resolve, reject) => {
    client.getAccessKeyLastUsed(params, getAwsCallback(resolve, reject));
  });
}

module.exports = {
  createRole,
  deleteAccessKey,
  deleteUser,
  deleteExpiredRole,
  deleteRole,
  getRole,
  updateAccessKey,
  updateSSHPublicKey,
  listAccessKeys,
  listRoles,
  listUsers,
  getAccessKeyLastUsed,
};
