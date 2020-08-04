let roles = ["User", "Admin"]



exports.rolesSchema = {

    name: "role",
    desciption: "roles All the user",
    collectionName: "role",
    options: {
        timestamp: true
    },
    schema: {
        name: {
            type: "string",
            unique: true,
            enum: roles,
        },
        desciption: String,
        isActive: { type: Boolean, default: true }
    }
}

/*
Every collection accepts below attributes
    type: string,number,email,enum,password,boolean,ref,any,date,array[string],schema
    required:boolean,
    default:any,
    select
    min,
    max
    enum
    match:regex
    minLength,
    maxLength
*/

exports.userSchema =
{
    name: "user",
    desciption: "Contains All the user",
    collectionName: "user",
    options: {
        timestamp: true
    },
    schema: {
        username: { type: "string", required: [true, 'Please add an username'], unique: true },
        email: {
            type: "string",
            required: [true, 'Please add an email'],
            lowercase: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },

        role: {
            type: ["ref"],
            ref: 'role',
            required: true
            // Add default field
        },
        password: {
            type: "string",
            required: [true, 'Please add a password'],
            minlength: 8,
            select: false
        },
        verified: { type: "boolean", default: false },
        resetPasswordToken: { type: "string", select: false },
        blocked: { type: "boolean", default: false },


    }
}