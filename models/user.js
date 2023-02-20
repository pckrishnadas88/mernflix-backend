// import npm modules
const bcrypt =  require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');
const mongoose =  require('mongoose');



// build user schema
const UserSchema =  mongoose.Schema(
        {
                email: {
                        type: String,
                        lowercase: true,
                        trim: true,
                        index: true,
                        unique: true,
                        required: true,
                },
                username: {
                        type: String,
                        lowercase: true,
                        trim: true,
                        index: true,
                        unique: true,
                        required: true,
                },
                password: {
                        type: String,
                        required: true,
                        bcrypt: true,
                },
                name: {
                        type: String,
                        trim: true,
                        required: true,
                },
                recoveryCode: {
                        type: String,
                        trim: true,
                        default: '',
                },
                active: {
                        type: Boolean,
                        default: true,
                },
                admin: {
                        type: Boolean,
                        default: false,
                },
        },
        { collection: 'users' },
);

// require plugins
UserSchema.plugin(bcrypt); // automatically bcrypts passwords
UserSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
UserSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)

UserSchema.index({ email: 1, username: 1 }); // compound index on email + username

module.exports = exports = mongoose.model('User', UserSchema); // export model for use