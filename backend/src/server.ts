import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db";
import router from "./routes/chatRoute";

dotenv.config();
const port = process.env.PORT || 4001;

const app = express();

app.use(express.json());
app.use(cors());

// Call ConnectDatabase Function
connectDB();

app.use("/api/v1/chat", router);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
