const { getClient,
    getAwsCallback,
    getAwsUpdateParams,
    getUsernameParam,
    getPathPrefixParam,
    getRoleNameWithRolePolicyParam,
    getRoleNameParam} = require("./helpers");
const { tags } = require("./parsers");


async function createRole(action,settings) {
    const params = getRoleNameWithRolePolicyParam(action.params);
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.createRole(params, getAwsCallback(resolve, reject));
    });
}

async function deleteAccessKey(action,settings) {
    const accessKeyId = (action.params.ACCESS_KEY_ID || "").trim();
    const userName = (action.params.USER_NAME || "").trim();

    if (!accessKeyId || !userName){
        throw "Not given one of required fields";
    }

    const params = {
        UserName: userName,
        AccessKeyId: accessKeyId
    };

    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.deleteAccessKey(params, getAwsCallback(resolve, reject));
    });
}

async function deleteUser(action,settings) {
    const params = getUsernameParam(action.params);
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.deleteUser(params, getAwsCallback(resolve, reject));
    });
}


async function deleteExpiredRole(action,settings) {
    const params = getRoleNameParam(action.params);
    const client = getClient(action, settings);
    const roleData = await getRole(action,settings);
    let isExpired=false;
    console.log("roleData is : ", roleData);
    if( roleData !==undefined && roleData !==null && roleData.Role !==null)
    {
       if(roleData.Role.Tags !==undefined && roleData.Role.Tags.length>0)
       {

        const currentDate = new Date();

        roleData.Role.Tags.forEach(function(currentValue, index, arr){
            if (currentValue.Key=="Kaholo_Expire_At"){
                var date = new Date(Math.floor(currentValue.Value));
                console.log("expire_at value", currentValue.Value, Date.parse(currentDate),date, date >= Date.parse(currentDate));
                if(date <= Date.parse(currentDate)){
                    console.log("role is expired. Now, removing...");
                    isExpired=true;
                    
                }else{
                    console.log("role is not expired yet");
                    isExpired=false;
                }
            } 
           
        });
       
       }
    }
   if (isExpired)
   {
        return new Promise((resolve, reject) => {
        client.deleteRole(params, getAwsCallback(resolve, reject));
    });

   }
   return new Promise((resolve, reject) => {
    client.getRole(params, getAwsCallback(resolve, reject));
});

}
async function deleteRole(action,settings) {
    const params = getRoleNameParam(action.params);
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.deleteRole(params, getAwsCallback(resolve, reject));
    });
}

async function getRole(action,settings) {
    const params = getRoleNameParam(action.params);
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.getRole(params, getAwsCallback(resolve, reject));
    });
}

async function updateAccessKey(action, settings){
    const params = getAwsUpdateParams(action.params, "accessKeyId", "AccessKeyId");
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.updateAccessKey(params, getAwsCallback(resolve, reject));
    });
}

async function updateSSHPublicKey(action, settings){
    const params = getAwsUpdateParams(action.params, "sshId", "SSHPublicKeyId");
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.updateSSHPublicKey(params, getAwsCallback(resolve, reject));
    });
}

async function listAccessKeys(action,settings) {
    const params = getUsernameParam(action.params);
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.listAccessKeys(params, getAwsCallback(resolve, reject));
    });
}

async function listRoles(action,settings) {
    const params = getPathPrefixParam(action.params);
    const client = getClient(action, settings);
    return new Promise((resolve, reject) => {
        client.listRoles(params, getAwsCallback(resolve, reject));

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
    listRoles
};