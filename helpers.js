const aws = require("aws-sdk");
const { parsers } = require("@kaholo/aws-plugin-library");

function getClient(action) {
  const options = {
    accessKeyId: action.params.accessKeyId,
    secretAccessKey: action.params.secretAccessKey,
  };
  return new aws.IAM(options);
}

function getAwsCallback(resolve, reject) {
  return (error, data) => {
    if (error) { return reject(error); }
    return resolve(data);
  };
}

function getAwsUpdateParams(params, keyIdParam, paramName) {
  const keyId = (params[keyIdParam] || "").trim();

  if (!keyId || !params.status) {
    throw new Error("Not given one of required fields");
  }

  const awsParams = getUsernameParam(params);
  awsParams.Status = params.status;
  awsParams[paramName] = keyId;
  return awsParams;
}

function getUsernameParam(params) {
  const userName = (params.userName || "").trim();

  if (!userName) {
    throw new Error("Not given username");
  }
  return { UserName: userName };
}

function getPathPrefixParam(params) {
  const pathPrefix = (params.pathPrefix || "").trim();

  if (!pathPrefix) {
    throw new Error("Not given pathprefix");
  }
  return { PathPrefix: pathPrefix };
}

function getRoleNameWithRolePolicyParam(params) {
  const isTempRole = parsers.boolean(params.isTempRole);
  const expiryDays = parsers.number(params.expiryDayCount);
  const currentDate = new Date();
  const expireDate = new Date();

  let expirationDate = 0;
  if (isTempRole && expiryDays > 0) {
    // original-working  you can comment this for demo and uncomment next line.
    expireDate.setDate(currentDate.getDate() + expiryDays);
    // expireDate.setMinutes(currentDate.getMinutes() + expiryDays);
    expirationDate = Date.parse(expireDate);
  }
  const myPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "s3.amazonaws.com",
        },
        Action: "sts:AssumeRole",
      },
    ],
  };
  const awsparams = {
    AssumeRolePolicyDocument: JSON.stringify(myPolicy),
    RoleName: params.RoleName,
    Tags: [{
      Key: "Kaholo_Created_At",
      Value: Date.parse(currentDate).toString(),
    }, {
      Key: "Kaholo_Expire_At",
      Value: expirationDate.toString(),
    }],
  };

  return awsparams;
}

module.exports = {
  getClient,
  getAwsCallback,
  getAwsUpdateParams,
  getUsernameParam,
  getPathPrefixParam,
  getRoleNameWithRolePolicyParam,
};
