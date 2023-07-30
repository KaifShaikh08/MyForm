import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "myTodoApi",
    })
    .then((e) =>
      console.log(`Database is connected in ${process.env.MONGO_URI}`)
    )
    .catch((e) => console.log("error while connecting database", e));
};
