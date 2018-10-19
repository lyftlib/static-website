const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk/global');

// Creates a new instance of the Github class with the credentials of the user
const api = new StaticWebsite({
    username: process.env.LYFTPV_AWS_AKEY_ID,
    token: process.env.LYFTPV_AWS_AKEY_SECRET
});

module.exports = api;