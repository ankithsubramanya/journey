var express = require('express');
var app = require('../app.js');

/**
 * Function that converts a facebook id to a mongo user id
 * @param facebookId
 * @returns mongoId{32 character hexadecimal string}
 */
var toMongoId = function(facebookId){
    var idLength = facebookId.length;
    for (var i = idLength; i < 36; i++){
        facebookId = '0' + facebookId;
    }
    return facebookId;
}

/**
 * Converts a Mongo User Id to a facebook id
 * @param mongoId
 * @returns facebokID {string}
 */
var toFacebookId = function (mongoId) {
    var count  = 0;
    for (var i = 0; i < mongoId.length; i++){
        if (mongoId.charAt(i) == '0'){
            counter++;
        } else {
            break;
        }
    }
    var result = mongoId.substring(count, mongoId.length);
    return result;
}


module.exports.toMongoId = toMongoId;
module.exports.toFacebookId = toFacebookId;