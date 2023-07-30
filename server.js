import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();
app.listen(process.env.PORT || 4000, () => {
  console.log(
    `server is running in PORT:${process.env.PORT} in ${process.env.MODE} Mode`
  );
});
