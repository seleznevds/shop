
var crypto = require('crypto')
const aws = require('aws-sdk');

function getFilename(req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(err, err ? undefined : raw.toString('hex'))
    })
}

function AwsStorage(opts) {
    this.getFilename = (opts.filename || getFilename)

    if (!opts.bucket) {
        throw new Error('AWS storage bucket must be  specified');
    }
    if (!opts.region) {
        throw new Error('AWS storage region must be  specified');
    }

    this.bucket = opts.bucket;
    aws.config.region = opts.region;
    this.s3 = new aws.S3();
}

AwsStorage.prototype._handleFile = function _handleFile(req, file, cb) {
    var that = this;

    that.getFilename(req, file, function (err, filename) {
        if (err) {            
            return cb(err);
        }

        const params = {
            Expires: 60,
            Bucket: that.bucket,
            Key: filename,
            ACL: 'public-read',
            Body: file.stream
        };

        that.s3.upload(params, function (err, data) {
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
    var params = {
        Bucket: this.bucket,
        Key: file.filename
    };


    this.s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log('deleted success', data);           // successful response

        cb();
    });
}

module.exports = function (opts) {
    return new AwsStorage(opts)
}