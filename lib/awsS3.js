const aws = require('aws-sdk');
aws.config.region = process.env.S3_REGION;

let awsS3 = new aws.S3();


module.exports = {
    aws: awsS3,
    deleteFileFromAws: (filename, cb) => {
        var params = {
            Bucket: process.env.S3_BUCKET,
            Key: filename
        };
    
    
        awsS3.deleteObject(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log('deleted success', data);           // successful response
            if(typeof cb === 'function'){
                cb();
            }            
        });

    }
}
