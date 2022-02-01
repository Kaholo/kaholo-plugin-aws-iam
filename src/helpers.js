const aws = require("aws-sdk");

function getClient(action, settings){
    const options = {
        "accessKeyId": action.params.AWS_ACCESS_KEY_ID || settings.AWS_ACCESS_KEY_ID,
        "secretAccessKey": action.params.AWS_SECRET_ACCESS_KEY || settings.AWS_SECRET_ACCESS_KEY 
    }
    return new aws.IAM(options);
}

function getAwsCallback(resolve, reject){
    return (error, data) => {
        if (error) return reject(error);
        return resolve(data);
    }
}

function getAwsUpdateParams(params, keyIdParam, paramName){
    const keyId = (params[keyIdParam] || "").trim();

    if (!keyId || !params.status){
        throw "Not given one of required fields";
    }

    let awsParams = getUsernameParam(params);
    awsParams.Status = params.status;
    awsParams[paramName] = keyId;
    return awsParams;
}

function getAwsKeyParams(params, keyIdParam){
    const keyId = (params[keyIdParam] || "").trim();

    if (keyId  === "" ){
        throw "Not given one of required fields";
    }
    return { AccessKeyId: keyId };
}

function getUsernameParam(params){
    const userName = (params.userName || "").trim();

    if (!userName){
        throw "Not given username";
    }
    return { UserName: userName };
}

module.exports = {
    getClient,
    getAwsCallback,
    getAwsUpdateParams,
    getAwsKeyParams,
    getUsernameParam
};