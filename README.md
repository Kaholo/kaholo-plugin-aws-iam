# kaholo-plugin-amazon-iam
Amazon IAM Plugin for Kaholo. This plugin is used to integrate with AWS IAM according to this [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html).

## Settings
1. Access Key ID (Vault) **Optional** - Access key ID of the default IAM user to do the actions with.
2. Secret Access Key (Vault) **Optional** - Secret access key of the default IAM user to do the actions with.

## Method: Delete Access Key
This method will remove access key from a specified user. For more info, see the AWS [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#deleteAccessKey-property).

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Access Key ID (String) **Required** - The ID of the access key to delete.
4. User name (String) **Required**  - The user name the access key to delete belongs to. If not specified, the username will be determined implicitly based on the Auth access key ID.

## Method: Delete User
Deletes the specified IAM user. Unlike the AWS Management Console, when you delete a user programmatically, you must delete the items attached to the user manually, or the deletion fails. For more info, see the AWS [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#deleteUser-property).

### Parameters:
1. Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. User name (String) **Required**  - The user name of the user to delete.

## Method: Update Access Key
Changes the status of the specified access key from Active to Inactive, or vice versa. For more info, see the AWS [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#updateAccessKey-property).

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Access Key ID (String) **Required** - The ID of the access key to update.
4. User name (String) **Required**  - The username the access key to update belongs to. If not specified, the username will be determined implicitly based on the Auth access key ID.
5. Status (Active/Inactive) **Required**  - The new status of the access key.

## Method: Update SSH Public Key
Sets the status of an IAM user's SSH public key to active or inactive. SSH public keys that are inactive cannot be used for authentication. This operation can be used to disable a user's SSH public key as part of a key rotation work flow. For more info, see the AWS [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#updateSSHPublicKey-property).

### Parameters:
1. Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. SSH Public Key ID (String) **Required** - The ID of the SSH public key to update. 
4. User name (String) **Required**  - The username the access key to delete belongs to. If not specified the username will be determined implicitly based on the access key ID.
5. Status (Active/Inactive) **Required**  - The new status of the SSH public key.

## Method: List Access Keys
Returns information about the access key IDs associated with the specified IAM user. For more info, see the AWS [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#listAccessKeys-property).

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. User name (String) **Required**  - The user name of the user to get info of his access keys.

## Method: List Roles
Lists the IAM roles that have the specified path prefix. If there are none, the operation returns an empty list. For more info, see the AWS [documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/WorkingWithRoles.html).

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Path Prefix (String) **Optional**  - The path prefix for filtering the results.

## Method: Create Role
Creates a new role for your Amazon Web Services account. For more information about roles. For more info, see the AWS [documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/WorkingWithRoles.html).

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Role Name Prefix (String) **required**  - The name of the role to create. 
4. Is TempRole (Bool) **required** - If set true, method will create specified role name as a temp role. Othwerwise, if will normal role.
5. Expiry Day Count (Number) **required *** - Expiry day count for temp role. Count value will add from role created day.

## Method: Delete Expired Role
Deletes the expired role based on if role is setted as Temp Role and expired based on Expiry Day Count. For more information about roles. For more info, see the AWS [documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/WorkingWithRoles.html).

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Role Name Prefix (String) **required**  - The name of the role to delete. 

## Method: Delete Role
Deletes the specified role.  For more information about roles. For more info, see the AWS [documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/WorkingWithRoles.html).

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Role Name Prefix (String) **required**  - The name of the role to delete. 


## Method: Get Role
Retrieves information about the specified role, including the role’s path, GUID, ARN, and the role’s trust policy that grants permission to assume the role. For more info, see the AWS [documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/WorkingWithRoles.html).

### Parameters:
1. Auth Access Key ID (Vault) **Optional**
2. Secret Access Key (Vault) **Optional**
3. Role Name Prefix (String) **required**  - The name of the role to query. 