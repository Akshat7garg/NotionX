import dotenv from "dotenv";
import connectDB from "./database/db.config.js";
import { app } from "./app.js";

// load env vars
dotenv.config();

const startServer = async () => {
    try {
        // connect to DB
        await connectDB();

        // start server
        const port = process.env.PORT || 8000;
        app.listen(port, (req, res) => {
            console.log(`⚙️  Server is successfully running at port: ${port}`);
        });
    }
    catch (error) {
        console.error("MongoDB connection and starting server failed!!!", error.message);
        process.exit(1);
    }
}

startServer();