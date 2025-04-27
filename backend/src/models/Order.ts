import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  details: String,
});

export default mongoose.model("Order", orderSchema);
