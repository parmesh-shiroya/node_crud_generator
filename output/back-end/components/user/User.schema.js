const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
  {
    "username": {
        "type": String,
        "required": [
            true,
            "Please add an username"
        ],
        "unique": true
    },
    "email": {
        "type": String,
        "required": [
            true,
            "Please add an email"
        ],
        "unique": true,
        "match": [
            /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    "role": {
        "require": [
            true,
            "Please add role"
        ]
    },
    "password": {
        "type": String,
        "required": [
            true,
            "Please add a password"
        ],
        "select": false
    },
    "verified": {
        "type": Boolean,
        "default": false
    },
    "resetPasswordToken": {
        "type": String,
        "select": false
    },
    "blocked": {
        "type": Boolean,
        "default": false
    }
},{
    "timestamp": true
}
);

module.exports = mongoose.model('user', UserSchema);
