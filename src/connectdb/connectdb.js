import mongoose from "mongoose";

const connectdb = async ()=>{
  try {
    console.log(process.env.DB_URI)
    await mongoose.connect(process.env.DB_URI)
  } catch (error) {
    console.log(error)
    console.log("unable to connect with db")
    process.exit(1);
  }
}
export {
  connectdb,
}