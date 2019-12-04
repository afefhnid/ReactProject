import { Schema, model } from "mongoose";


const typeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})
const Type = model('Type', typeSchema);
export default Type;