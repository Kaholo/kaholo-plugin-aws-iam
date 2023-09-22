## Access and Authentication
AWS uses two parameters for access and authentication, these are stored in the Kaholo Vault and configured via a Kaholo Account.
* Access Key ID, e.g. `AKIA3LQJ67DU53G3DNEW`
* Access Key Secret, e.g. `Hw8Il3qOGpOflIbCaMb0SxLAB2zk4naTBKiybsNx`

Only the Access Key Secret is a genuine secret that should be guarded carefully to avoid abuse of your account. For security purposes the Kaholo plugin stores both the Access Key ID and the Secret Access Key in the Kaholo vault. This allows them to be used widely without ever appearing in configuration, logs, or output.

The Access Key ID and Secret Access Key are a matched set of credentials that will work in any Region, subject to the security configuration of the user account to which these keys belong.

To add these values to Kaholo Vault items, click on "Settings" in the left panel and then the lock-shaped "Vault" icon. Button "Add Item" is on the top right.

To create a Kaholo Account, click on "Settings" in the left panel and then the name of the plugin "AWS IAM", which is a blue hyperlink. Accounts are on the 2nd tab, next to plugin settings. If you have already configured an account for another AWS plugin the same account may be used with AWS IAM. An account can also be configured while attempting to use an AWS IAM action in a pipeline. Once a method is selected, the "Account" parameter appears. In the drop-down for this parameter find "Add New Plugin Account".

## Plugin Installation
For download, installation, upgrade, downgrade and troubleshooting of plugins in general, see [INSTALL.md](./INSTALL.md).

## Method: Delete Access Key
Permanently deletes an AWS Access Key, rending the credentials forever useless. To temporarily disable an access key instead, consider method Activate/Deactivate Access Key.

### Parameter: User Name
The AWS username of the IAM user account. When selecting "Users" from the Identity and Access Management (IAM) web console, this is name listed under the "User name" column.

### Parameter: Access Key ID
The ID of the Access Key to delete. This is an all-caps string found in the Identity and Access Management (IAM) web console under Users | User name on the "Security Credentials" tab, in the "Access keys" section. For example 'AKIA3LQJ32ZAPTC4TPP5'.

## Method: Delete User
Permanently deletes a user account from IAM. For this to succeed the user must first be removed from all IAM groups.

### Parameter: User Name
The AWS username of the IAM user account. When selecting "Users" from the Identity and Access Management (IAM) web console, this is name listed under the "User name" column.

## Method: Activate/Deactivate Access Key
Temporarily Activates or deactivates an AWS Access Key. Keys can be activated or deactivated any number of times. To permanently destroy keys, consider method "Delete Access Key" instead.

### Parameter: User Name
The AWS username of the IAM user account. When selecting "Users" from the Identity and Access Management (IAM) web console, this is name listed under the "User name" column.

### Parameter: Access Key ID
The ID of the Access Key to activate or deactivate. This is an all-caps string found in the Identity and Access Management (IAM) web console under Users | User name on the "Security Credentials" tab, in the "Access keys" section. For example 'AKIA3LQJ32ZAPTC4TPP5'.

### Parameter: Status To Set
Choose either "Activate" or "Deactivate" from the drop-down list. If the key happens to already be in the selected state, the action succeeds without any change made.

## Method: Activate/Deactivate SSH Public Key
Temporarily Activates or deactivates an SSH Public Key. Keys can be activated or deactivated any number of times.

### Parameter: User Name
The AWS username of the IAM user account. When selecting "Users" from the Identity and Access Management (IAM) web console, this is name listed under the "User name" column.

### Parameter: SSH Public Key ID
The ID of the SSH Public Key to activate or deactivate. This is an all-caps string found in the Identity and Access Management (IAM) web console under Users | User name on the "Security Credentials" tab, in the "SSH public keys for AWS CodeCommit" section. For example 'APKA3LQQJ32UZR5WHL7H'.

### Parameter: Status To Set
Choose either "Activate" or "Deactivate" from the drop-down list. If the key happens to already be in the selected state, the action succeeds without any change made.

## Method: List Access Keys
Lists all access keys for the specified user.

### Parameter: User Name
The AWS username of the IAM user account. When selecting "Users" from the Identity and Access Management (IAM) web console, this is name listed under the "User name" column.

## Method: List Users
List all IAM users accounts. There are no parameters for this method.

## Method: Get Access Key Last Used Time
Queries the last time the specified access key was used, including the service and region that was accessed. This is most commonly used to test if a suspected abandoned/orphaned/unused key is being used for anything prior to deleting it. It can also help determine if a key is being used for a purpose other than the intended ones.

### Parameter: Access Key ID
The ID of the Access Key to find last use time. This is an all-caps string found in the Identity and Access Management (IAM) web console under Users | User name on the "Security Credentials" tab, in the "Access keys" section. For example 'AKIA3LQJ32ZAPTC4TPP5'.

