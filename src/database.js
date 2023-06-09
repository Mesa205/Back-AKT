import mongoose from "mongoose";

// const uri = "mongodb://127.0.0.1:27017/ejemplo";

mongoose.set('strictQuery', false);

const uri =
  "mongodb+srv://prueba:prueba@cluster0.hs6wuns.mongodb.net/akt-backend";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(uri);
    console.log("base de datos conectada", db.connection.name);
  } catch (error) {
    console.log(`error al conectar a la base de datos ${error.message}`);
  }
};
