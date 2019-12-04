import { Schema, model } from "mongoose";


const companySchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    destination: {
        type: String,
        required: true,

    },
    birthdayCompany: {
        type: String,
        required: true,

    },
    description: {
        type: String,

    },
    image: {
        type: String,


    },
    ticket: [

        {
            destination: String,
            date: Date,
            prix: Number,
            isSold: Boolean,
            company_id: {
                type: Schema.Types.ObjectId,
                ref: 'Company',
            },
            user_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }

        },




    ]

})
const Company = model('Company', companySchema);
export default Company;