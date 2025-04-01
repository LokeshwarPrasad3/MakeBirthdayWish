import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Mongodb connected at ', connectionInstance.connection.host);
  } catch (error) {
    console.log('Mongodb connection error ', error);
    process.exit(1);
  }
};

export default connectToDB;
