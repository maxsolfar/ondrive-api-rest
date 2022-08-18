import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGODB);
  console.log("connect to MONGODB");
} catch (error) {
  console.log("No connection with DB", error);
}

