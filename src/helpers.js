const aws = require("aws-sdk");
const parsers = require("./parsers");

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

function getUsernameParam(params){
    const userName = (params.userName || "").trim();

    if (!userName){
        throw "Not given username";
    }
    return { UserName: userName };
}

function getPathPrefixParam(params){
    const pathPrefix = (params.pathPrefix || "").trim();

    if (!pathPrefix){
        throw "Not given pathprefix";
    }
    return { PathPrefix: pathPrefix };
}

function getRoleNameWithRolePolicyParam(params){
    const isTempRole = parsers.boolean(params.isTempRole);
    const expiryDays = parsers.number(params.expiryDayCount);
    const currentDate = new Date();
    const expireDate = new Date();
    
    expirationDate=0;
    if(isTempRole && expiryDays>0){
        //original-working  you can comment this for demo and uncomment next line.
        expireDate.setDate(currentDate.getDate() + expiryDays);
        //expireDate.setMinutes(currentDate.getMinutes() + expiryDays);
        expirationDate=Date.parse(expireDate);
        console.log("expiry days count -  expirationDate",expiryDays);
    }
    var myPolicy = {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Principal": {
              "Service": "s3.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
          }
        ]
      };
    const awsparams = {
        AssumeRolePolicyDocument: JSON.stringify(myPolicy),
        RoleName: getRoleNameParam(params).RoleName,
        Tags: [{
            Key: "Kaholo_Created_At",
            Value: Date.parse(currentDate).toString()
        },{
            Key: "Kaholo_Expire_At",
            Value: expirationDate.toString()
        }]
    };

    return awsparams;
}

function getRoleNameParam(params){
    const roleName = (params.roleName || "").trim();

    if (!roleName){
        throw "Not given rolename";
    }
    return { RoleName: roleName };
}

module.exports = {
    getClient,
    getAwsCallback,
    getAwsUpdateParams,
    getUsernameParam,
    getPathPrefixParam,
    getRoleNameParam,
    getRoleNameWithRolePolicyParam
};