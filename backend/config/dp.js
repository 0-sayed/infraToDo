import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    throw new Error(`Error updating post: ${error.message}`);
  }
};
export default connectToDb;
