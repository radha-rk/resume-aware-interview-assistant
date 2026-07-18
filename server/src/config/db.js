import mongoose from "mongoose";

const connectDB = async () => {
    try {  
        const conn = await mongoose.connect(process.env.MONGO_URI)
        //shows the connected cluster.
        console.log(`✅ database Connected successfully: ${conn.connection.host}`);
    }
    catch(error){
        console.error('Database connection error:', error.message);
        process.exit(1);
        //stops the server if the database can't connect. It's generally better to fail fast than run with no database.
    }
};

export default connectDB;