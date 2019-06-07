var crypto = require('crypto')
const  awsObj = require('./awsS3');
const aws = awsObj.aws;
const deleteFileFromAws = awsObj.deleteFileFromAws;

function getFilename(req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(err, err ? undefined : raw.toString('hex'))
    })
}

function AwsStorage(opts) {
    this.getFilename = (opts.filename || getFilename)    
}

AwsStorage.prototype._handleFile = function _handleFile(req, file, cb) {
    var that = this;

    that.getFilename(req, file, function (err, filename) {
        if (err) {            
            return cb(err);
        }

        const params = {
            Expires: 60,
            Bucket: process.env.S3_BUCKET,
            Key: filename,
            ACL: 'public-read' ,
            Body: file.stream
        };

        aws.upload(params, function (err, data) {
            if (err) {
                return cb(err);
            }

            cb(null, {
                destination: data.Location,
                filename: data.Key,
                path: '',
                size: ''
            });
        });
    });
}

AwsStorage.prototype._removeFile = function _removeFile(req, file, cb) {
    if(file.filename){
        deleteFileFromAws(file.filename, cb);
    }
}

module.exports = function (opts) {
    return new AwsStorage(opts)
}