import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async ()=>{
  mongoose.set('strictQuery', true);

  if(!process.env.MONGODB_URI) return console.log('mongoDB is not defined')

  if(isConnected) return console.log('database connection established')

  try{
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected=true;
    console.log('mongoDB connected')
  }catch (error:any){
    throw new Error(`${error.message}`)
  }
}