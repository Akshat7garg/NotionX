import mongoose from "mongoose"

const connectDB = async () => {
    const connectio_url = process.env.MONGODB_CONNECTION_STRING;
    const maxRetries = 10;
    let retries = 0;

    const connectWithRetry = async () => {
        try {
            // connect to DB
            const { connection } = await mongoose.connect(connectio_url);
            console.log("MongoDB connected successfull!!!");
            console.log("Database name:", connection.name);
            console.log("Database host:", connection.host);
        }
        catch (error) {
            retries += 1;
            console.error("MongoDB connection failed!!!", error.message);

            if (retries > maxRetries) {
                console.error("Max retires reached. Exiting...");
                process.exit(1);
            }

            // retry after 3s
            console.log("Retry in 3 seconds...");
            setTimeout(connectWithRetry, 3000);
        }
    }

    await connectWithRetry();
}

export default connectDB;