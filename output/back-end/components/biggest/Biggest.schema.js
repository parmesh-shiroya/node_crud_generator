const mongoose = require('mongoose');


const BiggestSchema = new mongoose.Schema(
  {
    "fieldString": {
        "type": String,
        "required": [
            true,
            "Please add fied 1"
        ],
        "unique": true
    },
    "fieldString2": {
        "type": String,
        "required": [
            true,
            "Please add fied 1"
        ],
        "unique": true,
        "maxLength": 30,
        "minLength": 10
    },
    "fieldNum": {
        "type": Number,
        "required": [
            true,
            "Please add fied 1"
        ],
        "min": 0,
        "max": 200
    },
    "fieldEmail": {
        "type": String,
        "match": [
            /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/,
            "Please add a valid fieldEmail"
        ]
    },
    "fieldEnum": {
        "type": String,
        "enum": [
            "enum1",
            "enum2",
            "enum3"
        ]
    },
    "fieldPassword": {
        "type": String,
        "select": false
    },
    "fieldMatch": {
        "type": String,
        "require": [
            true,
            "Please add fieldMatch"
        ],
        "match": [
            /[0-9]{10}$/,
            "Please add valid fieldMatch"
        ]
    },
    "fieldBoolean": {
        "type": Boolean,
        "default": false
    },
    "fieldRef": {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "user",
        "require": [
            true,
            "Please add fieldRef"
        ]
    },
    "fieldAny": {
        "type": mongoose.Schema.Types.Mixed
    },
    "fieldDate": {
        "type": Date
    },
    "fieldDate2": {
        "type": Date
    },
    "fieldDate3": {
        "type": Date
    },
    "fieldSchema3": {
        "name": {
            "type": String
        },
        "gender": {
            "type": String,
            "enum": [
                "m",
                "f"
            ]
        }
    }
},{
    "timestamp": true
}
);

module.exports = mongoose.model('biggest', BiggestSchema);
