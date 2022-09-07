const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required: true, maxLength: 100},
        picture: {type: String},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
        description: {type: String},
        image: {data: Buffer, contentType: String},
        blood_relations: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
        acquaintances: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
        invisible_threads: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
    }
)

module.exports = mongoose.model('Person', PersonSchema);