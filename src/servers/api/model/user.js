'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * @module User
 * @description contain the details of Attribute
 */
var UserSchema = new Schema({

    /**
     * User ID. It can only contain string, is required and unique field which is indexed.
     */
     userId : { type: String, unique: true, required: true },

     /**
      * User Name. It can only contrain string, is required field.
      */
      username : { type: String, required: true },

});

var user = mongoose.model( 'user', UserSchema );

module.exports = {
    User : user
};