import mongoose from "mongoose";
import config from "../../utils/config.js"; 

const connectdb = async () => {
  try {
    console.log(config.DB_URI); 
    await mongoose.connect(config.DB_URI);
  } catch (error) {
    console.log(error);
    console.log("unable to connect with db");
    process.exit(1);
  }
};

export {
  connectdb,
};
