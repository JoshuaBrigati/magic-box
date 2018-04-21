const AWS = require('aws-sdk');
const uuid = require('node-uuid');

const s3 = new AWS.S3();

const bucketName = 'chiptune-magic';

module.exports.upload = (file, callback) => {
  let params = { Bucket: bucketName, Key: file.name, Body: file.data };
  s3.putObject(params, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(
        null,
        'Successfully uploaded data to ' + bucketName + '/' + file.name
      );
    }
  });
};
