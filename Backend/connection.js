const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Import dotenv package

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("Connection error", err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
