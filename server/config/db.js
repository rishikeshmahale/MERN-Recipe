import mongoose from "mongoose";



const connectDB = async () => {
    try {
        mongoose.set({ strictQuery: false });
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongodb connected ${mongoose.connection.host}`);
    } catch (err) {
        console.log("Error While Connecting to server", err.message);
        console.log("Error : ", err)
    }
}
export default connectDB;