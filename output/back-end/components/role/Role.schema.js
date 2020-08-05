const mongoose = require('mongoose');


const RoleSchema = new mongoose.Schema(
  {
    "name": {
        "type": String,
        "unique": true
    },
    "desciption": {},
    "isActive": {
        "default": true
    }
},{
    "timestamp": true
}
);

module.exports = mongoose.model('role', RoleSchema);
