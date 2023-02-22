// import npm modules
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');
const mongoose =  require('mongoose');



// build user schema
const MovieSchema =  mongoose.Schema(
        {
                title: {
                        type: String,
                        trim: true,
                        required: true,
                },
                description: {
                        type: String,
                        trim: true,
                        required: true,
                },
                url: {
                        type: String,
                        required: true,
                        unique: true,
                },
                active: {
                        type: Boolean,
                        default: true,
                },
                category: {
                    type: String,
                    enum: ['Action','Comedy','Drama','Fantasy','Horror','Mystery','Romance','Thriller','Western'],
                    required: true,
                    message: '{VALUE} is not supported'
                },
                createdBy : {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'User'
                }
                
        },
        { collection: 'movies' },
);

// require plugins
MovieSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
MovieSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)

MovieSchema.index({ title: 1 });

module.exports = exports = mongoose.model('Movie', MovieSchema); // export model for use