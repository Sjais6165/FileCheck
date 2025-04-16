import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DBConnection = async () => {
    
    //     const MONODB_URI = process.env.MONGO_URL;
    //     try {
    //         await mongoose.connect(MONODB_URI, { useNewUrlParser: true });
    //         console.log('Database connected successfully!');

    //     } catch (error) {
    //         console.error('Error while connecting with the database ', error.message);
    //     }
    // }
    
    const MONODB_URI = process.env.MONGO_URL;

    try {
        await mongoose.connect(MONODB_URI, { useUnifiedTopology: true }); // Only keep `useUnifiedTopology`
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Error while connecting with the database ', error.message);
    }
}
export default DBConnection;