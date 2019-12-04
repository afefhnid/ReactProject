import { connect } from "mongoose";

const connectDb = () => {
    return connect(`mongodb://localhost:27017/tripTicket`,
        { useNewUrlParser: true, useUnifiedTopology: true })
}

export default connectDb;