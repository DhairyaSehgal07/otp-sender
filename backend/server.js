import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./utils/db.js";
dotenv.config();
connectDb();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is running",
  });
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
